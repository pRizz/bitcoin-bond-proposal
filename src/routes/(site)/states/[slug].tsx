import { Meta, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";

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
          <aside class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6">
            <div class="flex flex-wrap gap-2">
              <Badge tone={state.proposalKind === "bond" ? "bond" : state.proposalKind === "reserve" ? "reserve" : "accent"}>
                {state.proposalKind}
              </Badge>
              <Badge tone="neutral">{formatRecordType(state.recordType)}</Badge>
            </div>
            <dl class="mt-5 grid gap-3 text-sm leading-6 text-ink-subtle">
              <div>
                <dt class="font-semibold text-ink">Status</dt>
                <dd>{state.status}</dd>
              </div>
              <div>
                <dt class="font-semibold text-ink">Status as of</dt>
                <dd>{state.statusAsOf}</dd>
              </div>
              <div>
                <dt class="font-semibold text-ink">Last reviewed</dt>
                <dd>{state.lastReviewed}</dd>
              </div>
              <div>
                <dt class="font-semibold text-ink">Confidence</dt>
                <dd class="capitalize">{state.confidence}</dd>
              </div>
              <div>
                <dt class="font-semibold text-ink">Chamber / authority</dt>
                <dd>{state.chamber}</dd>
              </div>
            </dl>
            {state.manifest?.shortNote ? (
              <div class="mt-6 rounded-[var(--radius-card)] bg-white/65 p-4 text-sm leading-6 text-ink-subtle">
                <p class="font-semibold text-ink">Registry note</p>
                <p class="mt-2">{state.manifest.shortNote}</p>
              </div>
            ) : null}
            <div class="mt-6 rounded-[var(--radius-card)] bg-white/65 p-4 text-sm leading-6 text-ink-subtle">
              <p class="font-semibold text-ink">Read the financing case</p>
              <p class="mt-2">
                This page stays descriptive. The sharper argument about why
                financing structure matters lives in the first explainer.
              </p>
            </div>
          </aside>
          <div class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
            <MarkdownContent html={renderMarkdown(body)} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
