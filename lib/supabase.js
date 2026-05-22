// Use createClient directly — avoids auth-helpers naming issues entirely
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Support both Supabase key naming conventions
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Browser / client component singleton
let browserClient = null;

export const createBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // During SSR or if env vars are missing, return null-safe stub
    if (typeof window === 'undefined') return null;
    console.error(
      'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local'
    );
    return null;
  }
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return browserClient;
};

// Admin client for server-only API routes (service role key — never expose to browser)
export const supabaseAdmin =
  supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;
