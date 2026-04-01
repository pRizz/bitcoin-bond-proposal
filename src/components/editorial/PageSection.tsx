import type { JSX } from "solid-js";

import { cn } from "../../lib/site/cn";

type PageSectionProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  class?: string;
  children: JSX.Element;
};

export function PageSection(props: PageSectionProps) {
  return (
    <section class={cn("section-divider", props.class)}>
      <div class="mb-6 max-w-3xl space-y-2">
        {props.eyebrow ? <p class="eyebrow">{props.eyebrow}</p> : null}
        <h2 class="text-3xl text-ink sm:text-4xl">{props.title}</h2>
        {props.lead ? (
          <p class="text-base leading-7 text-ink-subtle sm:text-lg">{props.lead}</p>
        ) : null}
      </div>
      {props.children}
    </section>
  );
}
