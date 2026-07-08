"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { AddButton, ItemControls, moveItem } from "../edit/ListControls";
import { newId } from "@/lib/id";

function Stars({
  rating,
  onChange,
  editing,
}: {
  rating: number;
  onChange: (n: number) => void;
  editing: boolean;
}) {
  return (
    <div className="flex gap-0.5 text-caramel" aria-label={`${rating} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!editing}
          onClick={() => onChange(n)}
          className={n <= rating ? "" : "text-forest/20"}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { content, mutate, editing } = useEdit();
  const { testimonials } = content;

  return (
    <section id="depoimentos" className="section">
      <div className="text-center">
        <span className="section-kicker">
          <EditableText
            as="span"
            value={testimonials.kicker}
            onCommit={(v) => mutate((c) => (c.testimonials.kicker = v))}
          />
        </span>
        <EditableText
          as="h2"
          value={testimonials.title}
          onCommit={(v) => mutate((c) => (c.testimonials.title = v))}
          className="section-title"
        />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.items.map((t, i) => (
          <figure
            key={t.id}
            className="relative rounded-sm border border-forest/15 bg-cream-50 p-7"
          >
            <ItemControls
              canMoveUp={i > 0}
              canMoveDown={i < testimonials.items.length - 1}
              onMoveUp={() =>
                mutate((c) => (c.testimonials.items = moveItem(c.testimonials.items, i, i - 1)))
              }
              onMoveDown={() =>
                mutate((c) => (c.testimonials.items = moveItem(c.testimonials.items, i, i + 1)))
              }
              onRemove={() => mutate((c) => c.testimonials.items.splice(i, 1))}
            />
            <Stars
              rating={t.rating}
              editing={editing}
              onChange={(n) => mutate((c) => (c.testimonials.items[i].rating = n))}
            />
            <EditableText
              as="blockquote"
              multiline
              value={t.text}
              onCommit={(v) => mutate((c) => (c.testimonials.items[i].text = v))}
              className="mt-4 text-lg leading-relaxed text-forest/80"
            />
            <EditableText
              as="figcaption"
              value={t.name}
              onCommit={(v) => mutate((c) => (c.testimonials.items[i].name = v))}
              className="mt-4 text-sm uppercase tracking-brand text-forest"
            />
          </figure>
        ))}
      </div>

      <div className="text-center">
        <AddButton
          label="Adicionar depoimento"
          onClick={() =>
            mutate((c) =>
              c.testimonials.items.push({
                id: newId("d"),
                name: "Cliente",
                text: "Escreva o depoimento aqui.",
                rating: 5,
              }),
            )
          }
        />
      </div>
    </section>
  );
}
