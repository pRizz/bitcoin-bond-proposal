import { A, usePreloadRoute } from "@solidjs/router";
import { cva, type VariantProps } from "class-variance-authority";
import type { JSX } from "solid-js";

import { cn } from "../../lib/site/cn";

const actionLinkVariants = cva(
	"inline-flex items-center justify-center rounded-full px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors",
	{
		variants: {
			intent: {
				primary:
					"bg-accent-strong text-canvas shadow-[0_10px_30px_rgba(0,0,0,0.22)] hover:bg-accent-soft hover:text-canvas",
				secondary:
					"border border-border-strong bg-panel text-ink hover:border-accent-muted hover:bg-panel-strong hover:text-ink",
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
