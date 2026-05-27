import { describe, expect, test } from "bun:test";

import {
	assertKnownProposalClassification,
	assertUniqueSlugs,
	parseProposalTaxonomy,
	parseStateCandidateIntake,
	parseStateEntryFrontmatter,
	parseStateRegistryManifest,
	toDateLabel,
} from "./schema";

describe("parseProposalTaxonomy", () => {
	test("accepts the locked proposal kinds and subtypes", () => {
		// Arrange
		const taxonomy = {
			proposalKinds: [
				{ value: "reserve", description: "Reserve policy" },
				{ value: "bond", description: "Bond policy" },
			],
			proposalSubtypes: [
				{
					value: "strategic-reserve",
					description: "Strategic reserve policy",
				},
			],
		};

		// Act
		const result = parseProposalTaxonomy(taxonomy);

		// Assert
		expect(result.proposalKinds).toHaveLength(2);
		expect(result.proposalSubtypes[0]?.value).toBe("strategic-reserve");
	});
});

describe("assertKnownProposalClassification", () => {
	test("rejects a proposal subtype outside the controlled taxonomy", () => {
		// Arrange
		const taxonomy = parseProposalTaxonomy({
			proposalKinds: [{ value: "reserve", description: "Reserve policy" }],
			proposalSubtypes: [
				{
					value: "strategic-reserve",
					description: "Strategic reserve policy",
				},
			],
		});
		const stateEntry = parseStateEntryFrontmatter({
			title: "Illinois HB 1844",
			slug: "illinois-hb-1844",
			summary: "Strategic reserve proposal",
			state: "Illinois",
			recordType: "legislative-bill",
			proposalKind: "reserve",
			proposalSubtype: "strategic-reserve",
			billId: "HB 1844",
			chamber: "House",
			status: "Introduced",
			legislativeStatusGroup: "introduced",
			statusAsOf: "2026-04-01",
			lastReviewed: "2026-04-01",
			sponsors: ["Rep. Example"],
			primarySources: ["https://example.com/bill"],
			confidence: "high",
			effect: "Would authorize a Bitcoin reserve.",
		});

		// Act
		const execution = () =>
			assertKnownProposalClassification(
				{ ...stateEntry, proposalSubtype: "other-explained" },
				taxonomy,
			);

		// Assert
		expect(execution).toThrow("Unknown proposal subtype: other-explained");
	});
});

describe("parseStateRegistryManifest", () => {
	test("accepts manifest entries with a controlled region", () => {
		// Arrange
		const manifest = {
			states: Array.from({ length: 50 }, (_, index) => ({
				state: `State ${index + 1}`,
				slug: `state-${index + 1}`,
				registryStatus: "unresearched",
				proposalFocus: "unknown",
				region: "midwest",
				shortNote: "Not yet researched.",
				editorialPriority: "neutral",
			})),
		};

		// Act
		const result = parseStateRegistryManifest(manifest);

		// Assert
		expect(result.states[0]?.region).toBe("midwest");
	});

	test("rejects manifest entries with an invalid region", () => {
		// Arrange
		const manifest = {
			states: Array.from({ length: 50 }, (_, index) => ({
				state: `State ${index + 1}`,
				slug: `state-${index + 1}`,
				registryStatus: "unresearched",
				proposalFocus: "unknown",
				region: index === 0 ? "plains" : "midwest",
				shortNote: "Not yet researched.",
				editorialPriority: "neutral",
			})),
		};

		// Act
		const execution = () => parseStateRegistryManifest(manifest);

		// Assert
		expect(execution).toThrow();
	});
});

describe("parseStateEntryFrontmatter", () => {
	test("accepts frontmatter with a controlled legislative status group", () => {
		// Arrange
		const frontmatter = {
			title: "Illinois HB 1844",
			slug: "illinois-hb-1844",
			summary: "Strategic reserve proposal",
			state: "Illinois",
			recordType: "legislative-bill",
			proposalKind: "reserve",
			proposalSubtype: "strategic-reserve",
			billId: "HB 1844",
			chamber: "House",
			status: "Introduced",
			legislativeStatusGroup: "introduced",
			statusAsOf: "2026-04-01",
			lastReviewed: "2026-04-01",
			sponsors: ["Rep. Example"],
			primarySources: ["https://example.com/bill"],
			confidence: "high",
			effect: "Would authorize a Bitcoin reserve.",
		};

		// Act
		const result = parseStateEntryFrontmatter(frontmatter);

		// Assert
		expect(result.legislativeStatusGroup).toBe("introduced");
	});

	test("rejects frontmatter with an invalid legislative status group", () => {
		// Arrange
		const frontmatter = {
			title: "Illinois HB 1844",
			slug: "illinois-hb-1844",
			summary: "Strategic reserve proposal",
			state: "Illinois",
			recordType: "legislative-bill",
			proposalKind: "reserve",
			proposalSubtype: "strategic-reserve",
			billId: "HB 1844",
			chamber: "House",
			status: "Introduced",
			legislativeStatusGroup: "live-tracker",
			statusAsOf: "2026-04-01",
			lastReviewed: "2026-04-01",
			sponsors: ["Rep. Example"],
			primarySources: ["https://example.com/bill"],
			confidence: "high",
			effect: "Would authorize a Bitcoin reserve.",
		};

		// Act
		const execution = () => parseStateEntryFrontmatter(frontmatter);

		// Assert
		expect(execution).toThrow();
	});
});

