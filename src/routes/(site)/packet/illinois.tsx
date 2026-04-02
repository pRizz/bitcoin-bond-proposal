import { Meta, Title } from "@solidjs/meta";

import { MarkdownContent } from "../../../components/editorial/MarkdownContent";
import { PageSection } from "../../../components/editorial/PageSection";
import { getDocumentBySlug } from "../../../lib/site/content";
import { renderMarkdown } from "../../../lib/site/markdown";
import { readDocumentBody } from "../../../lib/site/raw-content";
import { makePageTitle } from "../../../lib/site/seo";

function readPacketDocumentBody(slug: string): string {
  const document = getDocumentBySlug(slug);
  return document ? readDocumentBody(document.path) ?? "" : "";
}

export default function IllinoisPacketPage() {
  const onePager = getDocumentBySlug("illinois-one-pager");
  const draftBill = getDocumentBySlug("illinois-draft-bill");
  const onePagerBody = readPacketDocumentBody("illinois-one-pager");
  const draftBillBody = readPacketDocumentBody("illinois-draft-bill");

  return (
    <>
      <Title>{makePageTitle("Illinois model packet")}</Title>
      <Meta
        name="description"
        content="The normative Illinois model packet: one-pager and draft bill for a disciplined Bitcoin reserve and bond framework."
      />

      <PageSection
        eyebrow="Model packet"
        title="Illinois model packet"
        lead="This is the normative Illinois model surface of the site: the project’s one-pager and draft bill, separate from the descriptive HB1844 registry record."
      >
        <div class="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
          <aside class="proof-rail space-y-4">
            <div class="poster-frame grain-overlay rounded-[calc(var(--radius-soft)+0.25rem)] p-6">
              <p class="eyebrow text-accent-soft">What this page is</p>
              <p class="mt-4 text-lg leading-8 text-white/82">
                The model layer: a normative Illinois packet built from the
                project&apos;s canonical one-pager and draft bill sources.
              </p>
            </div>
            <div class="panel-wash rounded-[var(--radius-card)] p-6">
              <p class="eyebrow">Packet contents</p>
              <p class="mt-3 text-sm leading-6 text-ink-subtle">
                The one-pager provides the concise case. The draft bill shows the
                longer-form legislative structure behind it.
              </p>
            </div>
          </aside>
          <div class="grid gap-6">
            <section class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
              <p class="eyebrow">Illinois one-pager</p>
              <h2 class="mt-3 text-3xl text-ink sm:text-4xl">
                {onePager?.title ?? "Illinois one-pager"}
              </h2>
              <p class="mt-4 text-base leading-7 text-ink-subtle">
                {onePager?.summary}
              </p>
              <div class="mt-6">
                <MarkdownContent html={renderMarkdown(onePagerBody)} />
              </div>
            </section>

            <section class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
              <p class="eyebrow">Illinois draft bill</p>
              <h2 class="mt-3 text-3xl text-ink sm:text-4xl">
                {draftBill?.title ?? "Illinois draft bill"}
              </h2>
              <p class="mt-4 text-base leading-7 text-ink-subtle">
                {draftBill?.summary}
              </p>
              <div class="mt-6">
                <MarkdownContent html={renderMarkdown(draftBillBody)} />
              </div>
            </section>
          </div>
        </div>
      </PageSection>
    </>
  );
}
