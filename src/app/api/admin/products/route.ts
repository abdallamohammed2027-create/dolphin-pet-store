import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

/**
 * GET /api/products
 * Query params:
 *  - category: filter by product category
 *  - featured: 'true' to return only featured products
 *  - search: case-insensitive search on name (ar/en)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    let query = supabase.from('products').select('*').order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (search) {
      query = query.or(`name_ar.ilike.%${search}%,name_en.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ success: false, error: 'database_error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ success: false, error: 'server_error' }, { status: 500 });
  }
}
