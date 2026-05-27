---
phase: 14-candidate-priority-and-refresh-intake
plan: 02
subsystem: content
tags: [candidate-priority, pure-model, bun-test]
requires:
  - phase: 14-candidate-priority-and-refresh-intake
    provides: parsed candidate intake schema and data
provides:
  - pure candidate priority model
  - combined published-refresh plus candidate-priority model
  - unit tests for sorting, authorability, freshness risk, and summary counts
affects: [phase-14-refresh-generator, phase-15-publication-wave]
tech-stack:
  added: []
  patterns: [functional-core, deterministic-sort, generated-artifact-model]
key-files:
  created:
    - src/lib/site/candidate-priority.ts
    - src/lib/site/candidate-priority.test.ts
  modified: []
key-decisions:
  - "Candidate freshness risk uses 45-day aging and 90-day stale thresholds."
  - "Candidate sorting is readiness, source strength, proposal relevance, then state name."
  - "Combined priority preserves existing published refresh queue ordering."
patterns-established:
  - "Keep candidate priority as a pure data-in/data-out model."
  - "Use exact ordered-array tests for priority ranking behavior."
requirements-completed: [CATA-10, CATA-11, REFR-04]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 14-2026-05-27T13-54-27
generated_at: 2026-05-27T14:32:09Z
duration: 7min
completed: 2026-05-27
---

# Phase 14 Plan 02: Candidate Priority Model Summary

**Pure candidate-priority and combined refresh/candidate queue models with focused unit coverage**

## Performance

- **Duration:** 7 min
- **Started:** 2026-05-27T14:25:00Z
- **Completed:** 2026-05-27T14:32:09Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Added `buildCandidatePriorityModel` for authorability, status age, freshness risk, reasons, and deterministic ranking.
- Added `buildCombinedPriorityQueueModel` that preserves published refresh entries while exposing first-publication candidates.
- Covered readiness ordering, source-strength ties, terminal source-rich authorability, secondary-only exclusion, freshness risk thresholds, and combined summary counts.

## Task Commits

Task changes are currently staged for the phase-level implementation history; no per-task commit was created before the phase verification gate.

## Files Created/Modified

- `src/lib/site/candidate-priority.ts` - Pure candidate priority and combined queue model.
- `src/lib/site/candidate-priority.test.ts` - Unit tests for candidate model behavior and combined queue counts.

## Decisions Made

- Candidate freshness risk derives from `statusAsOf` against `generatedAt` with 45-day aging and 90-day stale thresholds.
- Existing published refresh order is preserved in the combined queue; candidate sorting only affects the first-publication subqueue.
- `sourceBoundary` is part of the combined model to prevent candidate intake from being mistaken for canonical public content.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 14-03 can wire the pure model into `scripts/build-refresh-queue.ts` and generate combined priority artifacts under `generated/refresh/`.

---

*Phase: 14-candidate-priority-and-refresh-intake*
*Completed: 2026-05-27*
