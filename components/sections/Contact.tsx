"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { AddButton, ItemControls, moveItem } from "../edit/ListControls";
import { whatsappLink } from "@/lib/id";

export function Contact() {
  const { content, mutate, editing } = useEdit();
  const { contact } = content;

  return (
    <section id="contato" className="bg-ink-900">
      <div className="section grid gap-12 md:grid-cols-2">
        <div>
          <span className="section-kicker">
            <EditableText
              as="span"
              value={contact.kicker}
              onCommit={(v) => mutate((c) => (c.contact.kicker = v))}
            />
          </span>
          <EditableText
            as="h2"
            value={contact.title}
            onCommit={(v) => mutate((c) => (c.contact.title = v))}
            className="section-title"
          />

          <p className="mt-6 text-sm uppercase tracking-wide text-gold-500">Endereço</p>
          <EditableText
            as="p"
            multiline
            value={contact.address}
            onCommit={(v) => mutate((c) => (c.contact.address = v))}
            className="mt-1 text-neutral-300"
          />

          <p className="mt-6 text-sm uppercase tracking-wide text-gold-500">Horários</p>
          <ul className="mt-2 space-y-1">
            {contact.hours.map((h, i) => (
              <li
                key={i}
                className="relative flex justify-between gap-4 border-b border-ink-700 py-1.5 text-neutral-300"
              >
                <ItemControls
                  canMoveUp={i > 0}
                  canMoveDown={i < contact.hours.length - 1}
                  onMoveUp={() =>
                    mutate((c) => (c.contact.hours = moveItem(c.contact.hours, i, i - 1)))
                  }
                  onMoveDown={() =>
                    mutate((c) => (c.contact.hours = moveItem(c.contact.hours, i, i + 1)))
                  }
                  onRemove={() => mutate((c) => c.contact.hours.splice(i, 1))}
                />
                <EditableText
                  as="span"
                  value={h.label}
                  onCommit={(v) => mutate((c) => (c.contact.hours[i].label = v))}
                />
                <EditableText
                  as="span"
                  value={h.value}
                  onCommit={(v) => mutate((c) => (c.contact.hours[i].value = v))}
                  className="font-medium text-white"
                />
              </li>
            ))}
          </ul>
          <AddButton
            label="Adicionar horário"
            onClick={() =>
              mutate((c) => c.contact.hours.push({ label: "Dia", value: "09h — 18h" }))
            }
          />

          {editing && (
            <p className="mt-6 text-sm uppercase tracking-wide text-gold-500">
              WhatsApp (somente números, com DDI)
            </p>
          )}
          {editing && (
            <EditableText
              as="p"
              value={contact.whatsapp}
              onCommit={(v) =>
                mutate((c) => (c.contact.whatsapp = v.replace(/\D/g, "")))
              }
              className="mt-1 text-neutral-300"
            />
          )}

          <div className="mt-8">
            <a
              href={whatsappLink(contact.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Agendar pelo WhatsApp
            </a>
          </div>
        </div>

        <div className="relative">
          {editing && (
            <button
              type="button"
              onClick={() => {
                const next = window.prompt(
                  "Cole a URL de incorporação do Google Maps (embed):",
                  contact.mapEmbedUrl,
                );
                if (next && next.trim())
                  mutate((c) => (c.contact.mapEmbedUrl = next.trim()));
              }}
              className="absolute right-2 top-2 z-10 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-ink-950"
            >
              Editar mapa
            </button>
          )}
          <iframe
            title="Mapa"
            src={contact.mapEmbedUrl}
            className="h-full min-h-[320px] w-full rounded-2xl border border-ink-700"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
