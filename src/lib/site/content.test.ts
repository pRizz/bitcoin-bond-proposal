import { expect, test } from "bun:test";

import graph from "../../../generated/content-graph.json";
import {
	buildConfidenceCue,
	buildStatesComparisonModel,
	buildStatesClusterModel,
	buildStatesIndexModel,
	type ContentGraph,
	getStateBySlug,
	getStatesComparisonModel,
	getStatesClusterModel,
	getStatesIndexModel,
	summarizeStateFreshness,
} from "./content";

const contentGraph = graph as ContentGraph;

function getFixtureState(slug: string) {
	const maybeState = contentGraph.states.find((state) => state.slug === slug);

	if (!maybeState) {
		throw new Error(`Missing state fixture for slug: ${slug}`);
	}

	return maybeState;
}

function getClusterSection(
	model: ReturnType<typeof buildStatesClusterModel>,
	key: ReturnType<typeof buildStatesClusterModel>["sections"][number]["key"],
) {
	const maybeSection = model.sections.find((section) => section.key === key);

	if (!maybeSection) {
		throw new Error(`Missing cluster section for key: ${key}`);
	}

	return maybeSection;
}

function getComparisonSection(
	model: ReturnType<typeof buildStatesComparisonModel>,
	key: ReturnType<typeof buildStatesComparisonModel>["sections"][number]["key"],
) {
	const maybeSection = model.sections.find((section) => section.key === key);

	if (!maybeSection) {
		throw new Error(`Missing comparison section for key: ${key}`);
	}

	return maybeSection;
}

