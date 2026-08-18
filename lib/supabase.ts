import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Temporarily disabled — see request to remove the Supabase store.
const SUPABASE_DISABLED = true;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client (for browser use). Null when env vars aren't configured,
// so a missing Vercel env var can't crash the build or a request.
export const supabase: SupabaseClient | null =
  !SUPABASE_DISABLED && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Server-side admin client (bypasses RLS — server only)
export const supabaseAdmin: SupabaseClient | null =
  !SUPABASE_DISABLED && supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;
