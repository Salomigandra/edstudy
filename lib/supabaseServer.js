import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Use inside Server Components only
export const createServerClient = () =>
  createServerComponentClient({ cookies });
