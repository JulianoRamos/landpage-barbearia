"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/?edit=1");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Não foi possível entrar.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-ink-700 bg-ink-900 p-8 shadow-xl"
      >
        <h1 className="font-display text-2xl font-bold text-white">
          Área do administrador
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Entre com a senha para editar o conteúdo do site.
        </p>

        <label className="mt-6 block text-sm font-medium text-neutral-300">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="mt-1 w-full rounded-lg border border-ink-700 bg-ink-800 px-3 py-2 text-white
                       outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            placeholder="••••••••"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-gold mt-6 w-full disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <a
          href="/"
          className="mt-4 block text-center text-sm text-neutral-400 hover:text-gold-400"
        >
          ← Voltar para o site
        </a>
      </form>
    </main>
  );
}
