import graph from "../../../generated/content-graph.json";
import type {
	LegislativeStatusGroup,
	ProposalFocus,
	Region,
} from "../content/schema";

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

export type PublishedState = GraphState & {
	manifest: GraphManifestEntry | undefined;
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

function attachManifest(
	states: ReadonlyArray<GraphState>,
	manifestLookup: ReadonlyMap<string, GraphManifestEntry>,
): PublishedState[] {
	return states.map((state) => ({
		...state,
		manifest: manifestLookup.get(state.slug),
	}));
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
		attachManifest(
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

export function getMethodologyDocument() {
	return contentGraph.docs.find((doc) => doc.slug === "methodology");
}

export function getDocumentBySlug(slug: string) {
	return contentGraph.docs.find((doc) => doc.slug === slug);
}

export function getPublishedStates() {
	return attachManifest(contentGraph.states, manifestBySlug);
}

export function getStateBySlug(slug: string) {
	const maybeStateEntry = contentGraph.states.find(
		(entry) => entry.slug === slug,
	);

	if (!maybeStateEntry) {
		return undefined;
	}

	return {
		...maybeStateEntry,
		manifest: manifestBySlug.get(slug),
	};
}

export function getRegistryStats() {
	return buildStatesIndexModel(contentGraph).stats;
}

export function getStatesIndexModel() {
	return buildStatesIndexModel(contentGraph);
}

export function getSortedPublishedStates(sortMode: StatesIndexSortMode) {
	return sortPublishedStates(getPublishedStates(), sortMode);
}