test("buildStatesIndexModel groups published states by region, proposal focus, and legislative status", () => {
	// Arrange
	const fixtureGraph = structuredClone(contentGraph);

	// Assert
	const expectedRegionCounts = {
		midwest: 3,
		northeast: 1,
		south: 5,
		west: 1,
	};

	// Act
	const model = buildStatesIndexModel(fixtureGraph);

	// Assert
	expect(
		Object.fromEntries(
			model.groups.byRegion.map((group) => [group.key, group.count]),
		),
	).toEqual(expectedRegionCounts);
	expect(
		model.groups.byProposalFocus
			.find((group) => group.key === "both")
			?.states.map((state) => state.slug)
			.sort(),
	).toEqual(["illinois", "north-carolina"]);
	expect(
		model.groups.byLegislativeStatusGroup
			.find((group) => group.key === "enacted")
			?.states.map((state) => state.slug),
	).toEqual(["texas"]);
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

test("high-confidence legislative entries describe stage without exposing raw score labels", () => {
	// Arrange
	const introducedState = getFixtureState("illinois");
	const advancedState = getFixtureState("michigan");
	const enactedState = getFixtureState("texas");

	// Act
	const introducedCue = buildConfidenceCue(introducedState);
	const advancedCue = buildConfidenceCue(advancedState);
	const enactedCue = buildConfidenceCue(enactedState);

	// Assert
	expect(introducedCue).toEqual({
		title: "Early-stage bill with clear official footing",
		detail:
			"Official bill text and dated status are present, but the measure remains at an early legislative stage.",
	});
	expect(advancedCue).toEqual({
		title: "Advanced bill with clear official footing",
		detail:
			"Official bill text and dated status are present, and the measure has moved beyond introduction.",
	});
	expect(enactedCue).toEqual({
		title: "Enacted bill with clear official footing",
		detail:
			"Official bill text and dated status are present, and the measure has reached enacted-law status.",
	});
	expect(
		[introducedCue.title, advancedCue.title, enactedCue.title].join(" "),
	).not.toMatch(/\bhigh\b|\bmedium\b|\blow\b/i);
});

test("authority-action records keep their record-type distinction in the confidence cue", () => {
	// Arrange
	const authorityActionState = getFixtureState("new-hampshire");

	// Act
	const cue = buildConfidenceCue(authorityActionState);

	// Assert
	expect(cue).toEqual({
		title: "Authority action with clear official footing",
		detail:
			"The record rests on official authority action rather than a legislature-filed bill, with the approval posture reflected in the source trail.",
	});
});

test("getStatesIndexModel and getStateBySlug expose the same shared confidence cue shape", () => {
	// Arrange

	// Act
	const statesIndexModel = getStatesIndexModel();
	const maybeIndexState = statesIndexModel.states.find(
		(state) => state.slug === "maryland",
	);
	const maybeDetailState = getStateBySlug("maryland");

	// Assert
	expect(maybeIndexState).toMatchObject({
		slug: "maryland",
		confidenceCue: {
			title: "Early-stage bill with developing official footing",
			detail:
				"Official bill text and dated status are present, but the measure remains at an early legislative stage.",
		},
	});
	expect(maybeDetailState).toMatchObject({
		slug: "maryland",
		confidenceCue: {
			title: "Early-stage bill with developing official footing",
			detail:
				"Official bill text and dated status are present, but the measure remains at an early legislative stage.",
		},
	});
	expect(maybeDetailState?.confidenceCue).toEqual(
		maybeIndexState?.confidenceCue,
	);
	expect(maybeDetailState?.freshnessCue).toEqual(maybeIndexState?.freshnessCue);
});

test("buildStatesClusterModel returns editorial sections for legislative status, proposal focus, and region", () => {
	// Arrange
	const fixtureGraph = structuredClone(contentGraph);

	// Act
	const model = buildStatesClusterModel(fixtureGraph);
	const legislativeStatusSection = getClusterSection(
		model,
		"legislative-status",
	);
	const proposalFocusSection = getClusterSection(model, "proposal-focus");
	const regionSection = getClusterSection(model, "region");

	// Assert
	expect(model.sections.map((section) => section.key)).toEqual([
		"legislative-status",
		"proposal-focus",
		"region",
	]);
	expect(legislativeStatusSection.title).toBe("Browse by legislative status");
	expect(proposalFocusSection.title).toBe("Browse by proposal focus");
	expect(regionSection.title).toBe("Browse by region");
	expect(
		legislativeStatusSection.buckets.map((bucket) => [
			bucket.key,
			bucket.count,
		]),
	).toEqual([
		["introduced", 4],
		["advanced", 3],
		["approved", 1],
		["enacted", 1],
		["failed", 1],
	]);
	expect(
		proposalFocusSection.buckets
			.find((bucket) => bucket.key === "both")
			?.states.map((state) => state.slug),
	).toEqual(["illinois", "north-carolina"]);
	expect(
		regionSection.buckets
			.find((bucket) => bucket.key === "south")
			?.states.map((state) => state.slug),
	).toEqual([
		"north-carolina",
		"maryland",
		"oklahoma",
		"south-carolina",
		"texas",
	]);
});

test("getStatesClusterModel keeps canonical state detail links in every cluster entry", () => {
	// Arrange

	// Act
	const model = getStatesClusterModel();
	const entries = model.sections.flatMap((section) =>
		section.buckets.flatMap((bucket) => bucket.states),
	);
	const southernCluster = getClusterSection(model, "region").buckets.find(
		(bucket) => bucket.key === "south",
	);

	// Assert
	expect(entries.length).toBeGreaterThan(0);
	expect(
		entries.every((state) => state.href === `/states/${state.slug}`),
	).toBeTrue();
	expect(southernCluster?.states[0]).toMatchObject({
		slug: "north-carolina",
		href: "/states/north-carolina",
	});
});

test("buildStatesClusterModel reuses the shared grouped registry model for cluster buckets", () => {
	// Arrange
	const fixtureGraph = structuredClone(contentGraph);
	const statesIndexModel = buildStatesIndexModel(fixtureGraph);

	// Act
	const clusterModel = buildStatesClusterModel(fixtureGraph);
	const legislativeStatusSection = getClusterSection(
		clusterModel,
		"legislative-status",
	);
	const proposalFocusSection = getClusterSection(
		clusterModel,
		"proposal-focus",
	);
	const regionSection = getClusterSection(clusterModel, "region");

	// Assert
	expect(
		legislativeStatusSection.buckets.map((bucket) => ({
			key: bucket.key,
			count: bucket.count,
			slugs: bucket.states.map((state) => state.slug),
		})),
	).toEqual(
		statesIndexModel.groups.byLegislativeStatusGroup.map((group) => ({
			key: group.key,
			count: group.count,
			slugs: group.states.map((state) => state.slug),
		})),
	);
	expect(
		proposalFocusSection.buckets.map((bucket) => ({
			key: bucket.key,
			count: bucket.count,
			slugs: bucket.states.map((state) => state.slug),
		})),
	).toEqual(
		statesIndexModel.groups.byProposalFocus
			.filter((group) => group.count > 0)
			.map((group) => ({
				key: group.key,
				count: group.count,
				slugs: group.states.map((state) => state.slug),
			})),
	);
	expect(
		regionSection.buckets.map((bucket) => ({
			key: bucket.key,
			count: bucket.count,
			slugs: bucket.states.map((state) => state.slug),
		})),
	).toEqual(
		statesIndexModel.groups.byRegion.map((group) => ({
			key: group.key,
			count: group.count,
			slugs: group.states.map((state) => state.slug),
		})),
	);
});

test("buildStatesComparisonModel returns editorial comparison frames for reserve benchmarks, crossover records, and bond-side official signals", () => {
	// Arrange
	const fixtureGraph = structuredClone(contentGraph);

	// Act
	const model = buildStatesComparisonModel(fixtureGraph);
	const reserveBenchmarksSection = getComparisonSection(
		model,
		"reserve-benchmarks",
	);
	const crossoverSection = getComparisonSection(model, "crossover-records");
	const bondSideSection = getComparisonSection(model, "bond-side-signals");

	// Assert
	expect(model.sections.map((section) => section.key)).toEqual([
		"reserve-benchmarks",
		"crossover-records",
		"bond-side-signals",
	]);
	expect(reserveBenchmarksSection.title).toBe(
		"Reserve benchmarks now split between enacted, advanced, and earlier-stage signals",
	);
	expect(
		reserveBenchmarksSection.featuredStates.map((state) => state.slug),
	).toEqual(["texas", "missouri", "oklahoma", "michigan"]);
	expect(
		reserveBenchmarksSection.supportingStates.map((state) => state.slug),
	).toEqual(["maryland", "south-carolina", "arizona"]);
	expect(crossoverSection.featuredStates.map((state) => state.slug)).toEqual([
		"north-carolina",
		"illinois",
	]);
	expect(bondSideSection.featuredStates.map((state) => state.slug)).toEqual([
		"new-hampshire",
		"north-carolina",
	]);
});

test("getStatesComparisonModel keeps canonical state detail links in every comparison section", () => {
	// Arrange

	// Act
	const model = getStatesComparisonModel();
	const entries = model.sections.flatMap((section) => [
		...section.featuredStates,
		...section.supportingStates,
	]);

	// Assert
	expect(entries.length).toBeGreaterThan(0);
	expect(
		entries.every((state) => state.href === `/states/${state.slug}`),
	).toBeTrue();
	expect(
		getComparisonSection(model, "bond-side-signals").featuredStates[0],
	).toMatchObject({
		slug: "new-hampshire",
		href: "/states/new-hampshire",
		badgeLabel: "bond focus",
	});
});

test("buildStatesComparisonModel stays selective and narrative instead of turning the registry into a matrix", () => {
	// Arrange
	const fixtureGraph = structuredClone(contentGraph);

	// Act
	const model = buildStatesComparisonModel(fixtureGraph);

	// Assert
	expect(model.sections).toHaveLength(3);
	expect(
		model.sections.every((section) => section.featuredStates.length <= 4),
	).toBeTrue();
	expect(
		model.sections.every(
			(section) =>
				section.featuredStates.length + section.supportingStates.length <
				contentGraph.states.length,
		),
	).toBeTrue();
	expect(
		model.sections.every(
			(section) => section.lead.length > 0 && section.comparison.length > 0,
		),
	).toBeTrue();
});

test("buildStatesComparisonModel fails loudly if a configured comparison state is missing", () => {
	// Arrange
	const fixtureGraph = structuredClone(contentGraph);
	fixtureGraph.states = fixtureGraph.states.filter(
		(state) => state.slug !== "north-carolina",
	);

	// Act / Assert
	expect(() => buildStatesComparisonModel(fixtureGraph)).toThrow(
		"Missing comparison state: north-carolina",
	);
});
