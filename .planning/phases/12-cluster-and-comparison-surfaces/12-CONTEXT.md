---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 12-2026-04-11T21-58-38
generated_at: 2026-04-11T21:58:38.647Z
---

# Phase 12: Cluster and Comparison Surfaces - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning
**Mode:** Yolo

<domain>
## Phase Boundary

Phase 12 turns the ten-state published registry into clearer reader-facing cluster and
comparison reading paths. It should help readers browse grouped views by status, proposal
type, and region, and explain meaningful differences between states without leaving the
canonical source trail. This is a presentation and navigation phase over the existing
compiled registry data, not a new publication phase and not a refresh-queue phase.

</domain>

<decisions>
## Implementation Decisions

### Surface shape
- **D-01:** Add dedicated registry reading paths rather than bloating the current
  `/states` index into one mega-surface. The natural shape is a cluster route and a
  comparison route under the existing states subtree.
- **D-02:** Keep `/states` as the main gateway/index and use it to link into the new
  cluster/comparison reading paths, not to replace them.

### Cluster route
- **D-03:** The cluster surface should let readers browse grouped views by legislative
  status, proposal type/focus, and region using the existing ten-state graph.
- **D-04:** Clusters should stay editorial and card-led. Use grouped sections, short
  explanatory copy, and links to existing state detail pages rather than dense tables or
  dashboard widgets.

### Comparison route
- **D-05:** The comparison surface should be narrative and explanatory, highlighting a few
  meaningful comparisons from the current dataset rather than trying to compare every
  state equally.
- **D-06:** Reserve-heavy versus bond-side versus crossover records are the most important
  comparison frame because they connect directly to the project’s thesis.
- **D-07:** Comparison sections must cross-link back to the relevant state detail pages so
  the canonical record is always one click away.

### Data and model boundaries
- **D-08:** Reuse the ten-state compiled graph from Phases 10 and 11. Do not add new data
  sourcing, new state publication work, or refresh execution in this phase.
- **D-09:** Add any new grouping or comparison selectors in `src/lib/site/content.ts`
  rather than recomputing route-local cluster logic.

### UI boundaries
- **D-10:** Preserve the current warm, editorial registry tone. No tables-as-default, no
  scorecards, no leaderboard or dashboard feel, and no new top-level navigation item is
  required if local cross-links are sufficient.
- **D-11:** Mobile readability and simple scanability matter more than packing every
  possible comparison into one surface.

### the agent's Discretion
- Exact route names under `/states/` as long as they remain clear and nested under the
  current registry surface.
- Exact comparison section framing, as long as it stays tied to the current ten-state
  data and the reserve/bond/crossover thesis.
- Exact component split between new editorial components and route-local composition.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone and phase contract
- `.planning/PROJECT.md` — current milestone framing, validated requirements, and current
  scope boundaries.
- `.planning/REQUIREMENTS.md` — `SITE-07`, `SITE-08`, and `SITE-09` define the Phase 12
  requirement contract.
- `.planning/ROADMAP.md` — Phase 12 goal, success criteria, and sequence after the ten-state
  publication batch.
- `.planning/STATE.md` — current project position and lifecycle state.
- `.planning/phases/11-broader-national-publication-batch/11-01-SUMMARY.md` — exact
  shape of the ten-state published batch.
- `.planning/phases/11-broader-national-publication-batch/11-02-SUMMARY.md` — current
  confidence/completeness cue model already exposed on index and detail surfaces.

### Existing registry surfaces
- `src/routes/(site)/states/index.tsx` — current gateway/index surface for the published
  registry.
- `src/routes/(site)/states/[slug].tsx` — current state-detail destination that cluster
  and comparison surfaces must link back to.
- `src/components/editorial/StateCard.tsx` — current editorial state-card shell.
- `src/components/editorial/PageSection.tsx` — current section wrapper used across the site.
- `src/lib/site/navigation.tsx` and `src/components/editorial/SiteHeader.tsx` — current
  site-navigation boundaries if local cross-links need to plug into existing nav patterns.

### Data and read-model layer
- `src/lib/site/content.ts` — existing grouped/freshness/confidence selector layer.
- `src/lib/site/content.test.ts` — current unit-test surface for the shared site model.
- `generated/content-graph.json` — current ten-state published registry data.

### Repo and standards guidance
- `AGENTS.md` — repo-local orchestration and verification rules.
- `AGENTS.bright-builds.md` — Bright Builds workflow and standards routing.
- `standards-overrides.md` — no active overrides; use Bright Builds defaults.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/site/content.ts` already exposes grouped registry buckets and confidence cues,
  making it the right place to add cluster/comparison read models.
- `src/components/editorial/StateCard.tsx` already presents the state records in a calm,
  editorial way, so cluster sections should likely reuse it rather than invent a new data
  card language.
- `PageSection` and the existing states route structure already support sectional editorial
  layouts.

### Established Patterns
- Registry data flows from canonical content into the compiled graph and then into shared
  selectors before routes render anything.
- The public registry stays medium-density and explanatory rather than dashboard-like.
- Detail pages are still the canonical drill-down destination for any summarized or grouped
  registry surface.

### Integration Points
- New cluster/compare routes should sit under `src/routes/(site)/states/` so they remain
  part of the same registry subtree.
- Any new route-level models should be derived in `src/lib/site/content.ts` and tested in
  `src/lib/site/content.test.ts`.
- `/states` should gain clear links or preview hooks into the new surfaces without losing
  its role as the registry gateway.

</code_context>

<specifics>
## Specific Ideas

- A `/states/clusters` route should likely include three major sections: by status, by
  proposal focus/type, and by region.
- A `/states/compare` route should likely compare:
  - enacted/advanced reserve benchmarks
  - early-stage reserve proposals
  - crossover or bond-side records such as North Carolina and New Hampshire
- Comparison sections should stay text-led with selected example cards or links, not
  giant all-state tables.

</specifics>

<deferred>
## Deferred Ideas

- Refresh queue execution and freshness QA automation — Phase 13.
- Additional state publication batch work beyond the current ten-state set — later phase.
- Broader `mystic-ui` experimentation or visual-system shifts — backlog/future work.

</deferred>

---
*Phase: 12-cluster-and-comparison-surfaces*
*Context gathered: 2026-04-11*
