import { describe, expect, test } from "bun:test";

import { getReviewSnapshot } from "./registry-refresh";

describe("getReviewSnapshot", () => {
	test("marks records as current when the next review date is more than a week away", () => {
		// Arrange
		const input = {
			lastReviewed: "2026-04-01",
			reviewCadenceDays: 30,
			maybeEvaluationDate: "2026-04-09",
		};

		// Act
		const result = getReviewSnapshot(input);

		// Assert
		expect(result).toEqual({
			nextReviewDue: "2026-05-01",
			daysUntilReviewDue: 22,
			reviewStatus: "current",
		});
	});

	test("marks records as due soon when the next review date is within seven days", () => {
		// Arrange
		const input = {
			lastReviewed: "2026-04-01",
			reviewCadenceDays: 14,
			maybeEvaluationDate: "2026-04-10",
		};

		// Act
		const result = getReviewSnapshot(input);

		// Assert
		expect(result).toEqual({
			nextReviewDue: "2026-04-15",
			daysUntilReviewDue: 5,
			reviewStatus: "due-soon",
		});
	});

	test("marks records as overdue once the review date has passed", () => {
		// Arrange
		const input = {
			lastReviewed: "2026-04-01",
			reviewCadenceDays: 14,
			maybeEvaluationDate: "2026-04-20",
		};

		// Act
		const result = getReviewSnapshot(input);

		// Assert
		expect(result).toEqual({
			nextReviewDue: "2026-04-15",
			daysUntilReviewDue: -5,
			reviewStatus: "overdue",
		});
	});
});
