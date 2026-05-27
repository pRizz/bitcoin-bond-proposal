import type { StateCandidateIntakeEntry } from "../content/schema";
import type { RefreshQueueModel } from "./registry-freshness";

export type CandidateFreshnessRisk = "current" | "aging" | "stale";

export type CandidatePriorityEntry = StateCandidateIntakeEntry & {
	rank: number;
	statusAgeDays: number;
	freshnessRisk: CandidateFreshnessRisk;
	authorable: boolean;
	reasons: string[];
};

export type CandidatePriorityModel = {
	generatedAt: string;
	summary: {
		candidateCount: number;
		readyToAuthorCount: number;
		needsStatusConfirmationCount: number;
		deferredCount: number;
		authorableCount: number;
	};
	entries: CandidatePriorityEntry[];
};

export type CombinedPriorityQueueModel = {
	generatedAt: string;
	sourceBoundary: string;
	summary: {
		publishedRefreshCount: number;
		publishedRefreshDueCount: number;
		candidateCount: number;
		firstPublicationCandidateCount: number;
	};
	publishedRefreshWork: RefreshQueueModel["entries"];
	firstPublicationCandidates: CandidatePriorityEntry[];
	candidateIntake: CandidatePriorityModel;
};

export const candidateStatusAgingDays = 45;
export const candidateStatusStaleDays = 90;

const millisecondsPerDay = 24 * 60 * 60 * 1000;

const readinessWeight: Record<StateCandidateIntakeEntry["readiness"], number> =
	{
		"ready-to-author": 0,
		"needs-status-confirmation": 1,
		defer: 2,
	};

const sourceAvailabilityWeight: Record<
	StateCandidateIntakeEntry["sourceAvailability"],
	number
> = {
	"official-bill-page": 0,
	"official-state-record": 1,
	"official-pdf-only": 2,
	"secondary-only": 3,
	"none-found": 4,
};

const proposalRelevanceWeight: Record<
	StateCandidateIntakeEntry["proposalRelevance"],
	number
> = {
	high: 0,
	medium: 1,
	low: 2,
};

function toUtcDate(value: string): Date {
	const dateOnly = value.slice(0, 10);
	const [year, month, day] = dateOnly.split("-").map(Number);

	return new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1));
}

function getAgeDays(fromDate: string, toDate: string): number {
	const differenceInMilliseconds =
		toUtcDate(toDate).getTime() - toUtcDate(fromDate).getTime();

	return Math.max(0, Math.floor(differenceInMilliseconds / millisecondsPerDay));
}

function getFreshnessRisk(statusAgeDays: number): CandidateFreshnessRisk {
	if (statusAgeDays >= candidateStatusStaleDays) {
		return "stale";
	}

	if (statusAgeDays >= candidateStatusAgingDays) {
		return "aging";
	}

	return "current";
}

function hasOfficialSource(
	sourceAvailability: StateCandidateIntakeEntry["sourceAvailability"],
): boolean {
	return [
		"official-bill-page",
		"official-state-record",
		"official-pdf-only",
	].includes(sourceAvailability);
}

function isAuthorable(candidate: StateCandidateIntakeEntry): boolean {
	return (
		candidate.readiness === "ready-to-author" &&
		hasOfficialSource(candidate.sourceAvailability) &&
		Boolean(candidate.officialSourceUrl)
	);
}

function buildReasons(
	candidate: StateCandidateIntakeEntry,
	freshnessRisk: CandidateFreshnessRisk,
): string[] {
	const reasons = [
		`source availability: ${candidate.sourceAvailability}`,
		`proposal relevance: ${candidate.proposalRelevance}`,
	];

	if (freshnessRisk !== "current") {
		reasons.push(`freshness risk: ${freshnessRisk}`);
	}

	if (candidate.deferralReason) {
		reasons.push(`deferral reason: ${candidate.deferralReason}`);
	}

	return reasons;
}

function compareCandidates(
	left: StateCandidateIntakeEntry,
	right: StateCandidateIntakeEntry,
): number {
	const readinessDelta =
		readinessWeight[left.readiness] - readinessWeight[right.readiness];

	if (readinessDelta !== 0) {
		return readinessDelta;
	}

	const sourceDelta =
		sourceAvailabilityWeight[left.sourceAvailability] -
		sourceAvailabilityWeight[right.sourceAvailability];

	if (sourceDelta !== 0) {
		return sourceDelta;
	}

	const relevanceDelta =
		proposalRelevanceWeight[left.proposalRelevance] -
		proposalRelevanceWeight[right.proposalRelevance];

	if (relevanceDelta !== 0) {
		return relevanceDelta;
	}

	return left.state.localeCompare(right.state);
}

export function buildCandidatePriorityModel(
	candidates: ReadonlyArray<StateCandidateIntakeEntry>,
	generatedAt: string,
): CandidatePriorityModel {
	const sortedCandidates = [...candidates].sort(compareCandidates);
	const entries = sortedCandidates.map((candidate, index) => {
		const statusAgeDays = getAgeDays(candidate.statusAsOf, generatedAt);
		const freshnessRisk = getFreshnessRisk(statusAgeDays);

		return {
			...candidate,
			rank: index + 1,
			statusAgeDays,
			freshnessRisk,
			authorable: isAuthorable(candidate),
			reasons: buildReasons(candidate, freshnessRisk),
		} satisfies CandidatePriorityEntry;
	});

	return {
		generatedAt,
		summary: {
			candidateCount: entries.length,
			readyToAuthorCount: entries.filter(
				(entry) => entry.readiness === "ready-to-author",
			).length,
			needsStatusConfirmationCount: entries.filter(
				(entry) => entry.readiness === "needs-status-confirmation",
			).length,
			deferredCount: entries.filter((entry) => entry.readiness === "defer")
				.length,
			authorableCount: entries.filter((entry) => entry.authorable).length,
		},
		entries,
	};
}

export function buildCombinedPriorityQueueModel(input: {
	refreshQueue: RefreshQueueModel;
	candidates: ReadonlyArray<StateCandidateIntakeEntry>;
	generatedAt: string;
}): CombinedPriorityQueueModel {
	const candidateIntake = buildCandidatePriorityModel(
		input.candidates,
		input.generatedAt,
	);
	const firstPublicationCandidates = candidateIntake.entries.filter(
		(entry) => entry.readiness !== "defer",
	);

	return {
		generatedAt: input.generatedAt,
		sourceBoundary:
			"Published refresh work comes from canonical published records; candidate work comes from content/data/state-candidate-intake.json.",
		summary: {
			publishedRefreshCount: input.refreshQueue.entries.length,
			publishedRefreshDueCount: input.refreshQueue.entries.filter(
				(entry) => entry.priority === "due",
			).length,
			candidateCount: candidateIntake.summary.candidateCount,
			firstPublicationCandidateCount: firstPublicationCandidates.length,
		},
		publishedRefreshWork: input.refreshQueue.entries,
		firstPublicationCandidates,
		candidateIntake,
	};
}
