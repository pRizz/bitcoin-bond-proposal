import graph from "../../../generated/content-graph.json";
import type {
	LegislativeStatusGroup,
	ProposalFocus,
	Region,
} from "../content/schema";
import {
	buildStatesClusterModelFromIndexModel,
	buildStatesComparisonModelFromIndexModel,
	type StatesClusterModel,
	type StatesComparisonModel,
} from "./states-surfaces";
export type {
	ClusterSectionKey,
	ClusterState,
	ComparisonSectionKey,
	ComparisonState,
	StatesClusterBucket,
	StatesClusterModel,
	StatesClusterSection,
	StatesComparisonModel,
	StatesComparisonSection,
} from "./states-surfaces";

export type RegistryStatus = "unresearched" | "queued" | "published";
export type EditorialPriority =
	| "bond-priority"
	| "reserve-priority"
	| "neutral";
export type RecordType =
	| "legislative-bill"
	| "authority-action"
	| "executive-action"
	| "other-official-record";
export type ProposalKind = "reserve" | "bond" | "both";
export type StatesIndexSortMode = "priority" | "state" | "reviewed";

type GroupBucket<TBucket extends string> = Record<
	TBucket,
	{ count: number; slugs: string[] }
>;

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
	region: Region;
	shortNote: string;
	editorialPriority: EditorialPriority;
	proposalKind: ProposalKind;
	proposalSubtype: string;
	billId: string;
	chamber: string;
	status: string;
	legislativeStatusGroup: LegislativeStatusGroup;
	statusAsOf: string;
	statusAgeDays: number;
	lastReviewed: string;
	reviewAgeDays: number;
	confidence: "high" | "medium" | "low";
	path: string;
};

type GraphManifestEntry = {
	state: string;
	slug: string;
	registryStatus: RegistryStatus;
	proposalFocus: ProposalFocus;
	region: Region;
	shortNote: string;
	editorialPriority: EditorialPriority;
};

export type ContentGraph = {
	docs: GraphDocument[];
	states: GraphState[];
	registry: {
		manifest: {
			states: GraphManifestEntry[];
		};
		publishedSlugs: string[];
		generatedAt: string;
		groups: {
			byRegion: GroupBucket<Region>;
			byProposalFocus: GroupBucket<ProposalFocus>;
			byLegislativeStatusGroup: GroupBucket<LegislativeStatusGroup>;
		};
	};
};

export type ConfidenceCue = {
	title: string;
	detail: string;
};

export type PublishedState = GraphState & {
	manifest: GraphManifestEntry | undefined;
	confidenceCue: ConfidenceCue;
};

export type StateGroup<TBucket extends string> = {
	key: TBucket;
	count: number;
	states: PublishedState[];
};

export type FreshnessSummary = {
	generatedAt: string;
	latestReview: string | undefined;
	freshestReviewAgeDays: number | undefined;
	stalestReviewAgeDays: number | undefined;
	freshestStatusAgeDays: number | undefined;
	stalestStatusAgeDays: number | undefined;
};

export type RegistryStats = {
	publishedCount: number;
	bondPriorityCount: number;
	reservePriorityCount: number;
	latestReview: string | undefined;
	generatedAt: string;
	stalestReviewAgeDays: number | undefined;
	stalestStatusAgeDays: number | undefined;
};

export type StatesIndexModel = {
	states: PublishedState[];
	groups: {
		byRegion: Array<StateGroup<Region>>;
		byProposalFocus: Array<StateGroup<ProposalFocus>>;
		byLegislativeStatusGroup: Array<StateGroup<LegislativeStatusGroup>>;
	};
	freshness: FreshnessSummary;
	stats: RegistryStats;
};

const contentGraph = graph as ContentGraph;

const priorityWeight: Record<EditorialPriority, number> = {
	"bond-priority": 0,
	"reserve-priority": 1,
	neutral: 2,
};

const manifestBySlug = new Map(
	contentGraph.registry.manifest.states.map(
		(entry) => [entry.slug, entry] as const,
	),
);

function describeConfidenceFooting(
	confidence: GraphState["confidence"],
): string {
	switch (confidence) {
		case "medium":
			return "developing official footing";
		case "low":
			return "limited official footing";
		default:
			return "clear official footing";
	}
}

