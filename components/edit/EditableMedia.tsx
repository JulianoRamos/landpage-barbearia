"use client";

import { useRef, useState } from "react";
import { useEdit } from "./EditProvider";

type MediaType = "image" | "video";

/**
 * Imagem ou vídeo editável. Fora do modo edição, apenas exibe a mídia.
 * No modo edição, mostra botões para enviar um arquivo (Cloudinary) ou colar uma URL.
 */
export function EditableMedia({
  url,
  type,
  onCommit,
  className,
  alt = "",
  allowVideo = true,
  imgClassName,
}: {
  url: string;
  type: MediaType;
  onCommit: (url: string, type: MediaType) => void;
  className?: string;
  alt?: string;
  allowVideo?: boolean;
  imgClassName?: string;
}) {
  const { editing } = useEdit();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleFile(file: File) {
    setBusy(true);
    setMsg("Enviando...");
    try {
      const sigRes = await fetch("/api/upload", { method: "POST" });
      if (sigRes.status === 501) {
        // Cloudinary não configurado → cai para colar URL.
        setBusy(false);
        setMsg("");
        promptForUrl();
        return;
      }
      if (!sigRes.ok) throw new Error("Falha ao preparar upload.");
      const sig = await sigRes.json();

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sig.apiKey);
      form.append("timestamp", String(sig.timestamp));
      form.append("signature", sig.signature);
      form.append("folder", sig.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`,
        { method: "POST", body: form },
      );
      if (!uploadRes.ok) throw new Error("Falha no upload.");
      const data = await uploadRes.json();
      const nextType: MediaType =
        data.resource_type === "video" ? "video" : "image";
      onCommit(data.secure_url as string, nextType);
      setMsg("");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erro no upload.");
    } finally {
      setBusy(false);
    }
  }

  function promptForUrl() {
    const next = window.prompt("Cole a URL da imagem ou vídeo:", url);
    if (next && next.trim()) {
      const isVideo = /\.(mp4|webm|mov|ogg)(\?|$)/i.test(next.trim());
      onCommit(next.trim(), isVideo && allowVideo ? "video" : "image");
    }
  }

  const media =
    type === "video" ? (
      <video
        src={url}
        className={imgClassName || "h-full w-full object-cover"}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={alt}
        className={imgClassName || "h-full w-full object-cover"}
      />
    );

  if (!editing) {
    return <div className={className}>{media}</div>;
  }

  return (
    <div className={className} data-editable-media>
      {media}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-forest/70 opacity-0 transition hover:opacity-100">
        <input
          ref={fileRef}
          type="file"
          accept={allowVideo ? "image/*,video/*" : "image/*"}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="rounded-sm bg-caramel px-4 py-1.5 text-sm font-medium uppercase tracking-brand text-forest disabled:opacity-60"
        >
          {busy ? "Enviando..." : "Trocar mídia"}
        </button>
        <button
          type="button"
          onClick={promptForUrl}
          className="rounded-full border border-white/40 px-4 py-1.5 text-sm text-white"
        >
          Colar URL
        </button>
        {msg && <span className="text-xs text-white">{msg}</span>}
      </div>
    </div>
  );
}
