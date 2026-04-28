// SERVER-ONLY: never import from client components.
// This client uses the service role key and bypasses Row Level Security —
// it is intended for trusted server contexts (Stripe webhook handlers,
// admin server actions). Importing it from a client bundle is a hard error.

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

if (typeof window !== 'undefined') {
  throw new Error(
    '[supabase-admin] This module is server-only and must not be imported from client components.'
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.warn(
    '[supabase-admin] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing — admin client disabled.'
  );
}

export const supabaseAdmin: SupabaseClient | null =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            'X-Client-Info': 'nello-ocean-beach-nextjs-admin',
          },
        },
      })
    : null;

export function isSupabaseAdminConfigured(): boolean {
  return supabaseAdmin !== null;
}