function describeLegislativeStage(
	legislativeStatusGroup: GraphState["legislativeStatusGroup"],
): string {
	switch (legislativeStatusGroup) {
		case "advanced":
			return "Advanced bill";
		case "approved":
			return "Approved bill";
		case "enacted":
			return "Enacted bill";
		case "failed":
			return "Failed bill";
		default:
			return "Early-stage bill";
	}
}

function describeLegislativeCueDetail(
	legislativeStatusGroup: GraphState["legislativeStatusGroup"],
): string {
	switch (legislativeStatusGroup) {
		case "advanced":
			return "Official bill text and dated status are present, and the measure has moved beyond introduction.";
		case "approved":
			return "Official bill text and dated status are present, and the measure has cleared a formal approval step.";
		case "enacted":
			return "Official bill text and dated status are present, and the measure has reached enacted-law status.";
		case "failed":
			return "Official bill text and dated status are present, and the measure remains useful because it reached an official veto or failure point.";
		default:
			return "Official bill text and dated status are present, but the measure remains at an early legislative stage.";
	}
}

export function buildConfidenceCue(
	state: Pick<
		GraphState,
		"confidence" | "recordType" | "legislativeStatusGroup"
	>,
): ConfidenceCue {
	const footing = describeConfidenceFooting(state.confidence);

	switch (state.recordType) {
		case "authority-action":
			return {
				title: `Authority action with ${footing}`,
				detail:
					"The record rests on official authority action rather than a legislature-filed bill, with the approval posture reflected in the source trail.",
			};
		case "executive-action":
			return {
				title: `Executive action with ${footing}`,
				detail:
					"The record rests on official executive action rather than a legislature-filed bill, with the current posture reflected in the source trail.",
			};
		case "other-official-record":
			return {
				title: `Official record with ${footing}`,
				detail:
					"The record rests on official published materials, with the current posture reflected in the source trail.",
			};
		default:
			return {
				title: `${describeLegislativeStage(state.legislativeStatusGroup)} with ${footing}`,
				detail: describeLegislativeCueDetail(state.legislativeStatusGroup),
			};
	}
}

function buildPublishedState(
	state: GraphState,
	manifestLookup: ReadonlyMap<string, GraphManifestEntry>,
): PublishedState {
	return {
		...state,
		manifest: manifestLookup.get(state.slug),
		confidenceCue: buildConfidenceCue(state),
	};
}

function buildPublishedStates(
	states: ReadonlyArray<GraphState>,
	manifestLookup: ReadonlyMap<string, GraphManifestEntry>,
): PublishedState[] {
	return states.map((state) => buildPublishedState(state, manifestLookup));
}

function sortPublishedStates(
	states: ReadonlyArray<PublishedState>,
	sortMode: StatesIndexSortMode,
): PublishedState[] {
	switch (sortMode) {
		case "state":
			return [...states].sort((left, right) =>
				left.state.localeCompare(right.state),
			);
		case "reviewed":
			return [...states].sort((left, right) =>
				right.lastReviewed.localeCompare(left.lastReviewed),
			);
		default:
			return [...states].sort((left, right) => {
				const leftPriority = priorityWeight[left.editorialPriority];
				const rightPriority = priorityWeight[right.editorialPriority];

				if (leftPriority !== rightPriority) {
					return leftPriority - rightPriority;
				}

				return left.state.localeCompare(right.state);
			});
	}
}

function mapStateGroups<TBucket extends string>(
	states: ReadonlyArray<PublishedState>,
	buckets: GroupBucket<TBucket>,
): Array<StateGroup<TBucket>> {
	const statesBySlug = new Map(
		states.map((state) => [state.slug, state] as const),
	);
	const bucketEntries = Object.entries(buckets) as Array<
		[TBucket, GroupBucket<TBucket>[TBucket]]
	>;

	return bucketEntries.map(([key, bucket]) => ({
		key,
		count: bucket.count,
		states: bucket.slugs.flatMap((slug) => {
			const maybeState = statesBySlug.get(slug);
			return maybeState ? [maybeState] : [];
		}),
	}));
}

