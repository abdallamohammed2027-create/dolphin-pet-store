import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const authorized = await verifyAdminSession();
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: 'database_error' }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const authorized = await verifyAdminSession();
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const { error } = await supabaseAdmin.from('products').insert(body);

  if (error) {
    return NextResponse.json({ success: false, error: 'database_error' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  const authorized = await verifyAdminSession();
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ success: false, error: 'invalid_input' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, error: 'database_error' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const authorized = await verifyAdminSession();
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, error: 'invalid_input' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('products').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, error: 'database_error' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
