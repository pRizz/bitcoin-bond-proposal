import { expect, test } from "bun:test";

import graph from "../../../generated/content-graph.json";
import {
	buildStatesIndexModel,
	type ContentGraph,
	getStatesIndexModel,
	summarizeStateFreshness,
} from "./content";

const contentGraph = graph as ContentGraph;

test("buildStatesIndexModel groups published states by region, proposal focus, and legislative status", () => {
	// Arrange
	const fixtureGraph = structuredClone(contentGraph);

	// Act
	const model = buildStatesIndexModel(fixtureGraph);

	// Assert
	expect(
		model.groups.byRegion.map((group) => [group.key, group.count]),
	).toEqual([
		["northeast", 1],
		["midwest", 1],
		["south", 2],
		["west", 1],
	]);
	expect(
		model.groups.byProposalFocus.find((group) => group.key === "both")?.states,
	).toMatchObject([{ slug: "illinois" }]);
	expect(
		model.groups.byLegislativeStatusGroup.find(
			(group) => group.key === "enacted",
		)?.states,
	).toMatchObject([{ slug: "texas" }]);
});

test("summarizeStateFreshness exposes stable review and status age facts without mutating the source array", () => {
	// Arrange
	const sourceStates = [...contentGraph.states].reverse();
	const originalOrder = sourceStates.map((state) => state.slug);
	const expectedLatestReview = [...contentGraph.states]
		.map((state) => state.lastReviewed)
		.sort((left, right) => right.localeCompare(left))[0];
	const expectedReviewAgeDays = contentGraph.states.map(
		(state) => state.reviewAgeDays,
	);
	const expectedStatusAgeDays = contentGraph.states.map(
		(state) => state.statusAgeDays,
	);

	// Act
	const freshness = summarizeStateFreshness(
		sourceStates,
		contentGraph.registry.generatedAt,
	);

	// Assert
	expect(sourceStates.map((state) => state.slug)).toEqual(originalOrder);
	expect(freshness).toEqual({
		generatedAt: contentGraph.registry.generatedAt,
		latestReview: expectedLatestReview,
		freshestReviewAgeDays: Math.min(...expectedReviewAgeDays),
		stalestReviewAgeDays: Math.max(...expectedReviewAgeDays),
		freshestStatusAgeDays: Math.min(...expectedStatusAgeDays),
		stalestStatusAgeDays: Math.max(...expectedStatusAgeDays),
	});
});

test("getStatesIndexModel returns the grouped and freshness-aware route model without requiring a manifest join", () => {
	// Arrange

	// Act
	const model = getStatesIndexModel();

	// Assert
	expect(model.states[0]).toMatchObject({
		slug: "illinois",
		shortNote:
			"Flagship state; registry entry must remain descriptive and distinct from the normative packet.",
		region: "midwest",
		legislativeStatusGroup: "introduced",
		reviewAgeDays: 10,
		statusAgeDays: 437,
	});
	expect(model.stats).toMatchObject({
		publishedCount: 5,
		bondPriorityCount: 2,
		reservePriorityCount: 3,
		latestReview:
			contentGraph.registry.generatedAt.slice(0, 10) >= "2026-04-01"
				? "2026-04-01"
				: undefined,
	});
	expect(model.freshness.generatedAt).toBe(contentGraph.registry.generatedAt);
});
