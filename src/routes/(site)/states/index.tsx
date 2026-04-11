import { Meta, Title } from "@solidjs/meta";
import { createMemo, createSignal } from "solid-js";

import { PageSection } from "../../../components/editorial/PageSection";
import { StateCard } from "../../../components/editorial/StateCard";
import {
	getRegistryCoverageEntries,
	getRegistryStats,
} from "../../../lib/site/content";
import { makePageTitle } from "../../../lib/site/seo";

export default function StatesIndexPage() {
	const registryStats = getRegistryStats();
	const coverageEntries = getRegistryCoverageEntries();
	const [proposalFocusFilter, setProposalFocusFilter] = createSignal("all");
	const [statusFilter, setStatusFilter] = createSignal("all");
	const [sortMode, setSortMode] = createSignal("priority");

	const visibleStates = createMemo(() => {
		const filtered = coverageEntries.filter((state) => {
			const selectedFocus = proposalFocusFilter();
			const selectedStatus = statusFilter();

			if (selectedFocus !== "all" && state.proposalFocus !== selectedFocus) {
				return false;
			}

			if (selectedStatus !== "all" && state.registryStatus !== selectedStatus) {
				return false;
			}

			return true;
		});

		switch (sortMode()) {
			case "state":
				return [...filtered].sort((left, right) =>
					left.state.localeCompare(right.state),
				);
			case "reviewed":
				return [...filtered].sort((left, right) =>
					(right.maybePublishedState?.lastReviewed ?? "").localeCompare(
						left.maybePublishedState?.lastReviewed ?? "",
					),
				);
			default:
				return filtered;
		}
	});

	return (
		<>
			<Title>{makePageTitle("States")}</Title>
			<Meta
				name="description"
				content="Browse all tracked state reserve and bond records, including published, queued, and unresearched coverage with visible freshness cues."
			/>

			<PageSection
				eyebrow="Registry"
				title="State proposals"
				lead="The registry is now a national coverage surface, not only a list of published records. Published entries stay rich and source-first, while queued and unresearched states remain visibly distinct."
			>
				<div class="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
					<div class="panel-wash rounded-[var(--radius-card)] p-4">
						<p class="eyebrow text-accent-soft">Published</p>
						<p class="mt-3 font-serif text-4xl tracking-[-0.05em] text-ink">
							{registryStats.publishedCount}
						</p>
						<p class="mt-2 text-sm leading-6 text-ink-subtle">
							Public state records available now.
						</p>
					</div>
					<div class="panel-wash rounded-[var(--radius-card)] p-4">
						<p class="eyebrow text-accent-soft">Queued</p>
						<p class="mt-3 font-serif text-4xl tracking-[-0.05em] text-ink">
							{registryStats.queuedCount}
						</p>
						<p class="mt-2 text-sm leading-6 text-ink-subtle">
							States targeted for near-term publication.
						</p>
					</div>
					<div class="panel-wash rounded-[var(--radius-card)] p-4">
						<p class="eyebrow text-accent-soft">Unresearched</p>
						<p class="mt-3 font-serif text-4xl tracking-[-0.05em] text-ink">
							{registryStats.unresearchedCount}
						</p>
						<p class="mt-2 text-sm leading-6 text-ink-subtle">
							Tracked states with no public record yet.
						</p>
					</div>
					<div class="panel-wash rounded-[var(--radius-card)] p-4">
						<p class="eyebrow text-accent-soft">Due soon</p>
						<p class="mt-3 font-serif text-4xl tracking-[-0.05em] text-ink">
							{registryStats.dueSoonCount}
						</p>
						<p class="mt-2 text-sm leading-6 text-ink-subtle">
							Published records nearing review.
						</p>
					</div>
					<div class="panel-wash rounded-[var(--radius-card)] p-4">
						<p class="eyebrow text-accent-soft">Overdue</p>
						<p class="mt-3 font-serif text-4xl tracking-[-0.05em] text-ink">
							{registryStats.overdueCount}
						</p>
						<p class="mt-2 text-sm leading-6 text-ink-subtle">
							Records that need review attention now.
						</p>
					</div>
				</div>
				<div class="panel-wash mb-6 rounded-[var(--radius-card)] p-4 sm:p-5">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<div>
							<p class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent-soft">
								Coverage surface
							</p>
							<p class="mt-2 text-sm leading-7 text-ink-subtle">
								Showing {visibleStates().length} of{" "}
								{registryStats.totalTrackedCount} tracked states.
							</p>
						</div>
						<div class="flex flex-wrap gap-3">
							<label class="data-chip min-w-[11rem] justify-between gap-4 text-[0.72rem] focus-within:border-accent-muted">
								<span>Status</span>
								<select
									aria-label="Status"
									class="min-w-[5.5rem] bg-transparent text-right text-[0.72rem] uppercase tracking-[0.12em] text-ink outline-none focus-visible:outline-none"
									value={statusFilter()}
									onInput={(event) =>
										setStatusFilter(event.currentTarget.value)
									}
								>
									<option value="all">All</option>
									<option value="published">Published</option>
									<option value="queued">Queued</option>
									<option value="unresearched">Unresearched</option>
								</select>
							</label>
							<label class="data-chip min-w-[10.75rem] justify-between gap-4 text-[0.72rem] focus-within:border-accent-muted">
								<span>Focus</span>
								<select
									aria-label="Focus"
									class="min-w-[5.5rem] bg-transparent text-right text-[0.72rem] uppercase tracking-[0.12em] text-ink outline-none focus-visible:outline-none"
									value={proposalFocusFilter()}
									onInput={(event) =>
										setProposalFocusFilter(event.currentTarget.value)
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
									onInput={(event) => setSortMode(event.currentTarget.value)}
								>
									<option value="priority">Priority</option>
									<option value="state">State</option>
									<option value="reviewed">Reviewed</option>
								</select>
							</label>
						</div>
					</div>
				</div>
				{visibleStates().length ? (
					<div class="grid gap-4 lg:grid-cols-2">
						{visibleStates().map((state) => (
							<StateCard
								maybeHref={
									state.registryStatus === "published"
										? `/states/${state.slug}`
										: undefined
								}
								state={state.state}
								registryStatus={state.registryStatus}
								maybeBillId={state.maybePublishedState?.billId}
								status={
									state.maybePublishedState?.status ??
									(state.registryStatus === "queued"
										? "Queued for publication"
										: "No published record yet")
								}
								proposalFocus={state.proposalFocus}
								summary={
									state.maybePublishedState?.summary ??
									(state.registryStatus === "queued"
										? "Canonical authoring work exists or is targeted, but this state is not yet part of the public published batch."
										: "No canonical public state record has been published yet for this state.")
								}
								significance={state.shortNote}
								maybeLastReviewed={state.maybePublishedState?.lastReviewed}
								maybeNextReviewDue={state.maybePublishedState?.nextReviewDue}
								maybeReviewStatus={state.maybePublishedState?.reviewStatus}
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
