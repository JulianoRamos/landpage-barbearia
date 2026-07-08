"use client";

import { useEffect, useRef } from "react";
import { useEdit } from "./EditProvider";

/**
 * Texto editável inline. Fora do modo edição, renderiza normalmente.
 * No modo edição (admin), vira contentEditable e comita o valor no blur.
 */
export function EditableText({
  value,
  onCommit,
  as = "span",
  multiline = false,
  className,
  placeholder = "Escreva aqui...",
}: {
  value: string;
  onCommit: (next: string) => void;
  as?: keyof JSX.IntrinsicElements;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}) {
  const { editing } = useEdit();
  const ref = useRef<HTMLElement>(null);

  // Mantém o DOM sincronizado com o valor quando não está sendo editado ativamente.
  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value, editing]);

  const Tag = as as any;

  if (!editing) {
    return <Tag className={className}>{value || placeholder}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      data-editable
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label={placeholder}
      className={className}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.target as HTMLElement).blur();
        }
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const next = e.currentTarget.innerText.trim();
        if (next !== value) onCommit(next);
      }}
    >
      {value}
    </Tag>
  );
}
