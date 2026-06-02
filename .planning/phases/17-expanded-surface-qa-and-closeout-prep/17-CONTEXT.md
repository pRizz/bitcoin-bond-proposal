---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 17-2026-06-02T21-06-55
generated_at: 2026-06-02T21:07:03Z
---

# Phase 17: Expanded Surface QA and Closeout Prep - Context

**Gathered:** 2026-06-02  
**Status:** Ready for planning  
**Mode:** Yolo

<domain>

## Phase Boundary

Phase 17 verifies and tightens the public registry surfaces after the v1.3 expansion to a seventeen-state registry, then records closeout evidence for the milestone. It owns `/states`, `/states/clusters`, `/states/compare`, state-detail consistency, generated refresh/candidate artifacts, browser spot checks, and final milestone evidence. It does not publish new state records, add advanced filtering, run a wholesale visual redesign, or adopt broad component/library changes.

</domain>

<decisions>

## Implementation Decisions

### Catalog scanability

- **D-01:** Preserve the existing medium-density `/states` catalog pattern and shared `StateCard` component. The QA pass should protect confidence, completeness, freshness, status, proposal-type, region, and drill-down cues instead of redesigning the catalog.
- **D-02:** Prefer derived counts and generated model data over hard-coded public-count copy wherever the route already has access to `getStatesIndexModel()` or `getRegistryStats()`.
- **D-03:** Treat stale count copy, missing generated data, broken links, awkward mobile wrapping, and unclear empty/filter states as Phase 17 defects.

### Cluster and comparison routes

- **D-04:** Keep `/states/clusters` as an editorial grouping surface by legislative posture, proposal focus, and region. Update grouping copy only where the expanded seventeen-state mix makes existing language stale or misleading.
- **D-05:** Keep `/states/compare` narrative and selective. Do not turn it into a ranking table or full matrix in this phase.
- **D-06:** Every card, supporting-state link, and cross-route call to action on cluster and comparison routes must route to the canonical state-detail path or the known registry sibling route.

### State-detail consistency

- **D-07:** New and existing detail pages should continue through the canonical content graph path and expose the same provenance, status, record footing, freshness, and comparison context affordances.
- **D-08:** Detail-page work should be consistency-focused: fix missing context or confusing surface copy, but avoid creating state-specific route exceptions beyond the existing Illinois packet distinction.

### Verification and closeout evidence

- **D-09:** Verification must cover content validation, content compilation, refresh/candidate generation, TypeScript, production build, tests, and targeted browser checks across catalog, cluster, comparison, and representative detail pages.
- **D-10:** Closeout records should name the final v1.3 published count, shipped states added during the milestone, the current empty deferral/candidate outcome, and the verification evidence. The record should be suitable for milestone archive/audit use.
- **D-11:** Browser QA should be targeted and evidence-driven, not a broad visual redesign exercise. Use representative desktop and mobile checks that prove pages render, key links work, and text remains readable without overlap.

### the agent's Discretion

- Choose the smallest route or model copy edits needed to remove stale assumptions.
- Decide the exact browser viewport set and representative state detail pages, as long as newly added Phase 16 states and at least one older benchmark state are covered.
- Add focused tests where pure model behavior or link assumptions need protection; otherwise rely on existing tests plus browser/build verification.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and requirements

- `.planning/ROADMAP.md` — Phase 17 goal, dependencies, and success criteria.
- `.planning/REQUIREMENTS.md` — SITE-10, SITE-11, SITE-12, QA-01, and QA-02 acceptance criteria.
- `.planning/PROJECT.md` — v1.3 product constraints, current seventeen-state registry state, out-of-scope UI expansion, and source/freshness trust model.
- `.planning/phases/16-throughput-expansion-and-deferral-ledger/16-VERIFICATION.md` — Phase 16 evidence that South Dakota and Wyoming published, candidate intake is empty, and Phase 17 owns browser-surface QA.
- `.planning/phases/16-throughput-expansion-and-deferral-ledger/16-02-SUMMARY.md` — Generated artifact and verification summary feeding Phase 17.

