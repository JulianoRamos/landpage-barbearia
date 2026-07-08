import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/store";
import { siteContentSchema } from "@/lib/content.types";

export const dynamic = "force-dynamic";

/** Leitura pública do conteúdo (também usada no client, se necessário). */
export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

/** Gravação protegida — só admin autenticado. */
export async function PUT(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = siteContentSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Conteúdo inválido.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    await saveContent(parsed.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro ao salvar.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
