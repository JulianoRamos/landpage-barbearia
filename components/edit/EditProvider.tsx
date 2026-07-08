"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { SiteContent } from "@/lib/content.types";

interface EditContextValue {
  content: SiteContent;
  isAdmin: boolean;
  editing: boolean;
  dirty: boolean;
  saving: boolean;
  savedAt: number | null;
  error: string;
  setEditing: (v: boolean) => void;
  /** Aplica uma mutação imutável ao conteúdo (recebe um rascunho clonado). */
  mutate: (fn: (draft: SiteContent) => void) => void;
  save: () => Promise<void>;
}

const EditContext = createContext<EditContextValue | null>(null);

function clone<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

export function EditProvider({
  initialContent,
  isAdmin,
  initialEditing = false,
  children,
}: {
  initialContent: SiteContent;
  isAdmin: boolean;
  initialEditing?: boolean;
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [editing, setEditing] = useState<boolean>(isAdmin && initialEditing);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");

  const mutate = useCallback((fn: (draft: SiteContent) => void) => {
    setContent((prev) => {
      const draft = clone(prev);
      fn(draft);
      return draft;
    });
    setDirty(true);
    setError("");
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Falha ao salvar.");
      }
      setDirty(false);
      setSavedAt(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar.");
    } finally {
      setSaving(false);
    }
  }, [content]);

  return (
    <EditContext.Provider
      value={{
        content,
        isAdmin,
        editing,
        dirty,
        saving,
        savedAt,
        error,
        setEditing,
        mutate,
        save,
      }}
    >
      <div className={editing ? "edit-mode" : undefined}>{children}</div>
    </EditContext.Provider>
  );
}

export function useEdit(): EditContextValue {
  const ctx = useContext(EditContext);
  if (!ctx) throw new Error("useEdit deve ser usado dentro de <EditProvider>");
  return ctx;
}
