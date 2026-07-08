"use client";

import { useEdit } from "../edit/EditProvider";

export function Footer() {
  const { content } = useEdit();
  const { brand, contact } = content;

  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-neutral-400 md:flex-row">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-white">
            {brand.name}
          </span>
          <span className="text-xs uppercase tracking-widest text-gold-500">
            {brand.tagline}
          </span>
        </div>
        <div className="flex items-center gap-6">
          {contact.instagram && (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400"
            >
              Instagram
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-gold-400">
              {contact.email}
            </a>
          )}
        </div>
        <p>
          © {brand.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
