#!/usr/bin/env bun

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { parseStateCandidateIntake } from "../src/lib/content/schema.ts";
import {
	buildCombinedPriorityQueueModel,
	type CombinedPriorityQueueModel,
	type CandidatePriorityEntry,
} from "../src/lib/site/candidate-priority.ts";
import { getRefreshQueueModel } from "../src/lib/site/content.ts";

function escapeMarkdownCell(value: string): string {
	return value.replaceAll("|", "\\|").replaceAll(/\s*\n\s*/g, " ");
}

function renderMarkdownRow(cells: ReadonlyArray<number | string>): string {
	return `| ${cells.map((cell) => escapeMarkdownCell(String(cell))).join(" | ")} |`;
}

function renderQueueSection(
	title: string,
	entries: ReturnType<typeof getRefreshQueueModel>["entries"],
): string {
	if (!entries.length) {
		return `## ${title}\n\nNone.\n`;
	}

	const rows = entries
		.map((entry) =>
			renderMarkdownRow([
				entry.state,
				entry.status,
				entry.statusAsOf,
				entry.lastReviewed,
				entry.reasons.join(", "),
			]),
		)
		.join("\n");

	return `## ${title}

| State | Status | Status as of | Last reviewed | Reasons |
|-------|--------|--------------|---------------|---------|
${rows}
`;
}

function renderPublishedRefreshWork(
	entries: CombinedPriorityQueueModel["publishedRefreshWork"],
): string {
	if (!entries.length) {
		return "## Published Refresh Work\n\nNone.\n";
	}

	const rows = entries
		.map((entry) =>
			renderMarkdownRow([
				entry.state,
				entry.priority,
				entry.status,
				entry.statusAsOf,
				entry.lastReviewed,
				entry.reasons.join(", "),
			]),
		)
		.join("\n");

	return `## Published Refresh Work

| State | Priority | Status | Status as of | Last reviewed | Reasons |
|-------|----------|--------|--------------|---------------|---------|
${rows}
`;
}

function renderFirstPublicationCandidates(
	entries: ReadonlyArray<CandidatePriorityEntry>,
): string {
	if (!entries.length) {
		return "## First Publication Candidates\n\nNone.\n";
	}

	const rows = entries
		.map((entry) =>
			renderMarkdownRow([
				entry.rank,
				entry.state,
				entry.readiness,
				entry.sourceAvailability,
				entry.proposalRelevance,
				entry.freshnessRisk,
				entry.status,
				entry.statusAsOf,
				entry.nextAction,
				entry.reasons.join(", "),
			]),
		)
		.join("\n");

	return `## First Publication Candidates

| Rank | State | Readiness | Source availability | Relevance | Freshness risk | Status | Status as of | Next action | Reasons |
|------|-------|-----------|---------------------|-----------|----------------|--------|--------------|-------------|---------|
${rows}
`;
}

function renderCandidateIntakeNotes(
	entries: ReadonlyArray<CandidatePriorityEntry>,
): string {
	if (!entries.length) {
		return "## Candidate Intake Notes\n\nNone.\n";
	}

	const rows = entries
		.map((entry) => {
			const deferralReason = entry.deferralReason ?? "None";

			return renderMarkdownRow([
				entry.state,
				entry.evidenceNote,
				deferralReason,
				entry.officialSourceUrl ?? "Unavailable",
			]);
		})
		.join("\n");

	return `## Candidate Intake Notes

| State | Evidence note | Deferral reason | Official source |
|-------|---------------|-----------------|-----------------|
${rows}
`;
}

function renderPriorityMarkdown(queue: CombinedPriorityQueueModel): string {
	return `# State Priority Queue

Generated: ${queue.generatedAt}

This is a repo-owned maintainer artifact. It combines published-record refresh work with unpublished candidate intake without creating public state pages or implying live legislative tracking.

## Summary

- Published refresh entries: ${queue.summary.publishedRefreshCount}
- Published refresh due: ${queue.summary.publishedRefreshDueCount}
- Candidate intake entries: ${queue.summary.candidateCount}
- First publication candidates: ${queue.summary.firstPublicationCandidateCount}

## Source Boundaries

${queue.sourceBoundary}

${renderPublishedRefreshWork(queue.publishedRefreshWork)}

${renderFirstPublicationCandidates(queue.firstPublicationCandidates)}

${renderCandidateIntakeNotes(queue.candidateIntake.entries)}`;
}

function renderMarkdown(
	queue: ReturnType<typeof getRefreshQueueModel>,
): string {
	const dueEntries = queue.entries.filter((entry) => entry.priority === "due");
	const agingEntries = queue.entries.filter(
		(entry) => entry.priority === "aging",
	);

	return `# State Refresh Queue

Generated: ${queue.generatedAt}
Latest review: ${queue.latestReview ?? "Unavailable"}

This is a repo-owned maintainer artifact. It surfaces published state records whose review cadence or active legislative posture now needs attention without pretending the public site is live-tracked.

## Summary

- Queue entries: ${queue.summary.queueCount}
- Current snapshots: ${queue.summary.counts.current}
- Review soon: ${queue.summary.counts.aging}
- Review due: ${queue.summary.counts.due}

## Thresholds

- Active records: review soon at ${queue.thresholds.activeReviewSoonDays} days, review due at ${queue.thresholds.activeReviewDueDays} days
- Active-status snapshots: review soon at ${queue.thresholds.activeStatusSoonDays} days, review due at ${queue.thresholds.activeStatusDueDays} days
- Terminal records: review soon at ${queue.thresholds.terminalReviewSoonDays} days, review due at ${queue.thresholds.terminalReviewDueDays} days

${renderQueueSection("Review Due", dueEntries)}

${renderQueueSection("Review Soon", agingEntries)}
`;
}

async function readCandidateIntake() {
	const intakePath = path.join(
		process.cwd(),
		"content",
		"data",
		"state-candidate-intake.json",
	);
	const rawIntake = await readFile(intakePath, "utf8");

	return parseStateCandidateIntake(JSON.parse(rawIntake));
}

async function run() {
	const queue = getRefreshQueueModel();
	const candidateIntake = await readCandidateIntake();
	const priorityQueue = buildCombinedPriorityQueueModel({
		refreshQueue: queue,
		candidates: candidateIntake.candidates,
		generatedAt: queue.generatedAt,
	});
	const outputDir = path.join(process.cwd(), "generated", "refresh");
	const jsonPath = path.join(outputDir, "state-refresh-queue.json");
	const markdownPath = path.join(outputDir, "state-refresh-queue.md");
	const priorityJsonPath = path.join(outputDir, "state-priority-queue.json");
	const priorityMarkdownPath = path.join(outputDir, "state-priority-queue.md");

	await mkdir(outputDir, { recursive: true });
	await Promise.all([
		writeFile(`${jsonPath}`, `${JSON.stringify(queue, null, "\t")}\n`),
		writeFile(markdownPath, renderMarkdown(queue)),
		writeFile(
			priorityJsonPath,
			`${JSON.stringify(priorityQueue, null, "\t")}\n`,
		),
		writeFile(priorityMarkdownPath, renderPriorityMarkdown(priorityQueue)),
	]);

	console.log(
		"Wrote generated/refresh/state-refresh-queue.{json,md} and generated/refresh/state-priority-queue.{json,md}",
	);
}

await run();
