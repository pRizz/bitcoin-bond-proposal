import { Meta, Title } from "@solidjs/meta";

import { ActionLink } from "../../../components/editorial/ActionLink";
import { PageSection } from "../../../components/editorial/PageSection";
import { RegistryFreshnessPanel } from "../../../components/editorial/RegistryFreshnessPanel";
import { StateCard } from "../../../components/editorial/StateCard";
import {
	getRegistryFreshnessSummary,
	getStatesComparisonModel,
} from "../../../lib/site/content";
import { makePageTitle } from "../../../lib/site/seo";

export default function StatesComparePage() {
	const statesComparisonModel = getStatesComparisonModel();
	const registryFreshness = getRegistryFreshnessSummary();

	return (
		<>
			<Title>{makePageTitle("State Comparisons")}</Title>
			<Meta
				name="description"
				content="Compare the current ten-state registry through editorial reserve, crossover, and bond-side reading paths."
			/>

			<PageSection
				eyebrow="Comparison surfaces"
				title="Compare the current registry without losing the source trail"
				lead="This route keeps the comparison work narrative and selective: it highlights the most meaningful differences in the current ten-state set and routes every example back to its canonical state record."
			>
				<RegistryFreshnessPanel
					summary={registryFreshness}
					note="Comparison sections stay narrative, but they now carry the same dated-snapshot freshness contract as the catalog and detail routes."
				/>
				<div class="panel-wash rounded-[var(--radius-card)] p-5 sm:p-6">
					<div class="max-w-3xl">
						<p class="text-sm leading-7 text-ink-subtle">
							Use this route when you want a sharper reserve-versus-bond and
							early-stage-versus-enacted reading path than the base registry
							index provides.
						</p>
					</div>
					<div class="mt-5 flex flex-wrap gap-3">
						<ActionLink href="/states" intent="secondary">
							Back to the full registry
						</ActionLink>
						<ActionLink href="/states/clusters" intent="secondary">
							Open cluster reading paths
						</ActionLink>
					</div>
				</div>
			</PageSection>

			{statesComparisonModel.sections.map((section) => (
				<PageSection
					eyebrow={section.eyebrow}
					title={section.title}
					lead={section.lead}
				>
					<div class="panel-wash rounded-[var(--radius-card)] p-5 sm:p-6">
						<p class="text-sm leading-7 text-ink-subtle">
							{section.comparison}
						</p>
					</div>

					<div class="mt-6 grid gap-4 xl:grid-cols-2">
						{section.featuredStates.map((state) => (
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

					{section.supportingStates.length ? (
						<div class="panel-wash mt-6 rounded-[var(--radius-card)] p-5 sm:p-6">
							<p class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent-soft">
								Supporting records
							</p>
							<div class="mt-4 flex flex-wrap gap-3">
								{section.supportingStates.map((state) => (
									<ActionLink href={state.href} intent="secondary">
										{state.state}
									</ActionLink>
								))}
							</div>
						</div>
					) : null}
				</PageSection>
			))}
		</>
	);
}
