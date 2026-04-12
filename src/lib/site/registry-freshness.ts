import type { LegislativeStatusGroup } from "../content/schema";

export type FreshnessTone = "current" | "aging" | "due";

export type FreshnessCue = {
	tone: FreshnessTone;
	title: string;
	detail: string;
};

export type FreshnessCounts = Record<FreshnessTone, number>;

export type FreshnessSubject = {
	slug: string;
	state: string;
	status: string;
	statusAsOf: string;
	statusAgeDays: number;
	lastReviewed: string;
	reviewAgeDays: number;
	legislativeStatusGroup: LegislativeStatusGroup;
};

export type RegistryFreshnessSummary = {
	generatedAt: string;
	latestReview: string | undefined;
	counts: FreshnessCounts;
	lead: string;
};

export type RefreshQueueEntry = FreshnessSubject & {
	priority: Exclude<FreshnessTone, "current">;
	reasons: string[];
};

export type RefreshQueueModel = {
	generatedAt: string;
	latestReview: string | undefined;
	thresholds: {
		activeReviewSoonDays: number;
		activeReviewDueDays: number;
		activeStatusSoonDays: number;
		activeStatusDueDays: number;
		terminalReviewSoonDays: number;
		terminalReviewDueDays: number;
	};
	summary: RegistryFreshnessSummary & {
		queueCount: number;
	};
	entries: RefreshQueueEntry[];
};

const activeReviewSoonDays = 14;
const activeReviewDueDays = 30;
const activeStatusSoonDays = 21;
const activeStatusDueDays = 45;
const terminalReviewSoonDays = 21;
const terminalReviewDueDays = 45;

function createFreshnessCounts(): FreshnessCounts {
	return {
		current: 0,
		aging: 0,
		due: 0,
	};
}

function isStatusSensitive(
	legislativeStatusGroup: LegislativeStatusGroup,
): boolean {
	return !["enacted", "failed"].includes(legislativeStatusGroup);
}

function getToneFromSubject(subject: FreshnessSubject): FreshnessTone {
	const statusSensitive = isStatusSensitive(subject.legislativeStatusGroup);
	const reviewSoonDays = statusSensitive
		? activeReviewSoonDays
		: terminalReviewSoonDays;
	const reviewDueDays = statusSensitive
		? activeReviewDueDays
		: terminalReviewDueDays;

	if (
		subject.reviewAgeDays >= reviewDueDays ||
		(statusSensitive && subject.statusAgeDays >= activeStatusDueDays)
	) {
		return "due";
	}

	if (
		subject.reviewAgeDays >= reviewSoonDays ||
		(statusSensitive && subject.statusAgeDays >= activeStatusSoonDays)
	) {
		return "aging";
	}

	return "current";
}

function getLatestReview(
	subjects: ReadonlyArray<Pick<FreshnessSubject, "lastReviewed">>,
): string | undefined {
	return [...subjects]
		.map((subject) => subject.lastReviewed)
		.sort((left, right) => right.localeCompare(left))[0];
}

function buildLead(counts: FreshnessCounts): string {
	return `This registry stays explicitly dated: ${counts.current} current snapshots, ${counts.aging} review-soon records, and ${counts.due} review-due records.`;
}

function buildTerminalCue(
	tone: FreshnessTone,
	subject: Pick<FreshnessSubject, "reviewAgeDays">,
): FreshnessCue {
	switch (tone) {
		case "aging":
			return {
				tone,
				title: "Review soon",
				detail: `Reviewed ${subject.reviewAgeDays} days ago. This terminal-status record should still be revisited on the normal refresh cadence.`,
			};
		case "due":
			return {
				tone,
				title: "Review due",
				detail: `Reviewed ${subject.reviewAgeDays} days ago. This terminal-status record is due for a scheduled refresh before readers treat the snapshot as current.`,
			};
		default:
			return {
				tone,
				title: "Current snapshot",
				detail: `Reviewed ${subject.reviewAgeDays} days ago. Terminal-status records still remain explicitly dated rather than live-tracked.`,
			};
	}
}

