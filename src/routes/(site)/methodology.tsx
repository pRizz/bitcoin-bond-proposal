import { Meta, Title } from "@solidjs/meta";

import { MarkdownContent } from "../../components/editorial/MarkdownContent";
import { PageSection } from "../../components/editorial/PageSection";
import { getMethodologyDocument } from "../../lib/site/content";
import { renderMarkdown } from "../../lib/site/markdown";
import { readDocumentBody } from "../../lib/site/raw-content";
import { makePageTitle } from "../../lib/site/seo";

export default function MethodologyPage() {
	const methodologyDocument = getMethodologyDocument();
	const body = methodologyDocument
		? (readDocumentBody(methodologyDocument.path) ?? "")
		: "";

	return (
		<>
			<Title>{makePageTitle("Methodology")}</Title>
			<Meta
				name="description"
				content="How Bitcoin Bond Proposal classifies, sources, labels, and interprets state reserve and bond records."
			/>

			<PageSection
				eyebrow="Methodology"
				title="This site is not neutral. It is source-first."
				lead="Bitcoin Bond Proposal favors disciplined, bond-financed Bitcoin reserve accumulation. That bias is explicit. The obligation to label records honestly, preserve source hierarchy, and surface confidence and freshness is non-negotiable."
			>
				<div class="grid gap-4 lg:grid-cols-3">
					<div class="panel-wash rounded-[var(--radius-card)] p-5">
						<p class="eyebrow">Bias</p>
						<p class="mt-3 text-sm leading-6 text-ink-subtle">
							The site argues for a specific public-finance pathway instead of
							pretending all reserve and bond ideas are equally compelling.
						</p>
					</div>
					<div class="panel-wash rounded-[var(--radius-card)] p-5">
						<p class="eyebrow">Trust rule</p>
						<p class="mt-3 text-sm leading-6 text-ink-subtle">
							Primary legislative or authority records remain the floor for
							every publishable entry.
						</p>
					</div>
					<div class="panel-wash rounded-[var(--radius-card)] p-5">
						<p class="eyebrow">Caveat</p>
						<p class="mt-3 text-sm leading-6 text-ink-subtle">
							Weak, symbolic, or only indirectly relevant records may still
							appear, but they will be labeled as such rather than inflated.
						</p>
					</div>
				</div>
			</PageSection>

			<PageSection
				eyebrow="Canonical memo"
				title={methodologyDocument?.title ?? "Methodology memo"}
				lead={methodologyDocument?.summary}
			>
				<div class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
					<MarkdownContent html={renderMarkdown(body)} />
				</div>
			</PageSection>
		</>
	);
}
