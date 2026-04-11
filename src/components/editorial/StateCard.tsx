import { A, usePreloadRoute } from "@solidjs/router";

import type { ConfidenceCue } from "../../lib/site/content";
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
	confidenceCue: ConfidenceCue;
	lastReviewed: string;
};

export function StateCard(props: StateCardProps) {
	const preload = usePreloadRoute();

	return (
		<A
			class={cn(
				"panel-wash block rounded-[var(--radius-card)] p-5 transition-[transform,border-color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
				"hover:-translate-y-0.5 hover:border-accent-muted hover:bg-panel-strong/90 hover:shadow-[0_20px_38px_rgba(0,0,0,0.3)]",
			)}
			href={props.href}
			onFocus={() => preload(props.href)}
			onMouseEnter={() => preload(props.href)}
		>
			<div class="flex flex-wrap items-center justify-between gap-3">
				<div class="space-y-3">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
							{props.billId}
						</p>
						<h3 class="mt-2 text-2xl text-ink">{props.state}</h3>
					</div>
					<p class="text-sm font-medium uppercase tracking-[0.12em] text-ink-subtle">
						{props.status}
					</p>
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
			<p class="mt-4 text-sm leading-7 text-ink-subtle">{props.summary}</p>
			<div class="mt-5 rounded-[var(--radius-soft)] border border-border-soft/80 bg-panel/40 p-4">
				<p class="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent-soft">
					Record footing
				</p>
				<p class="mt-2 text-sm font-medium leading-6 text-ink">
					{props.confidenceCue.title}
				</p>
				<p class="mt-2 text-sm leading-6 text-ink-subtle">
					{props.confidenceCue.detail}
				</p>
			</div>
			<div class="mt-5 border-t border-border-soft/80 pt-4">
				<p class="text-sm leading-7 text-ink-subtle/90">{props.significance}</p>
				<p class="mt-4 text-xs uppercase tracking-[0.14em] text-ink-subtle">
					Reviewed {props.lastReviewed}
				</p>
			</div>
		</A>
	);
}
