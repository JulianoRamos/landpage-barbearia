import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para uso EXCLUSIVO no servidor (usa a service role key).
 * Retorna null quando as variáveis não estão configuradas — nesse caso o
 * `store` cai no fallback de arquivo local (dev).
 */

/**
 * Normaliza e valida a SUPABASE_URL.
 * Erros comuns tratados aqui:
 *  - barra(s) no final: "https://xxx.supabase.co/"  -> remove
 *  - URL do PAINEL em vez da API: "https://supabase.com/dashboard/project/xxx"
 *  - caminho extra: "https://xxx.supabase.co/rest/v1" -> mantém só a origem
 */
function normalizeSupabaseUrl(raw: string): string {
  const trimmed = raw.trim();
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error(
      `SUPABASE_URL inválida ("${trimmed}"). Use a URL da API do projeto, ex.: https://SEU-PROJETO.supabase.co`,
    );
  }
  if (parsed.hostname.includes("supabase.com")) {
    throw new Error(
      "SUPABASE_URL parece ser a URL do painel (supabase.com/dashboard/...). " +
        "Use a URL da API em Project Settings → API → Project URL, ex.: https://SEU-PROJETO.supabase.co",
    );
  }
  // Usa apenas a origem (protocolo + host), descartando qualquer caminho.
  return parsed.origin;
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(normalizeSupabaseUrl(url), key.trim(), {
    auth: { persistSession: false },
  });
}

export const isSupabaseConfigured = (): boolean =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
