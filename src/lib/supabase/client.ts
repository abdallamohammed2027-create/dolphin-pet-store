import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Public Supabase client — safe to use in browser/client components.
 * Subject to Row Level Security policies (read-only on products).
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
