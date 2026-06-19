import { NextRequest, NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/validations';
import { createAdminSession } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const rateLimit = checkRateLimit(`admin-login:${ip}`, 5, 5 * 60_000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'rate_limited' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'invalid_input' },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD is not set');
      return NextResponse.json(
        { success: false, error: 'server_misconfigured' },
        { status: 500 }
      );
    }

    if (parsed.data.password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'invalid_credentials' },
        { status: 401 }
      );
    }

    await createAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'server_error' }, { status: 500 });
  }
}
