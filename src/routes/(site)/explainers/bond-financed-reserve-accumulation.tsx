import { Meta, Title } from "@solidjs/meta";

import { ActionLink } from "../../../components/editorial/ActionLink";
import { MarkdownContent } from "../../../components/editorial/MarkdownContent";
import { PageSection } from "../../../components/editorial/PageSection";
import { getDocumentBySlug } from "../../../lib/site/content";
import { renderMarkdown } from "../../../lib/site/markdown";
import { readDocumentBody } from "../../../lib/site/raw-content";
import { makePageTitle } from "../../../lib/site/seo";

export default function BondFinancedReserveAccumulationExplainerPage() {
  const explainer = getDocumentBySlug("explainer-bond-financed-reserve-accumulation");
  const body = explainer ? readDocumentBody(explainer.path) ?? "" : "";

  return (
    <>
      <Title>{makePageTitle("Bond-financed reserve accumulation explainer")}</Title>
      <Meta name="description" content={explainer?.summary} />

      <PageSection
        eyebrow="Explainer"
        title={explainer?.title ?? "Bond-financed reserve accumulation"}
        lead={explainer?.summary}
      >
        <div class="story-grid gap-6 lg:items-start">
          <div class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
            <MarkdownContent html={renderMarkdown(body)} />
          </div>
          <aside class="proof-rail space-y-4">
            <div class="poster-frame grain-overlay rounded-[calc(var(--radius-soft)+0.25rem)] p-6">
              <p class="eyebrow text-accent-soft">Interpretive lens</p>
              <p class="mt-4 text-lg leading-8 text-white/82">
                Read this page as a financing argument first, not as a generic
                Bitcoin allocation argument. The structure is simple: claim,
                mechanism, objections, limits, then why the preferred model still
                matters.
              </p>
            </div>
            <div class="panel-wash rounded-[var(--radius-card)] p-6">
              <p class="eyebrow">Continue through the site</p>
              <div class="mt-4 flex flex-col gap-3">
                <ActionLink href="/states/illinois" intent="primary">
                  Read the Illinois model packet
                </ActionLink>
                <ActionLink href="/states" intent="secondary">
                  Browse state proposals
                </ActionLink>
              </div>
            </div>
          </aside>
        </div>
      </PageSection>
    </>
  );
}
