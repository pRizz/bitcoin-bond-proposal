import { cva, type VariantProps } from "class-variance-authority";
import type { JSX } from "solid-js";

import { cn } from "../../lib/site/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
  {
    variants: {
      tone: {
        neutral: "bg-white/65 text-ink border border-border-soft",
        accent: "bg-accent-soft text-ink border border-border-strong",
        bond: "bg-ink text-canvas-soft border border-ink",
        reserve: "bg-success/15 text-success border border-success/35",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

type BadgeProps = {
  children: JSX.Element;
  class?: string;
} & VariantProps<typeof badgeVariants>;

export function Badge(props: BadgeProps) {
  return <span class={cn(badgeVariants({ tone: props.tone }), props.class)}>{props.children}</span>;
}
