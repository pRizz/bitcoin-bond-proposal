import type {
	LegislativeStatusGroup,
	ProposalFocus,
	Region,
} from "../content/schema";
import type { PublishedState, StateGroup, StatesIndexModel } from "./content";

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

export type ComparisonSectionKey =
	| "reserve-benchmarks"
	| "crossover-records"
	| "bond-side-signals";

export type ComparisonState = PublishedState & {
	href: string;
};

export type StatesComparisonSection = {
	key: ComparisonSectionKey;
	eyebrow: string;
	title: string;
	lead: string;
	comparison: string;
	featuredStates: ComparisonState[];
	supportingStates: ComparisonState[];
};

export type StatesComparisonModel = {
	sections: StatesComparisonSection[];
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

function mapComparisonStates(
	statesBySlug: ReadonlyMap<string, PublishedState>,
	slugs: ReadonlyArray<string>,
): Array<ComparisonState> {
	return slugs.flatMap((slug) => {
		const maybeState = statesBySlug.get(slug);

		return maybeState
			? [{ ...maybeState, href: `/states/${maybeState.slug}` }]
			: [];
	});
}

export function buildStatesClusterModelFromIndexModel(
	statesIndexModel: StatesIndexModel,
): StatesClusterModel {
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

export function buildStatesComparisonModelFromIndexModel(
	statesIndexModel: StatesIndexModel,
): StatesComparisonModel {
	const statesBySlug = new Map(
		statesIndexModel.states.map((state) => [state.slug, state] as const),
	);

	return {
		sections: [
			{
				key: "reserve-benchmarks",
				eyebrow: "Reserve path",
				title:
					"Reserve benchmarks now split between enacted, advanced, and earlier-stage signals",
				lead: "Texas is the enacted benchmark, while Missouri, Oklahoma, and Michigan show what reserve-side bills look like once they move beyond filing and toward committee or chamber action.",
				comparison:
					"Maryland and South Carolina still illustrate the introduced edge of the reserve lane, and Arizona remains instructive because it reached a vetoed end state instead of disappearing into ambiguity. Taken together, the reserve-side record now shows distance between filing, advancement, failure, and enactment without pretending the current batch is a ranking table.",
				featuredStates: mapComparisonStates(statesBySlug, [
					"texas",
					"missouri",
					"oklahoma",
					"michigan",
				]),
				supportingStates: mapComparisonStates(statesBySlug, [
					"maryland",
					"south-carolina",
					"arizona",
				]),
			},
			{
				key: "crossover-records",
				eyebrow: "Crossover records",
				title: "Two records connect reserve policy back to financing structure",
				lead: "North Carolina and Illinois matter because they keep reserve policy tied to a broader financing or packet-level frame instead of treating bitcoin accumulation as a stand-alone headline.",
				comparison:
					"North Carolina is the clearest legislative crossover in the published batch because the bill itself contemplates bitcoin-backed bond use. Illinois remains the flagship descriptive record that points readers back toward the normative packet without collapsing the public registry into advocacy copy.",
				featuredStates: mapComparisonStates(statesBySlug, [
					"north-carolina",
					"illinois",
				]),
				supportingStates: [],
			},
			{
				key: "bond-side-signals",
				eyebrow: "Bond-side signals",
				title:
					"Bond-side evidence is still narrow, which makes each official signal count",
				lead: "The current registry does not yet have a deep bond-side bench, so New Hampshire and North Carolina do outsized comparison work for anyone tracing how reserve arguments move toward financing structure.",
				comparison:
					"New Hampshire stands apart because it is an authority-action approval rather than a legislature-filed bill, while North Carolina shows the legislative version of the same financing-aware instinct. That distinction matters: the bond-side story is still real, but it is materially thinner than the reserve-bill lane.",
				featuredStates: mapComparisonStates(statesBySlug, [
					"new-hampshire",
					"north-carolina",
				]),
				supportingStates: [],
			},
		],
	};
}
