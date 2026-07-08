"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { EditableMedia } from "../edit/EditableMedia";
import { AddButton, ItemControls, moveItem } from "../edit/ListControls";
import { newId } from "@/lib/id";
import { placeholderImage } from "@/lib/placeholder";

export function Team() {
  const { content, mutate } = useEdit();
  const { team } = content;

  return (
    <section id="equipe" className="bg-forest text-cream">
      <div className="section">
        <div className="text-center">
          <span className="section-kicker">
            <EditableText
              as="span"
              value={team.kicker}
              onCommit={(v) => mutate((c) => (c.team.kicker = v))}
            />
          </span>
          <EditableText
            as="h2"
            value={team.title}
            onCommit={(v) => mutate((c) => (c.team.title = v))}
            className="section-title"
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {team.items.map((member, i) => (
            <div
              key={member.id}
              className="relative overflow-hidden rounded-sm border border-cream/15 bg-forest-700"
            >
              <ItemControls
                canMoveUp={i > 0}
                canMoveDown={i < team.items.length - 1}
                onMoveUp={() =>
                  mutate((c) => (c.team.items = moveItem(c.team.items, i, i - 1)))
                }
                onMoveDown={() =>
                  mutate((c) => (c.team.items = moveItem(c.team.items, i, i + 1)))
                }
                onRemove={() => mutate((c) => c.team.items.splice(i, 1))}
              />
              <EditableMedia
                className="relative aspect-[3/4] w-full"
                url={member.photo}
                type="image"
                allowVideo={false}
                alt={member.name}
                onCommit={(url) => mutate((c) => (c.team.items[i].photo = url))}
              />
              <div className="p-5 text-center">
                <EditableText
                  as="h3"
                  value={member.name}
                  onCommit={(v) => mutate((c) => (c.team.items[i].name = v))}
                  className="font-display text-xl font-bold uppercase tracking-tight text-cream"
                />
                <EditableText
                  as="p"
                  value={member.role}
                  onCommit={(v) => mutate((c) => (c.team.items[i].role = v))}
                  className="mt-1 text-xs uppercase tracking-brand text-caramel"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <AddButton
            label="Adicionar barbeiro"
            onClick={() =>
              mutate((c) =>
                c.team.items.push({
                  id: newId("t"),
                  name: "Novo barbeiro",
                  role: "Barbeiro",
                  photo: placeholderImage("Foto do barbeiro", { w: 600, h: 800, icon: "👤" }),
                  instagram: "",
                }),
              )
            }
          />
        </div>
      </div>
    </section>
  );
}
