"use client";

import { useRouter } from "next/navigation";
import { useEdit } from "./EditProvider";

/** Barra flutuante de administração (visível apenas para admin autenticado). */
export function EditToolbar() {
  const router = useRouter();
  const { isAdmin, editing, setEditing, dirty, saving, save, savedAt, error } =
    useEdit();

  if (!isAdmin) return null;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cream/15 bg-forest/95 px-3 py-2 shadow-2xl backdrop-blur">
      {!editing ? (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-full bg-caramel px-4 py-1.5 text-sm font-medium uppercase tracking-brand text-forest hover:bg-caramel-400"
        >
          ✏️ Editar site
        </button>
      ) : (
        <>
          <span className="px-2 text-xs uppercase tracking-brand text-cream/60">
            {saving
              ? "Salvando..."
              : error
                ? "Erro ao salvar"
                : dirty
                  ? "Alterações não salvas"
                  : savedAt
                    ? "Tudo salvo ✓"
                    : "Modo edição"}
          </span>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="rounded-full bg-caramel px-4 py-1.5 text-sm font-medium uppercase tracking-brand text-forest hover:bg-caramel-400 disabled:opacity-50"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-full border border-cream/25 px-4 py-1.5 text-sm uppercase tracking-brand text-cream hover:bg-cream/10"
          >
            Concluir
          </button>
        </>
      )}
      <button
        type="button"
        onClick={handleLogout}
        title="Sair"
        className="rounded-full px-2 py-1.5 text-sm text-cream/60 hover:text-cream"
      >
        ⎋
      </button>
      {error && editing && (
        <span className="max-w-[200px] truncate text-xs text-red-400" title={error}>
          {error}
        </span>
      )}
    </div>
  );
}
