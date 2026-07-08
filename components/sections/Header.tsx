"use client";

import { useEdit } from "../edit/EditProvider";
import { whatsappLink } from "@/lib/id";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#equipe", label: "Equipe" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const { content } = useEdit();

  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-3">
          {content.brand.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.brand.logoUrl} alt={content.brand.name} className="h-11 w-auto" />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-verde.png" alt="Brasão PATRONO" className="h-11 w-auto" />
              <span className="leading-none">
                <span className="block font-display text-2xl font-bold uppercase tracking-tight text-forest">
                  {content.brand.name}
                </span>
                <span className="block text-[0.6rem] uppercase tracking-brand text-rust">
                  {content.brand.tagline}
                </span>
              </span>
            </>
          )}
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-brand text-forest transition hover:text-rust"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink(content.contact.whatsapp, content.contact.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary !px-5 !py-2.5 !text-xs"
        >
          Agendar
        </a>
      </div>
    </header>
  );
}
