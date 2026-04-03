import { readFile } from "node:fs/promises";

import MarkdownIt from "markdown-it";

import type { DocumentFrontmatter, MarkdownRecord } from "./schema";

const markdown = new MarkdownIt({
	html: false,
	linkify: true,
	typographer: true,
});

export async function renderPdfHtml(
	document: MarkdownRecord<DocumentFrontmatter>,
): Promise<string> {
	const stylesheet = await readFile(
		new URL("./pdf-theme.css", import.meta.url),
		"utf8",
	);
	const bodyHtml = markdown.render(document.body);

	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(document.frontmatter.title)}</title>
    <style>${stylesheet}</style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">${escapeHtml(document.frontmatter.documentKind)}</p>
        <h1>${escapeHtml(document.frontmatter.title)}</h1>
        <p>${escapeHtml(document.frontmatter.summary)}</p>
        <p><strong>Updated:</strong> ${escapeHtml(document.frontmatter.updatedAt)}</p>
      </header>
      ${bodyHtml}
    </main>
  </body>
</html>`;
}

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}
