import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { sendContactNotification } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request.headers);
    const rateLimit = checkRateLimit(`contact:${ip}`, 5, 60_000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'rate_limited' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'invalid_input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { recaptchaToken, ...data } = parsed.data;

    // Verify reCAPTCHA
    const recaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      return NextResponse.json(
        { success: false, error: 'recaptcha_failed' },
        { status: 400 }
      );
    }

    // Sanitize: strip any HTML tags from text fields
    const sanitized = {
      name: stripTags(data.name),
      email: data.email.toLowerCase(),
      phone: data.phone ? stripTags(data.phone) : null,
      subject: data.subject ? stripTags(data.subject) : null,
      message: stripTags(data.message),
    };

    // Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('contact_messages')
      .insert(sanitized);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { success: false, error: 'database_error' },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking failure)
    await sendContactNotification(sanitized as any);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error' },
      { status: 500 }
    );
  }
}

function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}
