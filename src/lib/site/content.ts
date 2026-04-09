import graph from "../../../generated/content-graph.json";

export type RegistryStatus = "unresearched" | "queued" | "published";
export type ProposalFocus = "bond" | "reserve" | "both" | "unknown";
export type EditorialPriority =
	| "bond-priority"
	| "reserve-priority"
	| "neutral";
export type ReviewStatus = "current" | "due-soon" | "overdue";
export type RecordType =
	| "legislative-bill"
	| "authority-action"
	| "executive-action"
	| "other-official-record";

type GraphDocument = {
	title: string;
	slug: string;
	summary: string;
	documentKind: string;
	audience: string[];
	outputs: string[];
	updatedAt: string;
	path: string;
};

type GraphState = {
	title: string;
	slug: string;
	state: string;
	summary: string;
	recordType: RecordType;
	registryStatus: RegistryStatus;
	proposalFocus: ProposalFocus;
	shortNote: string;
	editorialPriority: EditorialPriority;
	reviewCadenceDays: number;
	proposalKind: "reserve" | "bond" | "both";
	proposalSubtype: string;
	billId: string;
	chamber: string;
	status: string;
	statusAsOf: string;
	lastReviewed: string;
	nextReviewDue: string;
	daysUntilReviewDue: number;
	reviewStatus: ReviewStatus;
	confidence: "high" | "medium" | "low";
	path: string;
};

type GraphManifestEntry = {
	state: string;
	slug: string;
	registryStatus: RegistryStatus;
	proposalFocus: ProposalFocus;
	shortNote: string;
	editorialPriority: EditorialPriority;
	reviewCadenceDays?: number;
};

type ContentGraph = {
	docs: GraphDocument[];
	states: GraphState[];
	registry: {
		manifest: {
			states: GraphManifestEntry[];
		};
		publishedSlugs: string[];
		queuedSlugs: string[];
		statusCounts: {
			published: number;
			queued: number;
			unresearched: number;
		};
	};
};

const contentGraph = graph as ContentGraph;

const priorityWeight: Record<EditorialPriority, number> = {
	"bond-priority": 0,
	"reserve-priority": 1,
	neutral: 2,
};

export function getMethodologyDocument() {
	return contentGraph.docs.find((doc) => doc.slug === "methodology");
}

export function getDocumentBySlug(slug: string) {
	return contentGraph.docs.find((doc) => doc.slug === slug);
}

export function getPublishedStates() {
	return [...contentGraph.states]
		.map((state) => ({
			...state,
			manifest: contentGraph.registry.manifest.states.find(
				(entry) => entry.slug === state.slug,
			),
		}))
		.sort((left, right) => {
			const leftPriority = priorityWeight[left.editorialPriority];
			const rightPriority = priorityWeight[right.editorialPriority];

			if (leftPriority !== rightPriority) {
				return leftPriority - rightPriority;
			}

			return left.state.localeCompare(right.state);
		});
}

export function getStateBySlug(slug: string) {
	const stateEntry = contentGraph.states.find((entry) => entry.slug === slug);

	if (!stateEntry) {
		return undefined;
	}

	return {
		...stateEntry,
		manifest: contentGraph.registry.manifest.states.find(
			(entry) => entry.slug === slug,
		),
	};
}

export function getRegistryStats() {
	const publishedStates = getPublishedStates();

	return {
		publishedCount: publishedStates.length,
		bondPriorityCount: publishedStates.filter(
			(state) => state.editorialPriority === "bond-priority",
		).length,
		reservePriorityCount: publishedStates.filter(
			(state) => state.editorialPriority === "reserve-priority",
		).length,
		dueSoonCount: publishedStates.filter(
			(state) => state.reviewStatus === "due-soon",
		).length,
		overdueCount: publishedStates.filter(
			(state) => state.reviewStatus === "overdue",
		).length,
		queuedCount: contentGraph.registry.statusCounts.queued,
		unresearchedCount: contentGraph.registry.statusCounts.unresearched,
		latestReview: publishedStates
			.map((state) => state.lastReviewed)
			.sort((left, right) => right.localeCompare(left))[0],
	};
}