### Registry implementation surfaces

- `src/routes/(site)/states/index.tsx` — Public catalog route, filters, sort control, freshness panel, and `StateCard` grid.
- `src/routes/(site)/states/clusters.tsx` — Cluster reading route and canonical-card drill-down behavior.
- `src/routes/(site)/states/compare.tsx` — Comparison route and supporting-state links.
- `src/routes/(site)/states/[slug].tsx` — Canonical state-detail surface and provenance/freshness side rail.
- `src/lib/site/content.ts` — Generated graph adapter, registry stats, confidence cues, freshness cues, and state lookup helpers.
- `src/lib/site/states-surfaces.ts` — Cluster and comparison model copy, selected comparison states, and link model construction.
- `src/components/editorial/StateCard.tsx` — Shared card used across catalog, cluster, and comparison surfaces.
- `src/components/editorial/RegistryFreshnessPanel.tsx` — Shared freshness panel used across registry surfaces.

### Generated and canonical data

- `generated/content-graph.json` — Current compiled seventeen-state public graph.
- `generated/refresh/state-refresh-queue.json` — Current generated refresh queue.
- `generated/refresh/state-priority-queue.json` — Current generated priority queue with zero first-publication candidates.
- `content/data/state-registry-manifest.json` — Canonical manifest source for published registry rows.
- `content/data/state-candidate-intake.json` — Controlled non-public candidate/deferral ledger.

### Standards and workflow

- `AGENTS.md` — Repo-local Bright Builds instruction entrypoint.
- `AGENTS.bright-builds.md` — Bright Builds default workflow and owner-specific rules.
- `standards-overrides.md` — Local standards override file; no active real overrides are currently defined.

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `StateCard` already carries bill ID, state, status, proposal badge, summary, record footing, significance, status date, and review date. It should stay the common registry card primitive for Phase 17.
- `RegistryFreshnessPanel` already gives generated date, latest review, and current/review-soon/review-due counts. It should stay present on catalog, cluster, and comparison surfaces.
- `ActionLink` already handles cross-route CTAs consistently.

### Established Patterns

- Public registry surfaces consume generated graph data through `src/lib/site/content.ts` rather than reading authored Markdown directly in each route.
- Cluster and comparison routes derive links as `/states/${slug}` from shared model builders.
- The product copy keeps snapshot-based caution visible and avoids live-tracker language.
- Existing tests cover content graph counts, stale count terms, grouped models, comparison model integrity, freshness behavior, and candidate-priority edge cases.

### Integration Points

- Route copy and browser QA connect through `src/routes/(site)/states/index.tsx`, `src/routes/(site)/states/clusters.tsx`, `src/routes/(site)/states/compare.tsx`, and `src/routes/(site)/states/[slug].tsx`.
- Model-level changes connect through `src/lib/site/content.ts` and `src/lib/site/states-surfaces.ts`.
- Closeout evidence connects through Phase 17 planning artifacts and later milestone archive/audit files.

</code_context>

<specifics>

## Specific Ideas

- Keep the calm editorial route structure from v1.2 and v1.3. Expanded-count QA should make the existing experience sturdier, not flashier.
- The final surface QA should explicitly include South Dakota and Wyoming because they were added immediately before this phase.
- Browser checks should include desktop and mobile coverage for `/states`, `/states/clusters`, `/states/compare`, `/states/south-dakota`, `/states/wyoming`, and one older benchmark such as `/states/texas` or `/states/illinois`.

</specifics>

<deferred>

## Deferred Ideas

- Advanced filtering or matrix-style comparison remains future requirement SITE-13, not Phase 17 scope.
- Selective `mystic-ui` or broad theme upgrades remain future requirement UI-01/backlog Phase 999.1, not Phase 17 scope.
- Additional state publication beyond the current seventeen-state registry belongs in a future coverage phase unless a blocking data defect is discovered.

</deferred>

*Phase: 17-expanded-surface-qa-and-closeout-prep*  
*Context gathered: 2026-06-02*
