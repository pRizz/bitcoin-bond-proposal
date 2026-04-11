import { cva, type VariantProps } from "class-variance-authority";
import type { JSX } from "solid-js";

import { cn } from "../../lib/site/cn";

const badgeVariants = cva(
	"inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
	{
		variants: {
			tone: {
				neutral: "border border-border-soft bg-panel-strong/85 text-ink-subtle",
				accent:
					"border border-accent-muted/70 bg-accent-wash/85 text-accent-soft",
				bond: "border border-accent-muted/60 bg-panel-strong text-accent-soft",
				reserve: "border border-success/35 bg-success/12 text-success",
				success: "border border-success/35 bg-success/12 text-success",
				warning: "border border-warning/35 bg-warning/12 text-warning",
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
	return (
		<span class={cn(badgeVariants({ tone: props.tone }), props.class)}>
			{props.children}
		</span>
	);
}