function buildActiveCue(
	tone: FreshnessTone,
	subject: Pick<FreshnessSubject, "reviewAgeDays" | "statusAgeDays">,
): FreshnessCue {
	switch (tone) {
		case "aging":
			return {
				tone,
				title: "Review soon",
				detail: `Reviewed ${subject.reviewAgeDays} days ago. The active status snapshot is ${subject.statusAgeDays} days old, so this record should be refreshed soon.`,
			};
		case "due":
			return {
				tone,
				title: "Review due",
				detail: `Reviewed ${subject.reviewAgeDays} days ago. The active status snapshot is ${subject.statusAgeDays} days old, so this record needs a fresh source check.`,
			};
		default:
			return {
				tone,
				title: "Current snapshot",
				detail: `Reviewed ${subject.reviewAgeDays} days ago. The active status snapshot is ${subject.statusAgeDays} days old.`,
			};
	}
}

function buildReasons(subject: FreshnessSubject): string[] {
	const reasons: string[] = [];
	const statusSensitive = isStatusSensitive(subject.legislativeStatusGroup);
	const tone = getToneFromSubject(subject);

	if (tone === "current") {
		return reasons;
	}

	if (
		subject.reviewAgeDays >=
		(statusSensitive ? activeReviewSoonDays : terminalReviewSoonDays)
	) {
		reasons.push(`review age ${subject.reviewAgeDays}d`);
	}

	if (statusSensitive && subject.statusAgeDays >= activeStatusSoonDays) {
		reasons.push(`active status age ${subject.statusAgeDays}d`);
	}

	return reasons;
}

export function buildStateFreshnessCue(
	subject: FreshnessSubject,
): FreshnessCue {
	const tone = getToneFromSubject(subject);

	if (isStatusSensitive(subject.legislativeStatusGroup)) {
		return buildActiveCue(tone, subject);
	}

	return buildTerminalCue(tone, subject);
}

export function buildRegistryFreshnessSummary(
	subjects: ReadonlyArray<FreshnessSubject>,
	generatedAt: string,
): RegistryFreshnessSummary {
	const counts = createFreshnessCounts();

	for (const subject of subjects) {
		counts[getToneFromSubject(subject)] += 1;
	}

	return {
		generatedAt,
		latestReview: getLatestReview(subjects),
		counts,
		lead: buildLead(counts),
	};
}

export function buildRefreshQueueModel(
	subjects: ReadonlyArray<FreshnessSubject>,
	generatedAt: string,
): RefreshQueueModel {
	const summary = buildRegistryFreshnessSummary(subjects, generatedAt);
	const entries = subjects
		.flatMap((subject) => {
			const priority = getToneFromSubject(subject);

			if (priority === "current") {
				return [];
			}

			return [
				{
					...subject,
					priority,
					reasons: buildReasons(subject),
				} satisfies RefreshQueueEntry,
			];
		})
		.sort((left, right) => {
			if (left.priority !== right.priority) {
				return left.priority === "due" ? -1 : 1;
			}

			const leftStatusSensitive = isStatusSensitive(
				left.legislativeStatusGroup,
			);
			const rightStatusSensitive = isStatusSensitive(
				right.legislativeStatusGroup,
			);

			if (leftStatusSensitive !== rightStatusSensitive) {
				return leftStatusSensitive ? -1 : 1;
			}

			return (
				Math.max(right.statusAgeDays, right.reviewAgeDays) -
				Math.max(left.statusAgeDays, left.reviewAgeDays)
			);
		});

	return {
		generatedAt,
		latestReview: summary.latestReview,
		thresholds: {
			activeReviewSoonDays,
			activeReviewDueDays,
			activeStatusSoonDays,
			activeStatusDueDays,
			terminalReviewSoonDays,
			terminalReviewDueDays,
		},
		summary: {
			...summary,
			queueCount: entries.length,
		},
		entries,
	};
}
