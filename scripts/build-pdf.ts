#!/usr/bin/env bun

import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

import { readMarkdownCollection } from "../src/lib/content/load-markdown.ts";
import { renderPdfHtml } from "../src/lib/content/render-pdf-html.ts";
import { parseDocumentFrontmatter } from "../src/lib/content/schema.ts";

const requiredPdfSlugs = new Set([
  "illinois-one-pager",
  "illinois-draft-bill",
  "methodology",
]);

async function run() {
  try {
    const docsPath = path.join(process.cwd(), "content", "docs");
    const outputPath = path.join(process.cwd(), "pdf");
    const documents = await readMarkdownCollection(docsPath, parseDocumentFrontmatter);
    const printableDocuments = documents.filter(
      (document) =>
        document.frontmatter.outputs.includes("pdf") &&
        requiredPdfSlugs.has(document.frontmatter.slug),
    );

    if (printableDocuments.length !== requiredPdfSlugs.size) {
      throw new Error(
        `Expected ${requiredPdfSlugs.size} printable packet docs, found ${printableDocuments.length}`,
      );
    }

    await mkdir(outputPath, { recursive: true });

    const browser = await chromium.launch({ headless: true });

    try {
      for (const document of printableDocuments) {
        const page = await browser.newPage();
        const html = await renderPdfHtml(document);
        const filePath = path.join(outputPath, `${document.frontmatter.slug}.pdf`);

        await page.setContent(html, { waitUntil: "load" });
        await page.pdf({
          path: filePath,
          format: "Letter",
          margin: {
            top: "0.5in",
            right: "0.5in",
            bottom: "0.5in",
            left: "0.5in",
          },
          printBackground: true,
        });
        await page.close();
      }
    } finally {
      await browser.close();
    }

    console.log(`Generated ${printableDocuments.length} packet PDF(s).`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown PDF build error";
    console.error(`PDF build failed: ${message}`);
    process.exitCode = 1;
  }
}

await run();
