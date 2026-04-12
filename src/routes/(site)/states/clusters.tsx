import { Meta, Title } from "@solidjs/meta";

import { ActionLink } from "../../../components/editorial/ActionLink";
import { PageSection } from "../../../components/editorial/PageSection";
import { RegistryFreshnessPanel } from "../../../components/editorial/RegistryFreshnessPanel";
import { StateCard } from "../../../components/editorial/StateCard";
import {
	getRegistryFreshnessSummary,
	getStatesClusterModel,
	type StatesClusterBucket,
} from "../../../lib/site/content";
import { makePageTitle } from "../../../lib/site/seo";

function formatBucketCountLabel(count: number): string {
	return `${count} published ${count === 1 ? "record" : "records"}`;
}

function ClusterBucketPanel(props: { bucket: StatesClusterBucket }) {
	return (
		<section class="panel-wash rounded-[var(--radius-card)] p-5 sm:p-6">
			<div class="max-w-2xl">
				<p class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent-soft">
					{formatBucketCountLabel(props.bucket.count)}
				</p>
				<h3 class="mt-2 text-2xl text-ink">{props.bucket.title}</h3>
				<p class="mt-3 text-sm leading-7 text-ink-subtle">
					{props.bucket.description}
				</p>
			</div>
			<div class="mt-5 grid gap-4 xl:grid-cols-2">
				{props.bucket.states.map((state) => (
					<StateCard
						href={state.href}
						state={state.state}
						billId={state.billId}
						status={state.status}
						statusAsOf={state.statusAsOf}
						proposalKind={state.proposalKind}
						badgeLabel={state.badgeLabel}
						badgeTone={state.badgeTone}
						summary={state.summary}
						significance={state.manifest?.shortNote ?? state.shortNote}
						confidenceCue={state.confidenceCue}
						lastReviewed={state.lastReviewed}
					/>
				))}
			</div>
		</section>
	);
}

export default function StatesClustersPage() {
	const statesClusterModel = getStatesClusterModel();
	const registryFreshness = getRegistryFreshnessSummary();

	return (
		<>
			<Title>{makePageTitle("State Clusters")}</Title>
			<Meta
				name="description"
				content="Browse the ten-state registry through editorial clusters organized by legislative status, proposal focus, and region."
			/>

			<PageSection
				eyebrow="Cluster reading paths"
				title="Browse the registry in grouped reading lanes"
				lead="This surface turns the current ten-state batch into editorial clusters by status, proposal focus, and geography without changing the registry into a scoreboard."
			>
				<RegistryFreshnessPanel
					summary={registryFreshness}
					note="Grouped browsing now keeps the same dated-snapshot cues as the base catalog, so readers can compare clusters without losing track of review timing."
				/>
				<div class="panel-wash rounded-[var(--radius-card)] p-5 sm:p-6">
					<div class="max-w-3xl">
						<p class="text-sm leading-7 text-ink-subtle">
							Use this route when you want the same published records grouped
							into clearer reading paths instead of scanning the base catalog
							one card at a time.
						</p>
						<p class="mt-3 text-sm leading-7 text-ink-subtle">
							Every card below routes back to its canonical{" "}
							<code>/states/[slug]</code> detail page, so the grouped view stays
							one click away from the source-backed state record.
						</p>
					</div>
					<div class="mt-5 flex flex-wrap gap-3">
						<ActionLink href="/states" intent="secondary">
							Back to the full registry
						</ActionLink>
					</div>
				</div>
			</PageSection>

			{statesClusterModel.sections.map((section) => (
				<PageSection
					eyebrow={section.eyebrow}
					title={section.title}
					lead={section.lead}
				>
					<div class="space-y-5">
						{section.buckets.map((bucket) => (
							<ClusterBucketPanel bucket={bucket} />
						))}
					</div>
				</PageSection>
			))}
		</>
	);
}
