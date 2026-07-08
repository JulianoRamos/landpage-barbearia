"use client";

import { useEdit } from "../edit/EditProvider";
import { EditableText } from "../edit/EditableText";
import { EditableMedia } from "../edit/EditableMedia";

export function About() {
  const { content, mutate } = useEdit();
  const { about } = content;

  return (
    <section id="sobre" className="section grid items-center gap-12 md:grid-cols-2">
      <EditableMedia
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
        url={about.image}
        type="image"
        allowVideo={false}
        alt="Sobre a barbearia"
        onCommit={(url) => mutate((c) => (c.about.image = url))}
      />
      <div>
        <span className="section-kicker">
          <EditableText
            as="span"
            value={about.kicker}
            onCommit={(v) => mutate((c) => (c.about.kicker = v))}
          />
        </span>
        <EditableText
          as="h2"
          value={about.title}
          onCommit={(v) => mutate((c) => (c.about.title = v))}
          className="section-title"
        />
        <EditableText
          as="p"
          multiline
          value={about.text}
          onCommit={(v) => mutate((c) => (c.about.text = v))}
          className="mt-5 leading-relaxed text-neutral-300"
        />
      </div>
    </section>
  );
}
