"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { EditableMedia } from "../edit/EditableMedia";
import { AddButton, ItemControls, moveItem } from "../edit/ListControls";
import { newId } from "@/lib/id";
import { placeholderImage } from "@/lib/placeholder";

export function Gallery() {
  const { content, mutate } = useEdit();
  const { gallery } = content;

  return (
    <section id="galeria" className="section">
      <div className="text-center">
        <span className="section-kicker">
          <EditableText
            as="span"
            value={gallery.kicker}
            onCommit={(v) => mutate((c) => (c.gallery.kicker = v))}
          />
        </span>
        <EditableText
          as="h2"
          value={gallery.title}
          onCommit={(v) => mutate((c) => (c.gallery.title = v))}
          className="section-title"
        />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
        {gallery.items.map((item, i) => (
          <div
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <ItemControls
              canMoveUp={i > 0}
              canMoveDown={i < gallery.items.length - 1}
              onMoveUp={() =>
                mutate((c) => (c.gallery.items = moveItem(c.gallery.items, i, i - 1)))
              }
              onMoveDown={() =>
                mutate((c) => (c.gallery.items = moveItem(c.gallery.items, i, i + 1)))
              }
              onRemove={() => mutate((c) => c.gallery.items.splice(i, 1))}
            />
            <EditableMedia
              className="h-full w-full"
              url={item.url}
              type={item.type}
              alt={item.caption}
              imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              onCommit={(url, type) =>
                mutate((c) => {
                  c.gallery.items[i].url = url;
                  c.gallery.items[i].type = type;
                })
              }
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <AddButton
          label="Adicionar foto/vídeo"
          onClick={() =>
            mutate((c) =>
              c.gallery.items.push({
                id: newId("g"),
                type: "image",
                url: placeholderImage("Nova mídia", { w: 900, h: 900, icon: "✂" }),
                caption: "",
              }),
            )
          }
        />
      </div>
    </section>
  );
}
