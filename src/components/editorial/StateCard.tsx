import { A, usePreloadRoute } from "@solidjs/router";
import { Show } from "solid-js";

import { cn } from "../../lib/site/cn";
import type {
	ProposalFocus,
	RegistryStatus,
	ReviewStatus,
} from "../../lib/site/content";
import { Badge } from "./Badge";

type StateCardProps = {
	maybeHref?: string;
	state: string;
	registryStatus: RegistryStatus;
	status: string;
	proposalFocus: ProposalFocus;
	summary: string;
	significance: string;
	maybeBillId?: string;
	maybeLastReviewed?: string;
	maybeNextReviewDue?: string;
	maybeReviewStatus?: ReviewStatus;
};

function formatRegistryStatusLabel(registryStatus: RegistryStatus) {
	switch (registryStatus) {
		case "published":
			return "Published";
		case "queued":
			return "Queued";
		default:
			return "Unresearched";
	}
}

function formatProposalFocusLabel(proposalFocus: ProposalFocus) {
	switch (proposalFocus) {
		case "both":
			return "Both";
		case "bond":
			return "Bond";
		case "reserve":
			return "Reserve";
		default:
			return "Unknown";
	}
}

function formatReviewStatusLabel(reviewStatus: ReviewStatus) {
	switch (reviewStatus) {
		case "current":
			return "Current";
		case "due-soon":
			return "Due soon";
		case "overdue":
			return "Overdue";
	}
}

function getReviewStatusTone(reviewStatus: ReviewStatus) {
	switch (reviewStatus) {
		case "current":
			return "success";
		case "due-soon":
		case "overdue":
			return "warning";
	}
}

export function StateCard(props: StateCardProps) {
	const preload = usePreloadRoute();
	const publishedHref =
		props.registryStatus === "published" ? props.maybeHref : undefined;

	const cardInner = () => (
		<>
			<div class="flex flex-wrap items-center justify-between gap-3">
				<div class="space-y-3">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
							{props.maybeBillId ??
								formatRegistryStatusLabel(props.registryStatus)}
						</p>
						<h3 class="mt-2 text-2xl text-ink">{props.state}</h3>
					</div>
					<p class="text-sm font-medium uppercase tracking-[0.12em] text-ink-subtle">
						{props.status}
					</p>
				</div>
				<div class="flex flex-wrap justify-end gap-2">
					<Badge
						tone={
							props.registryStatus === "published"
								? "success"
								: props.registryStatus === "queued"
									? "warning"
									: "neutral"
						}
					>
						{formatRegistryStatusLabel(props.registryStatus)}
					</Badge>
					<Badge
						tone={
							props.proposalFocus === "bond"
								? "bond"
								: props.proposalFocus === "reserve"
									? "reserve"
									: props.proposalFocus === "both"
										? "accent"
										: "neutral"
						}
					>
						{formatProposalFocusLabel(props.proposalFocus)}
					</Badge>
					<Show when={props.maybeReviewStatus}>
						{(reviewStatus) => (
							<Badge tone={getReviewStatusTone(reviewStatus())}>
								{formatReviewStatusLabel(reviewStatus())}
							</Badge>
						)}
					</Show>
				</div>
			</div>
			<p class="mt-4 text-sm leading-7 text-ink-subtle">{props.summary}</p>
			<div class="mt-5 border-t border-border-soft/80 pt-4">
				<p class="text-sm leading-7 text-ink-subtle/90">{props.significance}</p>
				<div class="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-ink-subtle">
					<Show when={props.maybeLastReviewed}>
						<span class="data-chip text-[0.68rem]">
							Reviewed {props.maybeLastReviewed}
						</span>
					</Show>
					<Show when={props.maybeNextReviewDue}>
						<span class="data-chip text-[0.68rem]">
							Next review {props.maybeNextReviewDue}
						</span>
					</Show>
				</div>
			</div>
		</>
	);

	return publishedHref ? (
		<A
			class={cn(
				"panel-wash block rounded-[var(--radius-card)] p-5 transition-[transform,border-color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
				"hover:-translate-y-0.5 hover:border-accent-muted hover:bg-panel-strong/90 hover:shadow-[0_20px_38px_rgba(0,0,0,0.3)]",
			)}
			href={publishedHref}
			onFocus={() => preload(publishedHref)}
			onMouseEnter={() => preload(publishedHref)}
		>
			{cardInner()}
		</A>
	) : (
		<div class="panel-wash rounded-[var(--radius-card)] p-5">{cardInner()}</div>
	);
}
