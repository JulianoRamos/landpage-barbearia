"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { EditableMedia } from "../edit/EditableMedia";
import { whatsappLink } from "@/lib/id";

export function Hero() {
  const { content, mutate } = useEdit();
  const { hero, contact } = content;

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-forest">
      {/* Mídia de fundo */}
      <EditableMedia
        className="absolute inset-0 h-full w-full opacity-70"
        url={hero.media.url}
        type={hero.media.type}
        alt="PATRONO Barbearia"
        onCommit={(url, type) =>
          mutate((c) => {
            c.hero.media.url = url;
            c.hero.media.type = type;
          })
        }
      />
      {/* Overlay para legibilidade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/30" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-cobre.png" alt="Brasão PATRONO" className="mb-6 h-20 w-auto" />
          <span className="section-kicker !text-caramel">
            {content.brand.name} — {content.brand.tagline}
          </span>
          <EditableText
            as="h1"
            value={hero.title}
            onCommit={(v) => mutate((c) => (c.hero.title = v))}
            className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-cream md:text-6xl"
          />
          <EditableText
            as="p"
            multiline
            value={hero.subtitle}
            onCommit={(v) => mutate((c) => (c.hero.subtitle = v))}
            className="mt-6 max-w-xl text-lg text-cream/80"
          />
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={whatsappLink(contact.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <EditableText
                as="span"
                value={hero.ctaLabel}
                onCommit={(v) => mutate((c) => (c.hero.ctaLabel = v))}
              />
            </a>
            <a href="#servicos" className="btn-outline text-cream">
              Ver serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
