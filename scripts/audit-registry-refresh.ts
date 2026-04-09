#!/usr/bin/env bun

import { readFile } from "node:fs/promises";
import path from "node:path";

import {
	assertKnownProposalClassification,
	assertManifestMatchesPublishedStates,
	assertPublishedManifestEntriesHaveRefreshCadence,
	assertPublishedManifestEntriesHaveStateFiles,
	assertStateEntryFreshnessChronology,
	parseProposalTaxonomy,
	parseStateRegistryManifest,
	parseStateEntryFrontmatter,
	type StateEntryFrontmatter,
	type StateRegistryManifestEntry,
} from "../src/lib/content/schema.ts";
import {
	getReviewSnapshot,
	type ReviewStatus,
} from "../src/lib/content/registry-refresh.ts";
import { readMarkdownCollection } from "../src/lib/content/load-markdown.ts";

type ReportRow = {
	state: string;
	slug: string;
	lastReviewed: string;
	nextReviewDue: string;
	daysUntilReviewDue: number;
	reviewStatus: ReviewStatus;
};

async function readProposalTaxonomy() {
	const taxonomyPath = path.join(
		process.cwd(),
		"content",
		"data",
		"proposal-taxonomy.json",
	);
	const rawTaxonomy = await readFile(taxonomyPath, "utf8");

	return parseProposalTaxonomy(JSON.parse(rawTaxonomy));
}

async function readStateRegistryManifest() {
	const manifestPath = path.join(
		process.cwd(),
		"content",
		"data",
		"state-registry-manifest.json",
	);
	const rawManifest = await readFile(manifestPath, "utf8");

	return parseStateRegistryManifest(JSON.parse(rawManifest));
}

async function readStateEntries(): Promise<StateEntryFrontmatter[]> {
	const taxonomy = await readProposalTaxonomy();
	const statesPath = path.join(process.cwd(), "content", "states");
	const stateEntries = await readMarkdownCollection(
		statesPath,
		parseStateEntryFrontmatter,
	);

	for (const stateEntry of stateEntries) {
		assertKnownProposalClassification(stateEntry.frontmatter, taxonomy);
		assertStateEntryFreshnessChronology(stateEntry.frontmatter);
	}

	return stateEntries.map((record) => record.frontmatter);
}

function parseReportDate(): string | undefined {
	const todayFlagIndex = process.argv.indexOf("--today");

	if (todayFlagIndex === -1) {
		return undefined;
	}

	return process.argv[todayFlagIndex + 1];
}

function toReportRows(input: {
	manifestEntries: StateRegistryManifestEntry[];
	stateEntries: StateEntryFrontmatter[];
	maybeReportDate?: string;
}): ReportRow[] {
	const manifestEntriesBySlug = new Map(
		input.manifestEntries.map((entry) => [entry.slug, entry] as const),
	);

	return input.stateEntries
		.flatMap((stateEntry) => {
			const maybeManifestEntry = manifestEntriesBySlug.get(stateEntry.slug);

			if (
				!maybeManifestEntry ||
				maybeManifestEntry.registryStatus !== "published" ||
				maybeManifestEntry.reviewCadenceDays === undefined
			) {
				return [];
			}

			const reviewSnapshot = getReviewSnapshot({
				lastReviewed: stateEntry.lastReviewed,
				reviewCadenceDays: maybeManifestEntry.reviewCadenceDays,
				maybeEvaluationDate: input.maybeReportDate,
			});

			return [
				{
					state: stateEntry.state,
					slug: stateEntry.slug,
					lastReviewed: stateEntry.lastReviewed,
					nextReviewDue: reviewSnapshot.nextReviewDue,
					daysUntilReviewDue: reviewSnapshot.daysUntilReviewDue,
					reviewStatus: reviewSnapshot.reviewStatus,
				},
			];
		})
		.sort((left, right) => {
			if (left.daysUntilReviewDue !== right.daysUntilReviewDue) {
				return left.daysUntilReviewDue - right.daysUntilReviewDue;
			}

			return left.state.localeCompare(right.state);
		});
}

function printSection(title: string, rows: ReportRow[]) {
	console.log(`\n${title}: ${rows.length}`);

	if (rows.length === 0) {
		console.log("- none");
		return;
	}

	for (const row of rows) {
		console.log(
			`- ${row.state} (${row.slug}) — reviewed ${row.lastReviewed}, next due ${row.nextReviewDue}, ${row.daysUntilReviewDue} day(s) remaining`,
		);
	}
}

async function run() {
	try {
		const maybeReportDate = parseReportDate();
		const [manifest, stateEntries] = await Promise.all([
			readStateRegistryManifest(),
			readStateEntries(),
		]);

		assertManifestMatchesPublishedStates(manifest.states, stateEntries);
		assertPublishedManifestEntriesHaveStateFiles(manifest.states, stateEntries);
		assertPublishedManifestEntriesHaveRefreshCadence(manifest.states);

		const publishedRows = toReportRows({
			manifestEntries: manifest.states,
			stateEntries,
			maybeReportDate,
		});
		const currentRows = publishedRows.filter(
			(row) => row.reviewStatus === "current",
		);
		const dueSoonRows = publishedRows.filter(
			(row) => row.reviewStatus === "due-soon",
		);
		const overdueRows = publishedRows.filter(
			(row) => row.reviewStatus === "overdue",
		);
		const queuedStates = manifest.states
			.filter((entry) => entry.registryStatus === "queued")
			.map((entry) => entry.state)
			.sort((left, right) => left.localeCompare(right));
		const reportDate = maybeReportDate ?? new Date().toISOString().slice(0, 10);

		console.log("Registry refresh audit");
		console.log(`Snapshot date: ${reportDate}`);
		console.log(
			"This report uses repo-tracked snapshot dates only. It is not a live legislative feed.",
		);
		console.log(
			`Published states: ${publishedRows.length} | Queued states: ${queuedStates.length} | Unresearched states: ${
				manifest.states.filter(
					(entry) => entry.registryStatus === "unresearched",
				).length
			}`,
		);

		printSection("Current", currentRows);
		printSection("Due soon", dueSoonRows);
		printSection("Overdue", overdueRows);

		console.log("\nQueued states:");
		if (queuedStates.length === 0) {
			console.log("- none");
			return;
		}

		for (const state of queuedStates) {
			console.log(`- ${state}`);
		}
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown refresh audit error";
		console.error(`Registry refresh audit failed: ${message}`);
		process.exitCode = 1;
	}
}

await run();
