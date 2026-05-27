import { expect, test } from "bun:test";

import type { StateCandidateIntakeEntry } from "../content/schema";
import {
	buildCandidatePriorityModel,
	buildCombinedPriorityQueueModel,
	type CandidatePriorityEntry,
} from "./candidate-priority";
import type { RefreshQueueModel } from "./registry-freshness";

function buildCandidateFixture(
	overrides: Partial<StateCandidateIntakeEntry> = {},
): StateCandidateIntakeEntry {
	return {
		state: "Ohio",
		slug: "ohio",
		sourceAvailability: "official-bill-page",
		proposalRelevance: "high",
		readiness: "ready-to-author",
		status: "In House Committee",
		statusAsOf: "2026-05-01",
		officialSourceUrl: "https://www.legislature.ohio.gov/legislation/136/hb18",
		evidenceNote: "Official bill page identifies the proposal.",
		nextAction: "author-state-entry",
		...overrides,
	};
}

function buildRefreshQueueFixture(): RefreshQueueModel {
	return {
		generatedAt: "2026-05-27T00:00:00.000Z",
		latestReview: "2026-04-11",
		thresholds: {
			activeReviewSoonDays: 14,
			activeReviewDueDays: 30,
			activeStatusSoonDays: 21,
			activeStatusDueDays: 45,
			terminalReviewSoonDays: 21,
			terminalReviewDueDays: 45,
		},
		summary: {
			generatedAt: "2026-05-27T00:00:00.000Z",
			latestReview: "2026-04-11",
			counts: {
				current: 0,
				aging: 0,
				due: 1,
			},
			lead: "One record needs refresh.",
			queueCount: 1,
		},
		entries: [
			{
				slug: "illinois",
				state: "Illinois",
				status: "Referred to Rules Committee",
				statusAsOf: "2025-01-29",
				statusAgeDays: 483,
				lastReviewed: "2026-04-01",
				reviewAgeDays: 56,
				legislativeStatusGroup: "introduced",
				priority: "due",
				reasons: ["review age 56d", "active status age 483d"],
			},
		],
	};
}

test("ready official candidates sort ahead of status-confirmation candidates", () => {
	// Arrange
	const candidates = [
		buildCandidateFixture({
			state: "Wyoming",
			slug: "wyoming",
			sourceAvailability: "official-pdf-only",
			readiness: "needs-status-confirmation",
			nextAction: "confirm-final-status",
		}),
		buildCandidateFixture({
			state: "Ohio",
			slug: "ohio",
			readiness: "ready-to-author",
		}),
	];

	// Act
	const model = buildCandidatePriorityModel(
		candidates,
		"2026-05-27T00:00:00.000Z",
	);

	// Assert
	expect(model.entries.map((entry) => entry.state)).toEqual([
		"Ohio",
		"Wyoming",
	]);
});

test("ties sort by source strength, proposal relevance, and state", () => {
	// Arrange
	const candidates = [
		buildCandidateFixture({
			state: "Utah",
			slug: "utah",
			sourceAvailability: "official-pdf-only",
			proposalRelevance: "medium",
		}),
		buildCandidateFixture({
			state: "Alabama",
			slug: "alabama",
			sourceAvailability: "official-state-record",
			proposalRelevance: "low",
		}),
		buildCandidateFixture({
			state: "Florida",
			slug: "florida",
			sourceAvailability: "official-bill-page",
			proposalRelevance: "high",
		}),
		buildCandidateFixture({
			state: "Kansas",
			slug: "kansas",
			sourceAvailability: "official-bill-page",
			proposalRelevance: "high",
		}),
	];

	// Act
	const model = buildCandidatePriorityModel(
		candidates,
		"2026-05-27T00:00:00.000Z",
	);

	// Assert
	expect(model.entries.map((entry) => entry.state)).toEqual([
		"Florida",
		"Kansas",
		"Alabama",
		"Utah",
	]);
});

