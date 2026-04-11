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

export type ClusterSectionKey =
	| "legislative-status"
	| "proposal-focus"
	| "region";

export type ClusterState = PublishedState & {
	href: string;
};

export type StatesClusterBucket<TBucket extends string = string> = {
	key: TBucket;
	title: string;
	description: string;
	count: number;
	states: ClusterState[];
};

export type StatesClusterSection<TBucket extends string = string> = {
	key: ClusterSectionKey;
	eyebrow: string;
	title: string;
	lead: string;
	buckets: Array<StatesClusterBucket<TBucket>>;
};

export type StatesClusterModel = {
	sections: Array<
		| StatesClusterSection<LegislativeStatusGroup>
		| StatesClusterSection<ProposalFocus>
		| StatesClusterSection<Region>
	>;
};

const contentGraph = graph as ContentGraph;

const priorityWeight: Record<EditorialPriority, number> = {
	"bond-priority": 0,
	"reserve-priority": 1,
	neutral: 2,
};

type ClusterBucketCopy = {
	title: string;
	description: string;
};

const legislativeStatusClusterCopy = {
	eyebrow: "Legislative posture",
	title: "Browse by legislative status",
	lead: "Use legislative posture to separate enacted or advanced measures from early-stage and failed signals in the ten-state registry.",
	buckets: {
		introduced: {
			title: "Early-stage filings",
			description:
				"Introduced measures show where reserve and bond ideas have formally entered the record but still need legislative traction.",
		},
		advanced: {
			title: "Measures beyond introduction",
			description:
				"These records already moved past introduction, making them stronger signals than a fresh filing alone.",
		},
		approved: {
			title: "Approved authority signal",
			description:
				"This cluster captures records that already cleared a formal approval step even when the path did not run through a standard bill track.",
		},
		enacted: {
			title: "Enacted benchmark",
			description:
				"The current published batch includes one enacted reserve benchmark that shows the farthest-confirmed posture in the registry.",
		},
		failed: {
			title: "Failed but still instructive",
			description:
				"Failed measures still matter when they show how far a reserve proposal traveled before the path closed.",
		},
	},
} satisfies {
	eyebrow: string;
	title: string;
	lead: string;
	buckets: Record<LegislativeStatusGroup, ClusterBucketCopy>;
};

const proposalFocusClusterCopy = {
	eyebrow: "Policy frame",
	title: "Browse by proposal focus",
	lead: "Reserve-only, bond-side, and crossover records each explain a different piece of the thesis, so the registry keeps them visible as separate reading lanes.",
	buckets: {
		bond: {
			title: "Bond-side records",
			description:
				"Official bond-side signals are still sparse, which is why each one matters in the current published batch.",
		},
		reserve: {
			title: "Reserve-side records",
			description:
				"Most published records currently sit on the reserve side, making this the deepest lane in the ten-state set.",
		},
		both: {
			title: "Crossover records",
			description:
				"These states connect reserve policy to financing or packet-level framing in one place.",
		},
		unknown: {
			title: "Unclassified records",
			description:
				"A placeholder cluster for records whose focus is not yet classified.",
		},
	},
} satisfies {
	eyebrow: string;
	title: string;
	lead: string;
	buckets: Record<ProposalFocus, ClusterBucketCopy>;
};

const regionClusterCopy = {
	eyebrow: "Geography",
	title: "Browse by region",
	lead: "Regional clusters show where the current published batch is concentrated without implying that every part of the country has equal coverage yet.",
	buckets: {
		northeast: {
			title: "Northeast cluster",
			description:
				"A small cluster anchored by the current bond-side authority record.",
		},
		midwest: {
			title: "Midwest cluster",
			description:
				"Illinois plus nearby reserve proposals keep the Midwest central to the registry's current reading path.",
		},
		south: {
			title: "Southern cluster",
			description:
				"The South currently carries the broadest mix of reserve, crossover, and enacted records in the published batch.",
		},
		west: {
			title: "Western cluster",
			description:
				"The West currently shows one high-significance reserve record with a failed end state.",
		},
	},
} satisfies {
	eyebrow: string;
	title: string;
	lead: string;
	buckets: Record<Region, ClusterBucketCopy>;
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

function mapClusterStates(
	states: ReadonlyArray<PublishedState>,
): Array<ClusterState> {
	return states.map((state) => ({
		...state,
		href: `/states/${state.slug}`,
	}));
}

function mapClusterBuckets<TBucket extends string>(
	groups: ReadonlyArray<StateGroup<TBucket>>,
	copy: Record<TBucket, ClusterBucketCopy>,
): Array<StatesClusterBucket<TBucket>> {
	return groups
		.filter((group) => group.count > 0)
		.map((group) => ({
			key: group.key,
			title: copy[group.key].title,
			description: copy[group.key].description,
			count: group.count,
			states: mapClusterStates(group.states),
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
	const statesIndexModel = buildStatesIndexModel(graphData);

	return {
		sections: [
			{
				key: "legislative-status",
				eyebrow: legislativeStatusClusterCopy.eyebrow,
				title: legislativeStatusClusterCopy.title,
				lead: legislativeStatusClusterCopy.lead,
				buckets: mapClusterBuckets(
					statesIndexModel.groups.byLegislativeStatusGroup,
					legislativeStatusClusterCopy.buckets,
				),
			},
			{
				key: "proposal-focus",
				eyebrow: proposalFocusClusterCopy.eyebrow,
				title: proposalFocusClusterCopy.title,
				lead: proposalFocusClusterCopy.lead,
				buckets: mapClusterBuckets(
					statesIndexModel.groups.byProposalFocus,
					proposalFocusClusterCopy.buckets,
				),
			},
			{
				key: "region",
				eyebrow: regionClusterCopy.eyebrow,
				title: regionClusterCopy.title,
				lead: regionClusterCopy.lead,
				buckets: mapClusterBuckets(
					statesIndexModel.groups.byRegion,
					regionClusterCopy.buckets,
				),
			},
		],
	};
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

export function getSortedPublishedStates(sortMode: StatesIndexSortMode) {
	return sortPublishedStates(getPublishedStates(), sortMode);
}
