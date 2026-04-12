import { Meta, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";

import { ActionLink } from "../../../components/editorial/ActionLink";
import { Badge } from "../../../components/editorial/Badge";
import { MarkdownContent } from "../../../components/editorial/MarkdownContent";
import { PageSection } from "../../../components/editorial/PageSection";
import { getStateBySlug } from "../../../lib/site/content";
import { renderMarkdown } from "../../../lib/site/markdown";
import { readStateBody } from "../../../lib/site/raw-content";
import { makePageTitle } from "../../../lib/site/seo";

function formatRecordType(recordType: string): string {
	return recordType.replaceAll("-", " ");
}

export default function StateDetailPage() {
	const params = useParams();
	const slug = params.slug;
	const state = slug ? getStateBySlug(slug) : undefined;

	if (!state) {
		return (
			<>
				<Title>{makePageTitle("State not found")}</Title>
				<PageSection
					eyebrow="Not found"
					title="This state record is not published"
					lead="The public shell only exposes published registry entries from the canonical content pipeline."
				>
					<div class="panel-wash rounded-[var(--radius-card)] p-6 text-sm leading-6 text-ink-subtle">
						Try the published registry batch from the states index instead.
					</div>
				</PageSection>
			</>
		);
	}

	const body = readStateBody(state.path) ?? "";

	return (
		<>
			<Title>{makePageTitle(`${state.state} ${state.billId}`)}</Title>
			<Meta name="description" content={state.summary} />

			<PageSection
				eyebrow="State record"
				title={`${state.state} ${state.billId}`}
				lead={state.summary}
			>
				<div class="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
					<aside class="support-panel rounded-[calc(var(--radius-soft)+0.25rem)] p-6">
						<div class="flex flex-wrap gap-2">
							<Badge
								tone={
									state.proposalKind === "bond"
										? "bond"
										: state.proposalKind === "reserve"
											? "reserve"
											: "accent"
								}
							>
								{state.proposalKind}
							</Badge>
							<Badge tone="neutral">{formatRecordType(state.recordType)}</Badge>
						</div>
						<dl class="mt-5 grid gap-3 text-sm leading-6 text-ink-subtle sm:grid-cols-2 lg:grid-cols-1">
							<div>
								<dt class="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink">
									Status
								</dt>
								<dd>{state.status}</dd>
							</div>
							<div>
								<dt class="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink">
									Status as of
								</dt>
								<dd>{state.statusAsOf}</dd>
							</div>
							<div>
								<dt class="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink">
									Last reviewed
								</dt>
								<dd>{state.lastReviewed}</dd>
							</div>
							<div>
								<dt class="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink">
									Chamber / authority
								</dt>
								<dd>{state.chamber}</dd>
							</div>
							<div class="sm:col-span-2 lg:col-span-1">
								<dt class="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink">
									Record footing
								</dt>
								<dd>
									<p class="font-medium text-ink">
										{state.confidenceCue.title}
									</p>
									<p class="mt-2 text-sm leading-6 text-ink-subtle">
										{state.confidenceCue.detail}
									</p>
								</dd>
							</div>
						</dl>
						{state.manifest?.shortNote ? (
							<div class="support-panel mt-6 rounded-[var(--radius-card)] p-4 text-sm leading-7 text-ink-subtle">
								<p class="font-semibold text-ink">Registry note</p>
								<p class="mt-2">{state.manifest.shortNote}</p>
							</div>
						) : null}
						{state.slug === "illinois" ? (
							<div class="support-panel mt-6 rounded-[var(--radius-card)] p-4 text-sm leading-7 text-ink-subtle">
								<p class="font-semibold text-ink">Illinois model packet</p>
								<p class="mt-2">
									This HB1844 page is the descriptive registry record. The
									normative Illinois packet lives separately as the
									project&apos;s one-pager and draft bill model.
								</p>
								<div class="mt-4">
									<ActionLink href="/packet/illinois" intent="secondary">
										Open the Illinois packet
									</ActionLink>
								</div>
							</div>
						) : null}
						<div class="support-panel mt-6 rounded-[var(--radius-card)] p-4 text-sm leading-7 text-ink-subtle">
							<p class="font-semibold text-ink">Read the financing case</p>
							<p class="mt-2">
								This page stays descriptive. The sharper argument about why
								financing structure matters lives in the first explainer.
							</p>
						</div>
						<div class="support-panel mt-6 rounded-[var(--radius-card)] p-4 text-sm leading-7 text-ink-subtle">
							<p class="font-semibold text-ink">Freshness</p>
							<p class="mt-2 font-medium text-ink">
								{state.freshnessCue.title}
							</p>
							<p class="mt-2">{state.freshnessCue.detail}</p>
							<p class="mt-3">
								Status snapshot {state.statusAsOf}. Last reviewed{" "}
								{state.lastReviewed}.
							</p>
						</div>
					</aside>
					<div class="reading-surface rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
						<MarkdownContent html={renderMarkdown(body)} />
					</div>
				</div>
			</PageSection>
		</>
	);
}
