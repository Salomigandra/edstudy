import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Use inside Server Components that need the authenticated user's session
export const createServerClient = () =>
  createServerComponentClient(
    { cookies },
    { supabaseUrl, supabaseKey }
  );

// Use for public read queries inside Server Components (no cookies needed).
// `cache: 'no-store'` opts out of Next.js Data Cache so pages always get
// fresh rows from Supabase instead of a stale cached fetch response.
export const createPublicClient = () =>
  createClient(supabaseUrl, supabaseKey, {
    global: {
      fetch: (url, options = {}) =>
        fetch(url, { ...options, cache: 'no-store' }),
    },
  });