export function summarizeStateFreshness(
	states: ReadonlyArray<GraphState>,
	generatedAt: string,
): FreshnessSummary {
	const latestReview = [...states]
		.map((state) => state.lastReviewed)
		.sort((left, right) => right.localeCompare(left))[0];
	const reviewAgeDays = states.map((state) => state.reviewAgeDays);
	const statusAgeDays = states.map((state) => state.statusAgeDays);
	const freshestReviewAgeDays =
		reviewAgeDays.length > 0 ? Math.min(...reviewAgeDays) : undefined;
	const stalestReviewAgeDays =
		reviewAgeDays.length > 0 ? Math.max(...reviewAgeDays) : undefined;
	const freshestStatusAgeDays =
		statusAgeDays.length > 0 ? Math.min(...statusAgeDays) : undefined;
	const stalestStatusAgeDays =
		statusAgeDays.length > 0 ? Math.max(...statusAgeDays) : undefined;

	return {
		generatedAt,
		latestReview,
		freshestReviewAgeDays,
		stalestReviewAgeDays,
		freshestStatusAgeDays,
		stalestStatusAgeDays,
	};
}

export function buildStatesIndexModel(
	graphData: ContentGraph,
): StatesIndexModel {
	const publishedStates = sortPublishedStates(
		buildPublishedStates(
			graphData.states,
			new Map(
				graphData.registry.manifest.states.map(
					(entry) => [entry.slug, entry] as const,
				),
			),
		),
		"priority",
	);
	const freshness = summarizeStateFreshness(
		publishedStates,
		graphData.registry.generatedAt,
	);
	const stats = {
		publishedCount: publishedStates.length,
		bondPriorityCount: publishedStates.filter(
			(state) => state.editorialPriority === "bond-priority",
		).length,
		reservePriorityCount: publishedStates.filter(
			(state) => state.editorialPriority === "reserve-priority",
		).length,
		latestReview: freshness.latestReview,
		generatedAt: freshness.generatedAt,
		stalestReviewAgeDays: freshness.stalestReviewAgeDays,
		stalestStatusAgeDays: freshness.stalestStatusAgeDays,
	} satisfies RegistryStats;

	return {
		states: publishedStates,
		groups: {
			byRegion: mapStateGroups(
				publishedStates,
				graphData.registry.groups.byRegion,
			),
			byProposalFocus: mapStateGroups(
				publishedStates,
				graphData.registry.groups.byProposalFocus,
			),
			byLegislativeStatusGroup: mapStateGroups(
				publishedStates,
				graphData.registry.groups.byLegislativeStatusGroup,
			),
		},
		freshness,
		stats,
	};
}

export function buildStatesClusterModel(
	graphData: ContentGraph,
): StatesClusterModel {
	return buildStatesClusterModelFromIndexModel(
		buildStatesIndexModel(graphData),
	);
}

export function buildStatesComparisonModel(
	graphData: ContentGraph,
): StatesComparisonModel {
	return buildStatesComparisonModelFromIndexModel(
		buildStatesIndexModel(graphData),
	);
}

export function getMethodologyDocument() {
	return contentGraph.docs.find((doc) => doc.slug === "methodology");
}

export function getDocumentBySlug(slug: string) {
	return contentGraph.docs.find((doc) => doc.slug === slug);
}

export function getPublishedStates() {
	return buildPublishedStates(contentGraph.states, manifestBySlug);
}

export function getStateBySlug(slug: string) {
	const maybeStateEntry = contentGraph.states.find(
		(entry) => entry.slug === slug,
	);

	if (!maybeStateEntry) {
		return undefined;
	}

	return {
		...buildPublishedState(maybeStateEntry, manifestBySlug),
	};
}

export function getRegistryStats() {
	return buildStatesIndexModel(contentGraph).stats;
}

export function getStatesIndexModel() {
	return buildStatesIndexModel(contentGraph);
}

export function getStatesClusterModel() {
	return buildStatesClusterModel(contentGraph);
}

export function getStatesComparisonModel() {
	return buildStatesComparisonModel(contentGraph);
}

export function getSortedPublishedStates(sortMode: StatesIndexSortMode) {
	return sortPublishedStates(getPublishedStates(), sortMode);
}
