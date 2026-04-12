import { expect, test } from "bun:test";

import {
	buildRefreshQueueModel,
	buildRegistryFreshnessSummary,
	buildStateFreshnessCue,
} from "./registry-freshness";

test("active records become review-due when their status snapshot is stale", () => {
	// Arrange
	const activeRecord = {
		slug: "north-carolina",
		state: "North Carolina",
		status: "Ref To Com On Rules and Operations of the Senate",
		statusAsOf: "2025-03-19",
		statusAgeDays: 388,
		lastReviewed: "2026-04-11",
		reviewAgeDays: 0,
		legislativeStatusGroup: "introduced" as const,
	};

	// Act
	const cue = buildStateFreshnessCue(activeRecord);

	// Assert
	expect(cue).toEqual({
		tone: "due",
		title: "Review due",
		detail:
			"Reviewed 0 days ago. The active status snapshot is 388 days old, so this record needs a fresh source check.",
	});
});

test("terminal records stay current when they were reviewed recently", () => {
	// Arrange
	const terminalRecord = {
		slug: "texas",
		state: "Texas",
		status: "Enrolled; effective by law",
		statusAsOf: "2025-06-20",
		statusAgeDays: 295,
		lastReviewed: "2026-04-01",
		reviewAgeDays: 10,
		legislativeStatusGroup: "enacted" as const,
	};

	// Act
	const cue = buildStateFreshnessCue(terminalRecord);

	// Assert
	expect(cue).toEqual({
		tone: "current",
		title: "Current snapshot",
		detail:
			"Reviewed 10 days ago. Terminal-status records still remain explicitly dated rather than live-tracked.",
	});
});

test("registry freshness summary counts current, aging, and due records", () => {
	// Arrange
	const subjects = [
		{
			slug: "texas",
			state: "Texas",
			status: "Enacted",
			statusAsOf: "2025-06-20",
			statusAgeDays: 295,
			lastReviewed: "2026-04-01",
			reviewAgeDays: 10,
			legislativeStatusGroup: "enacted" as const,
		},
		{
			slug: "arizona",
			state: "Arizona",
			status: "Vetoed by Governor",
			statusAsOf: "2025-05-02",
			statusAgeDays: 344,
			lastReviewed: "2026-03-15",
			reviewAgeDays: 27,
			legislativeStatusGroup: "failed" as const,
		},
		{
			slug: "north-carolina",
			state: "North Carolina",
			status: "Introduced",
			statusAsOf: "2025-03-19",
			statusAgeDays: 388,
			lastReviewed: "2026-04-11",
			reviewAgeDays: 0,
			legislativeStatusGroup: "introduced" as const,
		},
	];

	// Act
	const summary = buildRegistryFreshnessSummary(
		subjects,
		"2026-04-11T00:00:00.000Z",
	);

	// Assert
	expect(summary).toMatchObject({
		generatedAt: "2026-04-11T00:00:00.000Z",
		latestReview: "2026-04-11",
		counts: {
			current: 1,
			aging: 1,
			due: 1,
		},
	});
	expect(summary.lead).toBe(
		"This registry stays explicitly dated: 1 current snapshots, 1 review-soon records, and 1 review-due records.",
	);
});

test("refresh queue keeps only aging or due records and sorts due items first", () => {
	// Arrange
	const subjects = [
		{
			slug: "texas",
			state: "Texas",
			status: "Enacted",
			statusAsOf: "2025-06-20",
			statusAgeDays: 295,
			lastReviewed: "2026-04-01",
			reviewAgeDays: 10,
			legislativeStatusGroup: "enacted" as const,
		},
		{
			slug: "arizona",
			state: "Arizona",
			status: "Vetoed by Governor",
			statusAsOf: "2025-05-02",
			statusAgeDays: 344,
			lastReviewed: "2026-03-15",
			reviewAgeDays: 27,
			legislativeStatusGroup: "failed" as const,
		},
		{
			slug: "north-carolina",
			state: "North Carolina",
			status: "Introduced",
			statusAsOf: "2025-03-19",
			statusAgeDays: 388,
			lastReviewed: "2026-04-11",
			reviewAgeDays: 0,
			legislativeStatusGroup: "introduced" as const,
		},
	];

	// Act
	const queue = buildRefreshQueueModel(subjects, "2026-04-11T00:00:00.000Z");

	// Assert
	expect(queue.summary.queueCount).toBe(2);
	expect(queue.entries.map((entry) => [entry.slug, entry.priority])).toEqual([
		["north-carolina", "due"],
		["arizona", "aging"],
	]);
	expect(queue.entries[0]?.reasons).toEqual(["active status age 388d"]);
	expect(queue.entries[1]?.reasons).toEqual(["review age 27d"]);
});
