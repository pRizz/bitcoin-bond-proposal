import { Meta, Title } from "@solidjs/meta";
import { createMemo, createSignal } from "solid-js";

import { ActionLink } from "../../../components/editorial/ActionLink";
import { PageSection } from "../../../components/editorial/PageSection";
import { StateCard } from "../../../components/editorial/StateCard";
import {
	getStatesIndexModel,
	type ProposalKind,
	type StatesIndexSortMode,
} from "../../../lib/site/content";
import { makePageTitle } from "../../../lib/site/seo";

const proposalFocusLabels = {
	bond: "Bond focus",
	reserve: "Reserve focus",
	both: "Reserve + bond",
	unknown: "Unknown",
} as const;

const regionLabels = {
	northeast: "Northeast",
	midwest: "Midwest",
	south: "South",
	west: "West",
} as const;

const legislativeStatusLabels = {
	introduced: "Introduced",
	advanced: "Advanced",
	approved: "Approved",
	enacted: "Enacted",
	failed: "Failed",
} as const;

export default function StatesIndexPage() {
	const statesIndexModel = getStatesIndexModel();
	const [proposalKindFilter, setProposalKindFilter] = createSignal<
		ProposalKind | "all"
	>("all");
	const [sortMode, setSortMode] = createSignal<StatesIndexSortMode>("priority");

	const visibleStates = createMemo(() => {
		const selectedProposalKind = proposalKindFilter();
		const filteredStates =
			selectedProposalKind === "all"
				? statesIndexModel.states
				: statesIndexModel.states.filter(
						(state) => state.proposalKind === selectedProposalKind,
					);

		switch (sortMode()) {
			case "state":
				return [...filteredStates].sort((left, right) =>
					left.state.localeCompare(right.state),
				);
			case "reviewed":
				return [...filteredStates].sort((left, right) =>
					right.lastReviewed.localeCompare(left.lastReviewed),
				);
			default:
				return filteredStates;
		}
	});

	const proposalFocusGroups = statesIndexModel.groups.byProposalFocus.filter(
		(group) => group.count > 0,
	);
	const regionGroups = statesIndexModel.groups.byRegion.filter(
		(group) => group.count > 0,
	);
	const legislativeStatusGroups =
		statesIndexModel.groups.byLegislativeStatusGroup.filter(
			(group) => group.count > 0,
		);

	return (
		<>
			<Title>{makePageTitle("States")}</Title>
			<Meta
				name="description"
				content="Browse published state reserve and bond records with visible freshness, significance, and record-footing cues."
			/>

			<PageSection
				eyebrow="Registry"
				title="State proposals"
				lead="The registry stays medium-density: enough structure to browse published records by focus, region, and legislative position while keeping record footing visible without pretending this surface is a live tracker."
			>
				<div class="panel-wash mb-6 rounded-[var(--radius-card)] p-4 sm:p-5">
					<div class="flex flex-wrap items-start justify-between gap-4">
						<div class="max-w-2xl">
							<p class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent-soft">
								Published states
							</p>
							<p class="mt-2 text-sm leading-7 text-ink-subtle">
								Showing {visibleStates().length} of{" "}
								{statesIndexModel.stats.publishedCount} published records.
								Latest review{" "}
								{statesIndexModel.stats.latestReview ?? "Unavailable"}. Status
								snapshots currently span{" "}
								{statesIndexModel.freshness.freshestStatusAgeDays ??
									"Unavailable"}{" "}
								to{" "}
								{statesIndexModel.freshness.stalestStatusAgeDays ??
									"Unavailable"}{" "}
								days because this catalog remains explicitly dated.
							</p>
							<p class="mt-3 text-sm leading-7 text-ink-subtle">
								Each card notes whether the record is an early-stage bill, an
								advanced or enacted measure, or an authority action so the
								coverage posture stays visible without turning this page into a
								scorecard.
							</p>
							<div class="mt-4 flex flex-wrap items-center gap-3">
								<ActionLink href="/states/clusters" intent="secondary">
									Open cluster reading paths
								</ActionLink>
								<ActionLink href="/states/compare" intent="secondary">
									Open comparison surfaces
								</ActionLink>
								<p class="text-sm leading-7 text-ink-subtle">
									Prefer the same ten published records grouped by status,
									proposal focus, and region? Use <code>/states/clusters</code>{" "}
									for the editorial cluster surface. Want the strongest reserve,
									crossover, and bond-side comparisons? Use{" "}
									<code>/states/compare</code>.
								</p>
							</div>
						</div>
						<div class="flex flex-wrap gap-3">
							<label class="data-chip min-w-[10.75rem] justify-between gap-4 text-[0.72rem] focus-within:border-accent-muted">
								<span>Type</span>
								<select
									aria-label="Type"
									class="min-w-[5.5rem] bg-transparent text-right text-[0.72rem] uppercase tracking-[0.12em] text-ink outline-none focus-visible:outline-none"
									value={proposalKindFilter()}
									onInput={(event) =>
										setProposalKindFilter(
											event.currentTarget.value as ProposalKind | "all",
										)
									}
								>
									<option value="all">All</option>
									<option value="bond">Bond</option>
									<option value="reserve">Reserve</option>
									<option value="both">Both</option>
								</select>
							</label>
							<label class="data-chip min-w-[10.75rem] justify-between gap-4 text-[0.72rem] focus-within:border-accent-muted">
								<span>Sort</span>
								<select
									aria-label="Sort"
									class="min-w-[5.5rem] bg-transparent text-right text-[0.72rem] uppercase tracking-[0.12em] text-ink outline-none focus-visible:outline-none"
									value={sortMode()}
									onInput={(event) =>
										setSortMode(
											event.currentTarget.value as StatesIndexSortMode,
										)
									}
								>
									<option value="priority">Priority</option>
									<option value="state">State</option>
									<option value="reviewed">Reviewed</option>
								</select>
							</label>
						</div>
					</div>
					<div class="mt-5 space-y-3 text-[0.72rem] uppercase tracking-[0.12em] text-ink-subtle">
						<div class="flex flex-wrap items-center gap-2">
							<span class="text-accent-soft">Focus mix</span>
							{proposalFocusGroups.map((group) => (
								<span class="data-chip">
									{proposalFocusLabels[group.key]} {group.count}
								</span>
							))}
						</div>
						<div class="flex flex-wrap items-center gap-2">
							<span class="text-accent-soft">Region mix</span>
							{regionGroups.map((group) => (
								<span class="data-chip">
									{regionLabels[group.key]} {group.count}
								</span>
							))}
						</div>
						<div class="flex flex-wrap items-center gap-2">
							<span class="text-accent-soft">Status mix</span>
							{legislativeStatusGroups.map((group) => (
								<span class="data-chip">
									{legislativeStatusLabels[group.key]} {group.count}
								</span>
							))}
						</div>
					</div>
				</div>
				{visibleStates().length ? (
					<div class="grid gap-4 lg:grid-cols-2">
						{visibleStates().map((state) => (
							<StateCard
								href={`/states/${state.slug}`}
								state={state.state}
								billId={state.billId}
								status={state.status}
								proposalKind={state.proposalKind}
								summary={state.summary}
								significance={state.shortNote}
								confidenceCue={state.confidenceCue}
								lastReviewed={state.lastReviewed}
							/>
						))}
					</div>
				) : (
					<div class="panel-wash rounded-[var(--radius-card)] p-6 text-sm leading-7 text-ink-subtle">
						No published records match the current filters.
					</div>
				)}
			</PageSection>
		</>
	);
}
