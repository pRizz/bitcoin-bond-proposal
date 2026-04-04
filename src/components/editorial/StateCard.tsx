import { A, usePreloadRoute } from "@solidjs/router";

import { cn } from "../../lib/site/cn";
import { Badge } from "./Badge";

type StateCardProps = {
	href: string;
	state: string;
	billId: string;
	status: string;
	proposalKind: string;
	summary: string;
	significance: string;
	lastReviewed: string;
};

export function StateCard(props: StateCardProps) {
	const preload = usePreloadRoute();

	return (
		<A
			class={cn(
				"panel-wash block rounded-[var(--radius-card)] p-5 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
				"hover:-translate-y-0.5 hover:border-accent-muted hover:bg-panel-strong/90",
			)}
			href={props.href}
			onFocus={() => preload(props.href)}
			onMouseEnter={() => preload(props.href)}
		>
			<div class="flex flex-wrap items-center justify-between gap-3">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
						{props.state}
					</p>
					<h3 class="mt-2 text-2xl text-ink">{props.billId}</h3>
				</div>
				<Badge
					tone={
						props.proposalKind === "bond"
							? "bond"
							: props.proposalKind === "reserve"
								? "reserve"
								: "accent"
					}
				>
					{props.proposalKind}
				</Badge>
			</div>
			<p class="mt-4 text-sm font-medium text-ink">{props.status}</p>
			<p class="mt-3 text-sm leading-6 text-ink-subtle">{props.summary}</p>
			<p class="mt-4 text-sm leading-6 text-ink-subtle/90">
				{props.significance}
			</p>
			<p class="mt-5 text-xs uppercase tracking-[0.14em] text-ink-subtle">
				Reviewed {props.lastReviewed}
			</p>
		</A>
	);
}
