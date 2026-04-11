---
phase: 10-coverage-expansion-contract-and-data-shape
plan: "02"
subsystem: site-content
tags: [bun, content-graph, site-selectors, solidstart, editorial-registry]
requires: [10-01]
provides:
  - Compiled graph buckets and freshness facts for region, proposal focus, and legislative status.
  - Shared grouped and freshness-aware selectors for registry consumers.
  - Thin states-index consumption of the shared index model with focus, region, status, and freshness cues.
affects: [phase-11, phase-12, phase-13]
tech-stack:
  added: []
  patterns: [compile-time-derived-read-model, pure-selector-helpers, thin-route-consumer]
key-files:
  created:
    - src/lib/site/content.test.ts
  modified:
    - scripts/compile-content.ts
    - generated/content-graph.json
    - src/lib/site/content.ts
    - src/routes/(site)/states/index.tsx
key-decisions:
  - "Derive review-age and status-age facts in compile rather than in route code."
  - "Expose one shared states index model so routes do not rejoin manifest data or regroup states ad hoc."
  - "Keep the states index editorial and medium-density while surfacing focus, region, status, and freshness cues."
patterns-established:
  - "Compile output now carries grouped registry buckets and stable same-day freshness timestamps."
  - "Site consumers use pure selector helpers over the compiled graph instead of route-local grouping logic."
requirements-completed: [CATA-08]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 10-2026-04-11T18-51-47
generated_at: 2026-04-11T20:00:00Z
duration: 9m
completed: 2026-04-11
---

# Phase 10 Plan 02: Coverage Expansion Contract and Data Shape Summary

**Grouped registry compile output, shared index-model selectors, and a thin states-index consumer**

## Performance

- **Duration:** 9m
- **Started:** 2026-04-11T19:46:00Z
- **Completed:** 2026-04-11T20:00:00Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- Propagated region, legislative-status, and freshness data through the compile layer and
  generated content graph.
- Added a shared grouped and freshness-aware selector layer, including a single
  `getStatesIndexModel()` read model for the registry route.
- Switched the states index to the shared selector model and added lightweight focus,
  region, status, and freshness cues without turning the page into a dashboard.

## Task Commits

Each task was committed atomically:

1. **Task 1: Propagate the strengthened contract through validation and compile** -
   `8518dd0` (`feat`), `cbe18dd` (`fix`)
2. **Task 2: Add shared grouped and freshness-aware selectors with unit coverage** -
   `96fa175` (`test`), `d11b9f4` (`feat`)
3. **Task 3: Make the states index a thin proof consumer of the stronger read model** -
   `8689193` (`feat`)

## Files Created/Modified

- `scripts/compile-content.ts` - derives region, legislative-status, and freshness facts
  plus registry group buckets at compile time.
- `generated/content-graph.json` - carries the new grouped and freshness-aware read
  model used by site consumers.
- `src/lib/site/content.ts` - adds pure grouped/freshness selector helpers and
  `getStatesIndexModel()`.
- `src/lib/site/content.test.ts` - covers grouped buckets, freshness summaries, and the
  states-index selector contract.
- `src/routes/(site)/states/index.tsx` - consumes the shared selector model and exposes
  lightweight focus, region, status, and freshness cues.

## Decisions Made

- Kept freshness derivation in compile rather than calculating age facts in route code.
- Made `getStatesIndexModel()` the thin route boundary so later comparison surfaces can
  build on shared selector logic.
- Preserved explicit proposal focus browsing while adding region and legislative-status
  proof cues for `CATA-08`.

## Deviations from Plan

None - the plan remained structural and did not pull in publication-batch or comparison
page work.

## Issues Encountered

- The tracked compiled graph would drift on same-day rebuilds if freshness timestamps used
  the full current time. I fixed that by stabilizing the compile freshness stamp to the
  compile day so repeated hook/build runs stay deterministic.

## User Setup Required

None - no external services or local environment changes are needed.

## Next Phase Readiness

- The compiled graph now exposes grouped and freshness-aware registry data for downstream
  phases.
- Shared site selectors prove the contract without route-local regrouping.
- Phase-level verification can now check the structural goal end to end before Phase 11
  builds on the new contract.
