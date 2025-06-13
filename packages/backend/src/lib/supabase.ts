import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

// Admin client with full access
export const supabaseAdmin = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
); 