test("terminal source-rich candidates remain authorable", () => {
	// Arrange
	const candidates = [
		buildCandidateFixture({
			state: "Florida",
			slug: "florida",
			status: "Died in Banking and Insurance",
			statusAsOf: "2025-06-16",
		}),
	];

	// Act
	const model = buildCandidatePriorityModel(
		candidates,
		"2026-05-27T00:00:00.000Z",
	);

	// Assert
	expect(model.entries[0]?.authorable).toBe(true);
});

test("secondary-only and none-found candidates are never authorable", () => {
	// Arrange
	const candidates = [
		buildCandidateFixture({
			state: "Secondary",
			slug: "secondary",
			sourceAvailability: "secondary-only",
		}),
		buildCandidateFixture({
			state: "None Found",
			slug: "none-found",
			sourceAvailability: "none-found",
		}),
	];

	// Act
	const model = buildCandidatePriorityModel(
		candidates,
		"2026-05-27T00:00:00.000Z",
	);

	// Assert
	expect(model.entries.every((entry) => !entry.authorable)).toBe(true);
});

test("freshnessRisk reflects candidate status age thresholds", () => {
	// Arrange
	const candidates = [
		buildCandidateFixture({
			state: "Current",
			slug: "current",
			statusAsOf: "2026-05-01",
		}),
		buildCandidateFixture({
			state: "Aging",
			slug: "aging",
			statusAsOf: "2026-03-20",
		}),
		buildCandidateFixture({
			state: "Stale",
			slug: "stale",
			statusAsOf: "2026-01-01",
		}),
	];

	// Act
	const model = buildCandidatePriorityModel(
		candidates,
		"2026-05-27T00:00:00.000Z",
	);

	// Assert
	const risksBySlug = new Map(
		model.entries.map((entry) => [entry.slug, entry.freshnessRisk] as const),
	);
	expect(risksBySlug.get("current")).toBe("current");
	expect(risksBySlug.get("aging")).toBe("aging");
	expect(risksBySlug.get("stale")).toBe("stale");
});

test("combined model preserves published refresh work order", () => {
	// Arrange
	const refreshQueue = buildRefreshQueueFixture();
	const candidates = [
		buildCandidateFixture({
			state: "Ohio",
			slug: "ohio",
		}),
	];

	// Act
	const model = buildCombinedPriorityQueueModel({
		refreshQueue,
		candidates,
		generatedAt: "2026-05-27T00:00:00.000Z",
	});

	// Assert
	expect(model.publishedRefreshWork).toEqual(refreshQueue.entries);
});

test("combined model includes firstPublicationCandidates with due refresh work", () => {
	// Arrange
	const refreshQueue = buildRefreshQueueFixture();
	const candidates = [
		buildCandidateFixture({
			state: "Ohio",
			slug: "ohio",
		}),
		buildCandidateFixture({
			state: "Wyoming",
			slug: "wyoming",
			readiness: "needs-status-confirmation",
			nextAction: "confirm-final-status",
		}),
		buildCandidateFixture({
			state: "Deferred",
			slug: "deferred",
			sourceAvailability: "secondary-only",
			readiness: "defer",
			nextAction: "defer-until-stronger-official-source",
			deferralReason: "No official source found.",
		}),
	];

	// Act
	const model = buildCombinedPriorityQueueModel({
		refreshQueue,
		candidates,
		generatedAt: "2026-05-27T00:00:00.000Z",
	});

	// Assert
	expect(
		model.firstPublicationCandidates.map(
			(entry: CandidatePriorityEntry) => entry.slug,
		),
	).toEqual(["ohio", "wyoming"]);
	expect(model.summary).toEqual({
		publishedRefreshCount: 1,
		publishedRefreshDueCount: 1,
		candidateCount: 3,
		firstPublicationCandidateCount: 2,
	});
});

test("combined model sourceBoundary names published and candidate sources", () => {
	// Arrange
	const refreshQueue = buildRefreshQueueFixture();
	const candidates = [buildCandidateFixture()];

	// Act
	const model = buildCombinedPriorityQueueModel({
		refreshQueue,
		candidates,
		generatedAt: "2026-05-27T00:00:00.000Z",
	});

	// Assert
	expect(model.sourceBoundary).toBe(
		"Published refresh work comes from canonical published records; candidate work comes from content/data/state-candidate-intake.json.",
	);
});
