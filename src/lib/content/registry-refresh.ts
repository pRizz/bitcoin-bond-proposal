const millisecondsPerDay = 24 * 60 * 60 * 1000;
const dueSoonWindowDays = 7;

export type ReviewStatus = "current" | "due-soon" | "overdue";

export type ReviewSnapshot = {
	nextReviewDue: string;
	daysUntilReviewDue: number;
	reviewStatus: ReviewStatus;
};

function parseIsoDateLabel(value: string): Date {
	const [year, month, day] = value.split("-").map(Number);

	return new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1));
}

function toIsoDateLabel(value: Date): string {
	return value.toISOString().slice(0, 10);
}

function addDays(value: Date, days: number): Date {
	return new Date(value.getTime() + days * millisecondsPerDay);
}

function differenceInWholeDays(targetDate: Date, comparisonDate: Date): number {
	return Math.floor(
		(targetDate.getTime() - comparisonDate.getTime()) / millisecondsPerDay,
	);
}

export function getReviewSnapshot(input: {
	lastReviewed: string;
	reviewCadenceDays: number;
	maybeEvaluationDate?: string;
}): ReviewSnapshot {
	const lastReviewedDate = parseIsoDateLabel(input.lastReviewed);
	const evaluationDate = parseIsoDateLabel(
		input.maybeEvaluationDate ?? toIsoDateLabel(new Date()),
	);
	const nextReviewDueDate = addDays(lastReviewedDate, input.reviewCadenceDays);
	const daysUntilReviewDue = differenceInWholeDays(
		nextReviewDueDate,
		evaluationDate,
	);

	if (daysUntilReviewDue < 0) {
		return {
			nextReviewDue: toIsoDateLabel(nextReviewDueDate),
			daysUntilReviewDue,
			reviewStatus: "overdue",
		};
	}

	if (daysUntilReviewDue <= dueSoonWindowDays) {
		return {
			nextReviewDue: toIsoDateLabel(nextReviewDueDate),
			daysUntilReviewDue,
			reviewStatus: "due-soon",
		};
	}

	return {
		nextReviewDue: toIsoDateLabel(nextReviewDueDate),
		daysUntilReviewDue,
		reviewStatus: "current",
	};
}
