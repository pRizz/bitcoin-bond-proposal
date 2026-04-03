import { describe, expect, test } from "bun:test";

import {
	assertKnownProposalClassification,
	assertUniqueSlugs,
	parseProposalTaxonomy,
	parseStateEntryFrontmatter,
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
