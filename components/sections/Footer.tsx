"use client";

import { useEdit } from "../edit/EditProvider";

export function Footer() {
  const { content } = useEdit();
  const { brand, contact } = content;

  return (
    <footer className="border-t border-cream/10 bg-forest text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-cream/60 md:flex-row">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-cobre.png" alt="Brasão PATRONO" className="h-10 w-auto" />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold uppercase tracking-tight text-cream">
              {brand.name}
            </span>
            <span className="text-xs uppercase tracking-brand text-caramel">
              {brand.tagline}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          {contact.instagram && (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-brand hover:text-caramel"
            >
              Instagram
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-caramel">
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
