import { supabaseAnonKey, supabaseURL } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
// @ts-ignore
export const supabase = createClient(supabaseURL, supabaseAnonKey);
