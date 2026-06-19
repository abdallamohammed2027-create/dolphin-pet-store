import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const rateLimit = checkRateLimit(`newsletter:${ip}`, 5, 60_000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'rate_limited' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'invalid_input' },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase().trim();

    // Check for existing subscriber
    const { data: existing } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      if (!existing.is_active) {
        await (supabaseAdmin as any)
          .from('newsletter_subscribers')
          .update({ is_active: true })
          .eq('id', existing.id);
        return NextResponse.json({ success: true, reactivated: true });
      }
      return NextResponse.json(
        { success: false, error: 'already_subscribed' },
        { status: 409 }
      );
    }

    const { error: insertError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({ email });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { success: false, error: 'database_error' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error' },
      { status: 500 }
    );
  }
}
