"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { AddButton, ItemControls, moveItem } from "../edit/ListControls";
import { newId } from "@/lib/id";

export function Services() {
  const { content, mutate, editing } = useEdit();
  const { services } = content;

  return (
    <section id="servicos" className="bg-ink-900">
      <div className="section">
        <div className="text-center">
          <span className="section-kicker">
            <EditableText
              as="span"
              value={services.kicker}
              onCommit={(v) => mutate((c) => (c.services.kicker = v))}
            />
          </span>
          <EditableText
            as="h2"
            value={services.title}
            onCommit={(v) => mutate((c) => (c.services.title = v))}
            className="section-title"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4">
          {services.items.map((svc, i) => (
            <div
              key={svc.id}
              className="relative flex items-start justify-between gap-4 rounded-xl border border-ink-700 bg-ink-800 p-5"
            >
              <ItemControls
                canMoveUp={i > 0}
                canMoveDown={i < services.items.length - 1}
                onMoveUp={() =>
                  mutate((c) => (c.services.items = moveItem(c.services.items, i, i - 1)))
                }
                onMoveDown={() =>
                  mutate((c) => (c.services.items = moveItem(c.services.items, i, i + 1)))
                }
                onRemove={() =>
                  mutate((c) => c.services.items.splice(i, 1))
                }
              />
              <div className="min-w-0">
                <EditableText
                  as="h3"
                  value={svc.name}
                  onCommit={(v) => mutate((c) => (c.services.items[i].name = v))}
                  className="text-lg font-semibold text-white"
                />
                <EditableText
                  as="p"
                  multiline
                  value={svc.description}
                  onCommit={(v) => mutate((c) => (c.services.items[i].description = v))}
                  className="mt-1 text-sm text-neutral-400"
                />
                <p className="mt-2 text-xs uppercase tracking-wide text-neutral-500">
                  <EditableText
                    as="span"
                    value={String(svc.durationMin)}
                    onCommit={(v) =>
                      mutate(
                        (c) =>
                          (c.services.items[i].durationMin =
                            parseInt(v.replace(/\D/g, ""), 10) || 0),
                      )
                    }
                  />
                  {" min"}
                </p>
              </div>
              <EditableText
                as="div"
                value={svc.price}
                onCommit={(v) => mutate((c) => (c.services.items[i].price = v))}
                className="whitespace-nowrap font-display text-xl font-bold text-gold-400"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <AddButton
            label="Adicionar serviço"
            onClick={() =>
              mutate((c) =>
                c.services.items.push({
                  id: newId("svc"),
                  name: "Novo serviço",
                  description: "Descrição do serviço.",
                  durationMin: 30,
                  price: "R$ 0",
                }),
              )
            }
          />
        </div>
      </div>
    </section>
  );
}
