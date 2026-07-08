import crypto from "crypto";

/**
 * Assinatura de uploads diretos ao Cloudinary (signed upload).
 * O cliente envia o arquivo direto ao Cloudinary usando estes parâmetros
 * assinados — o arquivo não passa pelo nosso servidor.
 */

export const isCloudinaryConfigured = (): boolean =>
  Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );

export interface UploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
}

export function createUploadSignature(timestamp: number): UploadSignature | null {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;

  const folder = "barbearia";
  // Parâmetros a assinar, em ordem alfabética, conforme regra do Cloudinary.
  const toSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(toSign + apiSecret)
    .digest("hex");

  return { cloudName, apiKey, timestamp, folder, signature };
}
