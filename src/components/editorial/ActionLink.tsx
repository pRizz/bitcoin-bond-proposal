import { A, usePreloadRoute } from "@solidjs/router";
import { cva, type VariantProps } from "class-variance-authority";
import type { JSX } from "solid-js";

import { cn } from "../../lib/site/cn";

const actionLinkVariants = cva(
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      intent: {
        primary: "bg-accent-strong text-ink hover:bg-accent hover:text-canvas-soft",
        secondary:
          "border border-border-strong bg-white/70 text-ink hover:bg-white hover:text-ink",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

type ActionLinkProps = {
  href: string;
  children: JSX.Element;
  class?: string;
} & VariantProps<typeof actionLinkVariants>;

export function ActionLink(props: ActionLinkProps) {
  const preload = usePreloadRoute();

  return (
    <A
      class={cn(actionLinkVariants({ intent: props.intent }), props.class)}
      href={props.href}
      onFocus={() => preload(props.href)}
      onMouseEnter={() => preload(props.href)}
    >
      {props.children}
    </A>
  );
}
