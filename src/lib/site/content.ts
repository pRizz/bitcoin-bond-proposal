import graph from "../../../generated/content-graph.json";

export type RegistryStatus = "unresearched" | "queued" | "published";
export type ProposalFocus = "bond" | "reserve" | "both" | "unknown";
export type EditorialPriority = "bond-priority" | "reserve-priority" | "neutral";
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
  proposalKind: "reserve" | "bond" | "both";
  proposalSubtype: string;
  billId: string;
  chamber: string;
  status: string;
  statusAsOf: string;
  lastReviewed: string;
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
};

type ContentGraph = {
  docs: GraphDocument[];
  states: GraphState[];
  registry: {
    manifest: {
      states: GraphManifestEntry[];
    };
    publishedSlugs: string[];
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

export function getPublishedStates() {
  const manifestBySlug = new Map(
    contentGraph.registry.manifest.states.map((entry) => [entry.slug, entry] as const),
  );

  return [...contentGraph.states]
    .map((state) => ({
      ...state,
      manifest: manifestBySlug.get(state.slug),
    }))
    .sort((left, right) => {
      const leftPriority = priorityWeight[left.manifest?.editorialPriority ?? "neutral"];
      const rightPriority = priorityWeight[right.manifest?.editorialPriority ?? "neutral"];

      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority;
      }

      return left.state.localeCompare(right.state);
    });
}

export function getStateBySlug(slug: string) {
  const manifestEntry = contentGraph.registry.manifest.states.find(
    (entry) => entry.slug === slug,
  );
  const stateEntry = contentGraph.states.find((entry) => entry.slug === slug);

  if (!stateEntry) {
    return undefined;
  }

  return {
    ...stateEntry,
    manifest: manifestEntry,
  };
}

export function getRegistryStats() {
  const publishedStates = getPublishedStates();

  return {
    publishedCount: publishedStates.length,
    bondPriorityCount: publishedStates.filter(
      (state) => state.manifest?.editorialPriority === "bond-priority",
    ).length,
    reservePriorityCount: publishedStates.filter(
      (state) => state.manifest?.editorialPriority === "reserve-priority",
    ).length,
    latestReview: publishedStates
      .map((state) => state.lastReviewed)
      .sort((left, right) => right.localeCompare(left))[0],
  };
}
