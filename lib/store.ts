import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import { defaultContent } from "./defaultContent";
import { siteContentSchema, type SiteContent } from "./content.types";

/**
 * Camada de acesso ao conteúdo do site.
 *
 * - Em produção (Supabase configurado): lê/grava a linha id=1 da tabela `site_content`.
 * - Em dev (sem Supabase): usa o arquivo `.data/content.json` para persistir localmente,
 *   permitindo testar a edição inline sem criar contas externas.
 * - Em qualquer caso, cai no `defaultContent` quando ainda não há dados.
 */

const CONTENT_ROW_ID = 1;
const LOCAL_DIR = path.join(process.cwd(), ".data");
const LOCAL_FILE = path.join(LOCAL_DIR, "content.json");

/** Garante que o payload tem o formato esperado, mesclando com o padrão. */
function normalize(raw: unknown): SiteContent {
  const parsed = siteContentSchema.safeParse(raw);
  if (parsed.success) return parsed.data;
  return defaultContent;
}

async function readLocal(): Promise<SiteContent> {
  try {
    const buf = await fs.readFile(LOCAL_FILE, "utf-8");
    return normalize(JSON.parse(buf));
  } catch {
    return defaultContent;
  }
}

async function writeLocal(content: SiteContent): Promise<void> {
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(content, null, 2), "utf-8");
}

/** Lê o conteúdo atual do site. Nunca lança — sempre devolve algo renderizável. */
export async function getContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured()) {
    return readLocal();
  }
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return readLocal();
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle();
    if (error || !data) return defaultContent;
    return normalize(data.data);
  } catch {
    return defaultContent;
  }
}

/** Salva o conteúdo do site. Lança em caso de erro para a rota retornar 500. */
export async function saveContent(content: SiteContent): Promise<void> {
  const validated = siteContentSchema.parse(content);

  if (!isSupabaseConfigured()) {
    await writeLocal(validated);
    return;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    await writeLocal(validated);
    return;
  }
  const { error } = await supabase
    .from("site_content")
    .upsert({ id: CONTENT_ROW_ID, data: validated, updated_at: new Date().toISOString() });
  if (error) {
    // Mensagens mais úteis para os erros de configuração mais comuns.
    const msg = error.message || "";
    if (/does not exist|schema cache|relation/i.test(msg)) {
      throw new Error(
        "Tabela 'site_content' não encontrada. Rode o supabase/schema.sql no SQL Editor do Supabase.",
      );
    }
    throw new Error(`Supabase: ${msg}`);
  }
}
