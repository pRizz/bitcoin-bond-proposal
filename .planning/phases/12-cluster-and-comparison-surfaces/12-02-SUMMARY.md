---
phase: 12-cluster-and-comparison-surfaces
plan: "02"
subsystem: registry-ui
tags: [bun, solidstart, site-content, editorial-registry, comparison-surface]
requires: [12-01]
provides:
  - Shared `getStatesComparisonModel()` read-model for reserve-benchmark, crossover, and bond-side comparison sections.
  - Dedicated `/states/compare` route with narrative comparison sections and links back to canonical state detail pages.
  - Lightweight `/states` gateway copy that points readers into the comparison surface.
affects: [phase-13]
tech-stack:
  added: []
  patterns: [shared-comparison-read-model, editorial-comparison-route, selective-comparison-sections]
key-files:
  created:
    - src/routes/(site)/states/compare.tsx
  modified:
    - src/lib/site/content.ts
    - src/lib/site/content.test.ts
    - src/lib/site/states-surfaces.ts
    - src/routes/(site)/states/index.tsx
key-decisions:
  - "Keep the comparison model selective and narrative, not matrix-like, by centering reserve benchmarks, crossover records, and bond-side signals."
  - "Place comparison-route model logic in `src/lib/site/states-surfaces.ts` so cluster and comparison editorial framing stays out of `content.ts` proper."
  - "Add only a lightweight gateway link on `/states` so the base registry index stays readable and does not collapse into the comparison surface."
patterns-established:
  - "Comparison routes should consume `getStatesComparisonModel()` rather than building narrative pairings inside route code."
  - "Comparison sections stay one click away from canonical `/states/[slug]` detail records."
requirements-completed: [SITE-08, SITE-09]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 12-2026-04-11T21-58-38
generated_at: 2026-04-11T22:24:00Z
duration: 8m
completed: 2026-04-11
---

# Phase 12 Plan 02: Cluster and Comparison Surfaces Summary

**Shared comparison read-model plus a new `/states/compare` route now explains the ten-state registry through reserve, crossover, and bond-side reading paths**

## Performance

- **Duration:** 8m
- **Started:** 2026-04-11T22:14:00Z
- **Completed:** 2026-04-11T22:24:00Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments

- Added a shared comparison-route model in the site-content layer, backed by focused
  tests proving the route stays selective, narrative, and linked back to canonical detail
  pages.
- Created a dedicated `/states/compare` route that explains meaningful differences across
  reserve benchmarks, crossover records, and bond-side signals using editorial sections
  rather than a matrix or leaderboard.
- Added a small gateway link from `/states` into the new comparison route while
  preserving the base registry page as the main entry point.

## Verification

- `bun run format:check`
- `bun run lint`
- `bun test src/lib/site/content.test.ts`
- `bun run build`

## Task Commits

Each task was committed atomically:

1. **Task 1: Add a shared comparison-route model with unit coverage**
   - `3d07142` `test(12-02): add failing comparison model coverage`
   - `6305b78` `feat(12-02): add shared states comparison model`
2. **Task 2: Build the dedicated `/states/compare` route**
   - `bf59775` `feat(12-02): add states comparison route`
3. **Task 3: Add gateway links from the existing states index into the comparison route**
   - `e29d918` `feat(12-02): link states index to comparison route`

## Files Created/Modified

- `src/lib/site/states-surfaces.ts` - centralizes the editorial cluster and comparison
  route models outside the lower-level content graph access layer.
- `src/lib/site/content.ts` - exports the shared comparison model from the site-content
  layer.
- `src/lib/site/content.test.ts` - adds comparison-model coverage for section framing and
  canonical detail links.
- `src/routes/(site)/states/compare.tsx` - renders the new narrative comparison surface.
- `src/routes/(site)/states/index.tsx` - links readers into the comparison route without
  changing the base index role.

## Decisions Made

- Kept the comparison route selective by centering three editorial frames instead of
  trying to compare every state equally.
- Reused `StateCard` and `ActionLink` so the new comparison route still feels like part of
  the existing registry shell.
- Kept `/states` as the gateway and made comparison discoverable through one concise CTA.

## Deviations from Plan

None - the comparison work stayed within the route and shared-model boundary and did not
pull in refresh features or additional publication work.

## Issues Encountered

- The original executor got stuck after landing the Task 1 test commit, but it had
  already outlined the comparison-model direction. I completed the remaining model,
  compare route, and gateway-link work inline and preserved the intended task-granular
  commit history.

## User Setup Required

None - no external services or local environment changes are required.

## Next Phase Readiness

- Phase 12 now has both the grouped cluster route and the narrative comparison route.
- The registry reading paths all still link back to the canonical state detail pages.
- Phase 13 can now focus purely on refresh queue and freshness QA work rather than needing
  more comparison-surface scaffolding.
