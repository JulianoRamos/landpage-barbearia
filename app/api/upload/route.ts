import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createUploadSignature, isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * Retorna os parâmetros assinados para o cliente fazer upload direto ao Cloudinary.
 * Se o Cloudinary não estiver configurado, responde 501 e o front cai no modo
 * "colar URL manualmente".
 */
export async function POST() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary não configurado.", configured: false },
      { status: 501 },
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const sig = createUploadSignature(timestamp);
  if (!sig) {
    return NextResponse.json(
      { error: "Falha ao assinar upload.", configured: false },
      { status: 500 },
    );
  }

  return NextResponse.json({ configured: true, ...sig });
}
