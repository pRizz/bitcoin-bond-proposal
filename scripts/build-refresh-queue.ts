#!/usr/bin/env bun

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { getRefreshQueueModel } from "../src/lib/site/content.ts";

function renderQueueSection(
	title: string,
	entries: ReturnType<typeof getRefreshQueueModel>["entries"],
): string {
	if (!entries.length) {
		return `## ${title}\n\nNone.\n`;
	}

	const rows = entries
		.map(
			(entry) =>
				`| ${entry.state} | ${entry.status} | ${entry.statusAsOf} | ${entry.lastReviewed} | ${entry.reasons.join(", ")} |`,
		)
		.join("\n");

	return `## ${title}

| State | Status | Status as of | Last reviewed | Reasons |
|-------|--------|--------------|---------------|---------|
${rows}
`;
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

async function run() {
	const queue = getRefreshQueueModel();
	const outputDir = path.join(process.cwd(), "generated", "refresh");
	const jsonPath = path.join(outputDir, "state-refresh-queue.json");
	const markdownPath = path.join(outputDir, "state-refresh-queue.md");

	await mkdir(outputDir, { recursive: true });
	await Promise.all([
		writeFile(`${jsonPath}`, `${JSON.stringify(queue, null, "\t")}\n`),
		writeFile(markdownPath, renderMarkdown(queue)),
	]);

	console.log("Wrote generated/refresh/state-refresh-queue.{json,md}");
}

await run();
