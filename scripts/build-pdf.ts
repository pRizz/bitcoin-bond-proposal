#!/usr/bin/env bun

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
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
const pdfHashManifestPath = path.join(
	process.cwd(),
	"generated",
	"pdf-input-hashes.json",
);

async function run() {
	try {
		const docsPath = path.join(process.cwd(), "content", "docs");
		const outputPath = path.join(process.cwd(), "pdf");
		const documents = await readMarkdownCollection(
			docsPath,
			parseDocumentFrontmatter,
		);
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
		await mkdir(path.dirname(pdfHashManifestPath), { recursive: true });

		const stylesheet = await readFile(
			new URL("../src/lib/content/pdf-theme.css", import.meta.url),
			"utf8",
		);
		const rendererSource = await readFile(
			new URL("../src/lib/content/render-pdf-html.ts", import.meta.url),
			"utf8",
		);
		const previousHashes = await readPdfHashManifest();
		const nextHashes: Record<string, string> = {};
		const documentsToRender = [];

		for (const document of printableDocuments) {
			const inputHash = createHash("sha256")
				.update(document.body)
				.update(JSON.stringify(document.frontmatter))
				.update(stylesheet)
				.update(rendererSource)
				.digest("hex");
			const filePath = path.join(
				outputPath,
				`${document.frontmatter.slug}.pdf`,
			);
			const maybePreviousHash = previousHashes[document.frontmatter.slug];
			const shouldRender =
				!existsSync(filePath) ||
				(maybePreviousHash !== undefined && maybePreviousHash !== inputHash);

			nextHashes[document.frontmatter.slug] = inputHash;

			if (shouldRender) {
				documentsToRender.push({ document, filePath });
			}
		}

		if (documentsToRender.length > 0) {
			const browser = await chromium.launch({ headless: true });

			try {
				for (const { document, filePath } of documentsToRender) {
					const page = await browser.newPage();
					const html = await renderPdfHtml(document);

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
		}

		await writeFile(pdfHashManifestPath, JSON.stringify(nextHashes, null, 2));

		console.log(
			`Generated ${documentsToRender.length} packet PDF(s); ${printableDocuments.length - documentsToRender.length} already up to date.`,
		);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown PDF build error";
		console.error(`PDF build failed: ${message}`);
		process.exitCode = 1;
	}
}

async function readPdfHashManifest(): Promise<Record<string, string>> {
	if (!existsSync(pdfHashManifestPath)) {
		return {};
	}

	const rawManifest = await readFile(pdfHashManifestPath, "utf8");
	const parsedManifest = JSON.parse(rawManifest) as Record<string, string>;
	return parsedManifest;
}

await run();
