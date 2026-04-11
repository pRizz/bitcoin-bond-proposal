---
phase: 12-cluster-and-comparison-surfaces
plan: "01"
subsystem: registry-ui
tags: [bun, solidstart, site-content, editorial-registry, cluster-surface]
requires: [10-02, 11-01, 11-02]
provides:
  - Shared `getStatesClusterModel()` read-model for status, proposal focus, and regional browsing.
  - Dedicated `/states/clusters` route with editorial grouped reading lanes.
  - Lightweight `/states` gateway copy that points readers into grouped browsing without changing the base registry surface.
affects: [12-02, phase-13]
tech-stack:
  added: []
  patterns: [shared-cluster-read-model, editorial-cluster-route, card-led-grouped-browsing]
key-files:
  created:
    - src/routes/(site)/states/clusters.tsx
  modified:
    - src/lib/site/content.ts
    - src/lib/site/content.test.ts
    - src/routes/(site)/states/index.tsx
key-decisions:
  - "Keep cluster titles, leads, and bucket copy in the shared site selector so routes consume one editorial model instead of reassembling labels locally."
  - "Reuse StateCard on `/states/clusters` so grouped browsing stays inside the existing editorial registry shell and every entry still lands on the canonical state detail route."
  - "Add only a lightweight CTA on `/states` so the registry remains the gateway rather than becoming a dashboard."
patterns-established:
  - "Cluster routes should consume `getStatesClusterModel()` rather than rebuilding grouped buckets in route code."
  - "Grouped registry browse surfaces stay card-led and cross-link back to `/states/[slug]` canonical pages."
requirements-completed: [SITE-07]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 12-2026-04-11T21-58-38
generated_at: 2026-04-11T22:17:14Z
duration: 5m
completed: 2026-04-11
---

# Phase 12 Plan 01: Cluster and Comparison Surfaces Summary

**Shared cluster read-model plus a new `/states/clusters` route now lets readers browse the ten-state registry by status, focus, and region without bloating the base catalog**

## Performance

- **Duration:** 5m
- **Started:** 2026-04-11T17:12:55-05:00
- **Completed:** 2026-04-11T17:17:14-05:00
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Added a shared `buildStatesClusterModel()` / `getStatesClusterModel()` selector that turns the compiled ten-state registry into editorial sections for legislative status, proposal focus, and region.
- Expanded `src/lib/site/content.test.ts` with TDD coverage proving the cluster surface reuses the shared grouped registry model and keeps canonical state detail links.
- Built a new `/states/clusters` route that renders grouped reading lanes with reusable state cards and links back to `/states/[slug]`.
- Added a lightweight gateway CTA on `/states` so grouped browsing is discoverable without changing the existing catalog controls or card grid.

## Verification

- `bun run format:check`
- `bun run lint`
- `bun test src/lib/site/content.test.ts`
- `bun run build`

## Task Commits

Each task was committed atomically:

1. **Task 1: Add a shared cluster-route model with unit coverage**
   - `9e4e0d4` `test(12-01): add failing cluster model coverage`
   - `57c9334` `feat(12-01): add shared states cluster model`
2. **Task 2: Build the dedicated `/states/clusters` route**
   - `a0a5317` `feat(12-01): add states cluster route`
3. **Task 3: Add gateway links from the existing states index**
   - `ece50df` `feat(12-01): link states index to cluster route`

## Files Created/Modified

- `src/lib/site/content.ts` - adds cluster section types, editorial bucket copy, and the shared `getStatesClusterModel()` selector built from the existing grouped registry model.
- `src/lib/site/content.test.ts` - locks the cluster model to shared group data, canonical detail links, and route-ready section structure.
- `src/routes/(site)/states/clusters.tsx` - renders the new grouped browsing surface with reusable state cards and editorial section framing.
- `src/routes/(site)/states/index.tsx` - adds a lightweight CTA into `/states/clusters` without changing the existing catalog behavior.

## Decisions Made

- Kept all cluster copy in the functional core so the route remains a thin consumer and future grouped surfaces can reuse the same labels and explanations.
- Reused `StateCard` for cluster entries instead of inventing a second card grammar for grouped browsing.
- Preserved `/states` as the registry gateway and surfaced the cluster route through one explanatory CTA rather than more filters, chips, or summary widgets.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- `src/lib/site/content.ts:242` - The unused `proposalFocus: "unknown"` bucket keeps exhaustive editorial copy for type coverage even though zero-count groups are filtered out of the cluster surface.

## Issues Encountered

- The first Task 2 commit attempt failed because Biome wanted the new route reformatted. Running the repo formatter and retrying the same commit resolved it immediately.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 12-02 can build comparison storytelling on top of the same ten-state registry and the new cluster-route model pattern.
- The registry now has both a base gateway and a dedicated grouped reading path without introducing dashboard drift.

---
*Phase: 12-cluster-and-comparison-surfaces*
*Completed: 2026-04-11*
