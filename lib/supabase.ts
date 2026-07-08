import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para uso EXCLUSIVO no servidor (usa a service role key).
 * Retorna null quando as variáveis não estão configuradas — nesse caso o
 * `store` cai no fallback de arquivo local (dev).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export const isSupabaseConfigured = (): boolean =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
