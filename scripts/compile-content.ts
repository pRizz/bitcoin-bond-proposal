#!/usr/bin/env bun

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
	assertKnownProposalClassification,
	assertManifestMatchesPublishedStates,
	assertUniqueSlugs,
	parseDocumentFrontmatter,
	parseProposalTaxonomy,
	parseStateRegistryManifest,
	parseStateEntryFrontmatter,
} from "../src/lib/content/schema.ts";
import { readMarkdownCollection } from "../src/lib/content/load-markdown.ts";

type CompiledContentGraph = {
	docs: Array<{
		title: string;
		slug: string;
		summary: string;
		documentKind: string;
		audience: string[];
		outputs: string[];
		updatedAt: string;
		path: string;
	}>;
	states: Array<{
		title: string;
		slug: string;
		state: string;
		summary: string;
		recordType: string;
		registryStatus: string;
		proposalFocus: string;
		shortNote: string;
		editorialPriority: string;
		proposalKind: string;
		proposalSubtype: string;
		billId: string;
		chamber: string;
		status: string;
		statusAsOf: string;
		lastReviewed: string;
		confidence: string;
		path: string;
	}>;
	registry: {
		manifest: ReturnType<typeof parseStateRegistryManifest>;
		publishedSlugs: string[];
	};
	taxonomy: ReturnType<typeof parseProposalTaxonomy>;
};

async function compileContentGraph(): Promise<CompiledContentGraph> {
	const taxonomyPath = path.join(
		process.cwd(),
		"content",
		"data",
		"proposal-taxonomy.json",
	);
	const rawTaxonomy = await readFile(taxonomyPath, "utf8");
	const taxonomy = parseProposalTaxonomy(JSON.parse(rawTaxonomy));
	const manifestPath = path.join(
		process.cwd(),
		"content",
		"data",
		"state-registry-manifest.json",
	);
	const rawManifest = await readFile(manifestPath, "utf8");
	const registryManifest = parseStateRegistryManifest(JSON.parse(rawManifest));

	const [docs, explainers, states] = await Promise.all([
		readMarkdownCollection(
			path.join(process.cwd(), "content", "docs"),
			parseDocumentFrontmatter,
		),
		readMarkdownCollection(
			path.join(process.cwd(), "content", "explainers"),
			parseDocumentFrontmatter,
		),
		readMarkdownCollection(
			path.join(process.cwd(), "content", "states"),
			parseStateEntryFrontmatter,
		),
	]);

	for (const stateEntry of states) {
		assertKnownProposalClassification(stateEntry.frontmatter, taxonomy);
	}

	assertManifestMatchesPublishedStates(
		registryManifest.states,
		states.map((record) => record.frontmatter),
	);

	assertUniqueSlugs(
		[...docs, ...explainers, ...states].map((record) => ({
			path: path.relative(process.cwd(), record.path),
			slug: record.frontmatter.slug,
		})),
	);
	assertUniqueSlugs(
		registryManifest.states.map((entry) => ({
			path: "content/data/state-registry-manifest.json",
			slug: entry.slug,
		})),
	);

	return {
		docs: [...docs, ...explainers].map((record) => ({
			title: record.frontmatter.title,
			slug: record.frontmatter.slug,
			summary: record.frontmatter.summary,
			documentKind: record.frontmatter.documentKind,
			audience: record.frontmatter.audience,
			outputs: record.frontmatter.outputs,
			updatedAt: record.frontmatter.updatedAt,
			path: path.relative(process.cwd(), record.path),
		})),
		states: states.map((record) => {
			const manifestEntry = registryManifest.states.find(
				(entry) => entry.slug === record.frontmatter.slug,
			);

			if (!manifestEntry) {
				throw new Error(
					`Missing manifest entry for published state "${record.frontmatter.slug}"`,
				);
			}

			return {
				title: record.frontmatter.title,
				slug: record.frontmatter.slug,
				state: record.frontmatter.state,
				summary: record.frontmatter.summary,
				recordType: record.frontmatter.recordType,
				registryStatus: manifestEntry.registryStatus,
				proposalFocus: manifestEntry.proposalFocus,
				shortNote: manifestEntry.shortNote,
				editorialPriority: manifestEntry.editorialPriority,
				proposalKind: record.frontmatter.proposalKind,
				proposalSubtype: record.frontmatter.proposalSubtype,
				billId: record.frontmatter.billId,
				chamber: record.frontmatter.chamber,
				status: record.frontmatter.status,
				statusAsOf: record.frontmatter.statusAsOf,
				lastReviewed: record.frontmatter.lastReviewed,
				confidence: record.frontmatter.confidence,
				path: path.relative(process.cwd(), record.path),
			};
		}),
		registry: {
			manifest: registryManifest,
			publishedSlugs: states.map((record) => record.frontmatter.slug),
		},
		taxonomy,
	};
}

async function run() {
	try {
		const graph = await compileContentGraph();
		const generatedDirectory = path.join(process.cwd(), "generated");
		const graphPath = path.join(generatedDirectory, "content-graph.json");

		await mkdir(generatedDirectory, { recursive: true });
		await writeFile(graphPath, JSON.stringify(graph, null, 2));

		console.log(
			`Compiled content graph with ${graph.docs.length} document(s) and ${graph.states.length} state entr${
				graph.states.length === 1 ? "y" : "ies"
			}.`,
		);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown compile error";
		console.error(`Content compile failed: ${message}`);
		process.exitCode = 1;
	}
}

await run();