describe("assertUniqueSlugs", () => {
	test("rejects duplicate slugs across canonical records", () => {
		// Arrange
		const records = [
			{ path: "content/docs/methodology.md", slug: "methodology" },
			{ path: "content/states/illinois.md", slug: "methodology" },
		];

		// Act
		const execution = () => assertUniqueSlugs(records);

		// Assert
		expect(execution).toThrow(
			'Duplicate slug "methodology" in content/docs/methodology.md and content/states/illinois.md',
		);
	});
});

describe("toDateLabel", () => {
	test("accepts a date in YYYY-MM-DD format", () => {
		// Arrange
		const value = "2026-04-01";

		// Act
		const result = toDateLabel(value);

		// Assert
		expect(result).toBe("2026-04-01");
	});
});

describe("parseStateCandidateIntake", () => {
	const officialCandidate = {
		state: "Ohio",
		slug: "ohio",
		sourceAvailability: "official-bill-page",
		proposalRelevance: "high",
		readiness: "ready-to-author",
		status: "In House Committee",
		statusAsOf: "2026-05-27",
		officialSourceUrl: "https://www.legislature.ohio.gov/legislation/136/hb18",
		evidenceNote:
			"Official bill page identifies the proposal and committee posture.",
		nextAction: "author-state-entry",
	};

	test("accepts ready candidates with official bill-page evidence", () => {
		// Arrange
		const intake = {
			candidates: [officialCandidate],
		};

		// Act
		const result = parseStateCandidateIntake(intake);

		// Assert
		expect(result.candidates[0]?.readiness).toBe("ready-to-author");
		expect(result.candidates[0]?.sourceAvailability).toBe("official-bill-page");
	});

	test("rejects ready candidates backed only by secondary coverage", () => {
		// Arrange
		const intake = {
			candidates: [
				{
					...officialCandidate,
					sourceAvailability: "secondary-only",
				},
			],
		};

		// Act
		const execution = () => parseStateCandidateIntake(intake);

		// Assert
		expect(execution).toThrow(
			"ready-to-author candidates require official source availability",
		);
	});

	test("rejects deferred candidates without a deferral reason", () => {
		// Arrange
		const intake = {
			candidates: [
				{
					...officialCandidate,
					readiness: "defer",
					nextAction: "defer-until-stronger-official-source",
					deferralReason: " ",
				},
			],
		};

		// Act
		const execution = () => parseStateCandidateIntake(intake);

		// Assert
		expect(execution).toThrow("deferred candidates require a deferralReason");
	});

	test("rejects impossible candidate status dates", () => {
		// Arrange
		const invalidDates = ["2026-02-30", "2026-99-99"];

		for (const statusAsOf of invalidDates) {
			const intake = {
				candidates: [
					{
						...officialCandidate,
						statusAsOf,
					},
				],
			};

			// Act
			const execution = () => parseStateCandidateIntake(intake);

			// Assert
			expect(execution).toThrow(
				"date must be a valid calendar date in YYYY-MM-DD format",
			);
		}
	});

	test("rejects mismatched readiness and nextAction values", () => {
		// Arrange
		const intake = {
			candidates: [
				{
					...officialCandidate,
					nextAction: "confirm-final-status",
				},
			],
		};

		// Act
		const execution = () => parseStateCandidateIntake(intake);

		// Assert
		expect(execution).toThrow(
			"ready-to-author candidates require nextAction author-state-entry",
		);
	});

	test("accepts source-rich terminal candidates ready for authoring", () => {
		// Arrange
		const intake = {
			candidates: [
				{
					...officialCandidate,
					state: "Florida",
					slug: "florida",
					status: "Died in Banking and Insurance",
					statusAsOf: "2025-06-16",
					officialSourceUrl: "https://www.flsenate.gov/Session/Bill/2025/550",
					evidenceNote:
						"Official Senate page records the terminal bill posture.",
				},
			],
		};

		// Act
		const result = parseStateCandidateIntake(intake);

		// Assert
		expect(result.candidates[0]?.status).toBe("Died in Banking and Insurance");
	});
});
