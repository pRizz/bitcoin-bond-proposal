#!/usr/bin/env bun

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
	assertKnownProposalClassification,
	assertManifestMatchesPublishedStates,
	assertUniqueSlugs,
	parseDocumentFrontmatter,
	type LegislativeStatusGroup,
	parseProposalTaxonomy,
	parseStateRegistryManifest,
	parseStateEntryFrontmatter,
	type ProposalFocus,
	type Region,
} from "../src/lib/content/schema.ts";
import { readMarkdownCollection } from "../src/lib/content/load-markdown.ts";

type GroupBucket<TBucket extends string> = Record<
	TBucket,
	{ count: number; slugs: string[] }
>;

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
		proposalFocus: ProposalFocus;
		region: Region;
		shortNote: string;
		editorialPriority: string;
		proposalKind: string;
		proposalSubtype: string;
		billId: string;
		chamber: string;
		status: string;
		legislativeStatusGroup: LegislativeStatusGroup;
		statusAsOf: string;
		statusAgeDays: number;
		lastReviewed: string;
		reviewAgeDays: number;
		confidence: string;
		path: string;
	}>;
	registry: {
		manifest: ReturnType<typeof parseStateRegistryManifest>;
		publishedSlugs: string[];
		generatedAt: string;
		groups: {
			byRegion: GroupBucket<Region>;
			byProposalFocus: GroupBucket<ProposalFocus>;
			byLegislativeStatusGroup: GroupBucket<LegislativeStatusGroup>;
		};
	};
	taxonomy: ReturnType<typeof parseProposalTaxonomy>;
};

type CompiledState = CompiledContentGraph["states"][number];

const millisecondsPerDay = 24 * 60 * 60 * 1000;

const regionValues: Region[] = ["northeast", "midwest", "south", "west"];
const proposalFocusValues: ProposalFocus[] = [
	"bond",
	"reserve",
	"both",
	"unknown",
];
const legislativeStatusGroupValues: LegislativeStatusGroup[] = [
	"introduced",
	"advanced",
	"approved",
	"enacted",
	"failed",
];

const editorialPriorityWeight = {
	"bond-priority": 0,
	"reserve-priority": 1,
	neutral: 2,
} as const;

function toUtcDate(value: string): Date {
	const [year, month, day] = value.split("-").map(Number);

	return new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1));
}

function getAgeDays(fromDate: string, toDate: string): number {
	const differenceInMilliseconds =
		toUtcDate(toDate).getTime() - toUtcDate(fromDate).getTime();

	return Math.max(0, Math.floor(differenceInMilliseconds / millisecondsPerDay));
}

function createGroupBuckets<TBucket extends string>(
	groupValues: ReadonlyArray<TBucket>,
): GroupBucket<TBucket> {
	return Object.fromEntries(
		groupValues.map((value) => [value, { count: 0, slugs: [] as string[] }]),
	) as GroupBucket<TBucket>;
}

function sortCompiledStates(states: ReadonlyArray<CompiledState>) {
	return [...states].sort((left, right) => {
		const leftPriority =
			editorialPriorityWeight[
				left.editorialPriority as keyof typeof editorialPriorityWeight
			];
		const rightPriority =
			editorialPriorityWeight[
				right.editorialPriority as keyof typeof editorialPriorityWeight
			];

		if (leftPriority !== rightPriority) {
			return leftPriority - rightPriority;
		}

		return left.state.localeCompare(right.state);
	});
}

function buildRegistryGroups(
	states: ReadonlyArray<CompiledState>,
): CompiledContentGraph["registry"]["groups"] {
	const byRegion = createGroupBuckets(regionValues);
	const byProposalFocus = createGroupBuckets(proposalFocusValues);
	const byLegislativeStatusGroup = createGroupBuckets(
		legislativeStatusGroupValues,
	);

	for (const state of states) {
		byRegion[state.region].count += 1;
		byRegion[state.region].slugs.push(state.slug);
		byProposalFocus[state.proposalFocus].count += 1;
		byProposalFocus[state.proposalFocus].slugs.push(state.slug);
		byLegislativeStatusGroup[state.legislativeStatusGroup].count += 1;
		byLegislativeStatusGroup[state.legislativeStatusGroup].slugs.push(
			state.slug,
		);
	}

	return {
		byRegion,
		byProposalFocus,
		byLegislativeStatusGroup,
	};
}

export async function compileContentGraph(): Promise<CompiledContentGraph> {
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
	const generatedOn = new Date().toISOString().slice(0, 10);
	const generatedAt = `${generatedOn}T00:00:00.000Z`;

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

	const compiledStates = sortCompiledStates(
		states.map((record) => {
			const maybeManifestEntry = registryManifest.states.find(
				(entry) => entry.slug === record.frontmatter.slug,
			);

			if (!maybeManifestEntry) {
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
				registryStatus: maybeManifestEntry.registryStatus,
				proposalFocus: maybeManifestEntry.proposalFocus,
				region: maybeManifestEntry.region,
				shortNote: maybeManifestEntry.shortNote,
				editorialPriority: maybeManifestEntry.editorialPriority,
				proposalKind: record.frontmatter.proposalKind,
				proposalSubtype: record.frontmatter.proposalSubtype,
				billId: record.frontmatter.billId,
				chamber: record.frontmatter.chamber,
				status: record.frontmatter.status,
				legislativeStatusGroup: record.frontmatter.legislativeStatusGroup,
				statusAsOf: record.frontmatter.statusAsOf,
				statusAgeDays: getAgeDays(record.frontmatter.statusAsOf, generatedOn),
				lastReviewed: record.frontmatter.lastReviewed,
				reviewAgeDays: getAgeDays(record.frontmatter.lastReviewed, generatedOn),
				confidence: record.frontmatter.confidence,
				path: path.relative(process.cwd(), record.path),
			};
		}),
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
		states: compiledStates,
		registry: {
			manifest: registryManifest,
			publishedSlugs: compiledStates.map((state) => state.slug),
			generatedAt,
			groups: buildRegistryGroups(compiledStates),
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
