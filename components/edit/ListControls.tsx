"use client";

import { useEdit } from "./EditProvider";

/**
 * Controles de lista (adicionar/remover/reordenar) exibidos apenas no modo edição.
 * As seções fornecem os callbacks que fazem a mutação via `mutate`.
 */

export function ItemControls({
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const { editing } = useEdit();
  if (!editing) return null;

  const btn =
    "flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/80 text-white text-sm " +
    "border border-white/20 hover:bg-gold-500 hover:text-ink-950 disabled:opacity-30 disabled:hover:bg-ink-950/80 disabled:hover:text-white";

  return (
    <div className="absolute right-2 top-2 z-10 flex gap-1">
      <button
        type="button"
        className={btn}
        title="Mover para cima"
        onClick={onMoveUp}
        disabled={!canMoveUp}
      >
        ↑
      </button>
      <button
        type="button"
        className={btn}
        title="Mover para baixo"
        onClick={onMoveDown}
        disabled={!canMoveDown}
      >
        ↓
      </button>
      <button
        type="button"
        className={btn + " hover:!bg-red-500 hover:!text-white"}
        title="Remover"
        onClick={onRemove}
      >
        ✕
      </button>
    </div>
  );
}

export function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  const { editing } = useEdit();
  if (!editing) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-8 inline-flex items-center gap-2 rounded-full border border-dashed border-gold-500/60 px-5 py-2.5 text-sm font-semibold text-gold-400 transition hover:bg-gold-500/10"
    >
      + {label}
    </button>
  );
}

/** Helpers de manipulação de array (imutáveis por cópia). */
export function moveItem<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}
