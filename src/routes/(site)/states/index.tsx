import { Meta, Title } from "@solidjs/meta";
import { createMemo, createSignal } from "solid-js";

import { PageSection } from "../../../components/editorial/PageSection";
import { StateCard } from "../../../components/editorial/StateCard";
import { getPublishedStates } from "../../../lib/site/content";
import { makePageTitle } from "../../../lib/site/seo";

export default function StatesIndexPage() {
	const publishedStates = getPublishedStates();
	const [proposalFocusFilter, setProposalFocusFilter] = createSignal("all");
	const [sortMode, setSortMode] = createSignal("priority");

	const visibleStates = createMemo(() => {
		const filtered = publishedStates.filter((state) => {
			const selectedFocus = proposalFocusFilter();
			if (selectedFocus === "all") {
				return true;
			}

			return state.proposalKind === selectedFocus;
		});

		switch (sortMode()) {
			case "state":
				return [...filtered].sort((left, right) =>
					left.state.localeCompare(right.state),
				);
			case "reviewed":
				return [...filtered].sort((left, right) =>
					right.lastReviewed.localeCompare(left.lastReviewed),
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
				content="Browse the first published batch of state reserve and bond records with visible freshness and significance cues."
			/>

			<PageSection
				eyebrow="Registry"
				title="State proposals"
				lead="The first shell keeps the catalog medium-density: enough signal to scan quickly, enough metadata to trust what you are looking at."
			>
				<div class="mb-6 flex flex-wrap gap-3">
					<label class="data-chip text-[0.72rem]">
						<span>Focus</span>
						<select
							class="bg-transparent text-[0.72rem] uppercase tracking-[0.12em] outline-none"
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
					<label class="data-chip text-[0.72rem]">
						<span>Sort</span>
						<select
							class="bg-transparent text-[0.72rem] uppercase tracking-[0.12em] outline-none"
							value={sortMode()}
							onInput={(event) => setSortMode(event.currentTarget.value)}
						>
							<option value="priority">Priority</option>
							<option value="state">State</option>
							<option value="reviewed">Reviewed</option>
						</select>
					</label>
				</div>
				<div class="grid gap-4 lg:grid-cols-2">
					{visibleStates().map((state) => (
						<StateCard
							href={`/states/${state.slug}`}
							state={state.state}
							billId={state.billId}
							status={state.status}
							proposalKind={state.proposalKind}
							summary={state.summary}
							significance={
								state.manifest?.shortNote ?? "Published registry entry."
							}
							lastReviewed={state.lastReviewed}
						/>
					))}
				</div>
			</PageSection>
		</>
	);
}
