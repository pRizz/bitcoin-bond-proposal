---
phase: 17-expanded-surface-qa-and-closeout-prep
plan: 01
subsystem: ui
tags:
  - registry-surfaces
  - closeout-qa
  - tests
requires:
  - phase: 16-throughput-expansion-and-deferral-ledger
    provides: Source-gated 17-state registry, generated graph refresh, and zero candidate outcome
provides:
  - Active closeout copy updated to describe seventeen published state-detail pages
  - Catalog empty-state copy hardened without changing the existing StateCard pattern
  - Regression tests for stale registry count terms and representative detail freshness/provenance fields
affects:
  - phase-17-closeout
  - state-registry
tech-stack:
  added: []
  patterns:
    - Derived registry counts
    - Closeout stale-copy regression
    - Representative detail data checks
key-files:
  created: []
  modified:
    - .planning/PROJECT.md
    - src/routes/(site)/states/index.tsx
    - src/lib/site/content.test.ts
key-decisions:
  - Removed stale current-state count copy from project closeout context instead of updating historical phase evidence.
  - Preserved the derived count and StateCard route pattern on `/states`.
  - Expanded focused regression coverage to current project/surface files and representative detail lookups.
patterns-established:
  - Active registry surface copy should be scanned for stale hard-coded count terms while archived phase evidence remains historical.
  - Representative detail coverage should use `getStateBySlug()` through the canonical graph path instead of route-specific exceptions.
requirements-completed:
  - SITE-10
  - SITE-11
  - SITE-12
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 17-2026-06-02T21-06-55
generated_at: 2026-06-02T21:48:21Z
duration: 8 min
completed: 2026-06-02
---

# Phase 17 Plan 01: Expanded Surface QA Summary

**Active registry surfaces now describe the 17-state publication set and carry focused tests against stale count copy, broken canonical links, and missing detail freshness context.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-06-02T21:40:21Z
- **Completed:** 2026-06-02T21:48:21Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- Updated current project closeout copy from fifteen to seventeen published state-detail pages.
- Replaced the catalog empty state with clearer filter recovery copy while keeping derived counts and the existing StateCard grid.
- Added focused regression coverage for stale count terms and representative South Dakota, Wyoming, and Texas detail records.
- Verified the work stayed narrow: no package changes, no generated content changes, and no deferred UI scope was introduced.

## Task Commits

1. **Task 1: Remove stale count and unclear empty-state copy** - `fe85545` docs(17-01): remove stale registry surface copy
2. **Task 2: Add focused regression coverage for expanded surface assumptions** - `48a0dd8` test(17-01): cover expanded registry surface assumptions
3. **Task 3: Verify Phase 17 surface hardening stays narrow** - verification-only task, no separate code commit

## Files Created/Modified

- `.planning/PROJECT.md` - Current milestone project copy now reflects seventeen published state-detail pages.
- `src/routes/(site)/states/index.tsx` - Catalog empty-state heading and body now match the Phase 17 UI contract.
- `src/lib/site/content.test.ts` - Stale-copy scan and representative detail assertions cover the expanded registry surface assumptions.

## Verification

- `bun run validate:content` - PASS, validated 4 documents, 50 manifest state entries, and 17 published state entries.
- `bunx tsc --noEmit` - PASS.
- `bun test src/lib/site/content.test.ts` - PASS, 14 tests and 74 assertions.
- Deferred-scope scan for `mystic-ui`, `comparison matrix`, `advanced filter`, `advanced filtering`, and `search input` - PASS, no matches in package files or state route/model files.
- Package/generated boundary check for `package.json`, `bun.lock`, `content/states`, and `content/data/state-registry-manifest.json` - PASS, no diffs.

## Decisions Made

- Kept archived milestone evidence untouched because older counts remain historically valid.
- Treated `.planning/PROJECT.md` as active closeout context and included it in stale-copy regression coverage.
- Proved South Dakota, Wyoming, and Texas detail readiness through shared content accessors instead of introducing route-specific branches.

## Deviations from Plan

None - plan executed exactly as written.

**Total deviations:** 0 auto-fixed.
**Impact on plan:** No scope creep; the plan stayed limited to copy, focused tests, and verification.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Ready for `17-02-PLAN.md`, which owns the full command ladder, generated artifact evidence, browser QA, and closeout evidence.

*Phase: 17-expanded-surface-qa-and-closeout-prep*
*Completed: 2026-06-02*
