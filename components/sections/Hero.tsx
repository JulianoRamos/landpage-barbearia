"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { EditableMedia } from "../edit/EditableMedia";
import { whatsappLink } from "@/lib/id";

export function Hero() {
  const { content, mutate } = useEdit();
  const { hero, contact } = content;

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* Mídia de fundo */}
      <EditableMedia
        className="absolute inset-0 h-full w-full"
        url={hero.media.url}
        type={hero.media.type}
        alt="Barbearia"
        onCommit={(url, type) =>
          mutate((c) => {
            c.hero.media.url = url;
            c.hero.media.type = type;
          })
        }
      />
      {/* Overlay escuro para legibilidade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/30" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="section-kicker">{content.brand.tagline}</span>
          <EditableText
            as="h1"
            value={hero.title}
            onCommit={(v) => mutate((c) => (c.hero.title = v))}
            className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl"
          />
          <EditableText
            as="p"
            multiline
            value={hero.subtitle}
            onCommit={(v) => mutate((c) => (c.hero.subtitle = v))}
            className="mt-5 text-lg text-neutral-300"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(contact.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <EditableText
                as="span"
                value={hero.ctaLabel}
                onCommit={(v) => mutate((c) => (c.hero.ctaLabel = v))}
              />
            </a>
            <a href="#servicos" className="btn-outline">
              Ver serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
