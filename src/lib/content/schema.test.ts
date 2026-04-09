import { describe, expect, test } from "bun:test";

import {
	assertKnownProposalClassification,
	assertPublishedManifestEntriesHaveRefreshCadence,
	assertPublishedManifestEntriesHaveStateFiles,
	assertStateEntryFreshnessChronology,
	assertUniqueSlugs,
	parseStateRegistryManifest,
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

describe("refresh-aware manifest validation", () => {
	test("rejects published manifest entries without review cadence", () => {
		// Arrange
		const manifest = parseStateRegistryManifest({
			states: Array.from({ length: 50 }, (_, index) => ({
				state: `State ${index + 1}`,
				slug: `state-${index + 1}`,
				registryStatus: index === 0 ? "published" : "unresearched",
				proposalFocus: index === 0 ? "reserve" : "unknown",
				shortNote: "Registry note",
				editorialPriority: "neutral",
			})),
		});

		// Act
		const execution = () =>
			assertPublishedManifestEntriesHaveRefreshCadence(manifest.states);

		// Assert
		expect(execution).toThrow(
			'Published manifest entry "state-1" must define reviewCadenceDays',
		);
	});

	test("rejects published manifest entries without canonical state files", () => {
		// Arrange
		const manifest = parseStateRegistryManifest({
			states: Array.from({ length: 50 }, (_, index) => ({
				state: `State ${index + 1}`,
				slug: `state-${index + 1}`,
				registryStatus: index === 0 ? "published" : "unresearched",
				proposalFocus: index === 0 ? "reserve" : "unknown",
				shortNote: "Registry note",
				editorialPriority: "neutral",
				reviewCadenceDays: index === 0 ? 30 : undefined,
			})),
		});

		// Act
		const execution = () =>
			assertPublishedManifestEntriesHaveStateFiles(manifest.states, []);

		// Assert
		expect(execution).toThrow(
			'Manifest entry "state-1" is marked published but has no canonical state-entry file',
		);
	});
});

describe("assertStateEntryFreshnessChronology", () => {
	test("rejects states reviewed before the recorded status date", () => {
		// Arrange
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
			statusAsOf: "2026-04-10",
			lastReviewed: "2026-04-01",
			sponsors: ["Rep. Example"],
			primarySources: ["https://example.com/bill"],
			confidence: "high",
			effect: "Would authorize a Bitcoin reserve.",
		});

		// Act
		const execution = () => assertStateEntryFreshnessChronology(stateEntry);

		// Assert
		expect(execution).toThrow(
			'State entry "illinois-hb-1844" must not have lastReviewed before statusAsOf',
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
