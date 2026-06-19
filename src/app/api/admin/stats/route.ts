import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const authorized = await verifyAdminSession();
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  const [messagesRes, unreadRes, subscribersRes, productsRes] = await Promise.all([
    supabaseAdmin.from('contact_messages').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
    supabaseAdmin.from('newsletter_subscribers').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabaseAdmin.from('products').select('id', { count: 'exact', head: true }),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      totalMessages: messagesRes.count ?? 0,
      unreadMessages: unreadRes.count ?? 0,
      activeSubscribers: subscribersRes.count ?? 0,
      totalProducts: productsRes.count ?? 0,
    },
  });
}
