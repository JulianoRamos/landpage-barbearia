"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { whatsappLink } from "@/lib/id";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#equipe", label: "Equipe" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const { content, mutate } = useEdit();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-baseline gap-2">
          <EditableText
            as="span"
            value={content.brand.name}
            onCommit={(v) => mutate((c) => (c.brand.name = v))}
            className="font-display text-xl font-bold text-white"
          />
          <EditableText
            as="span"
            value={content.brand.tagline}
            onCommit={(v) => mutate((c) => (c.brand.tagline = v))}
            className="text-xs uppercase tracking-widest text-gold-500"
          />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-300 transition hover:text-gold-400"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink(content.contact.whatsapp, content.contact.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold !px-5 !py-2 text-sm"
        >
          Agendar
        </a>
      </div>
    </header>
  );
}
