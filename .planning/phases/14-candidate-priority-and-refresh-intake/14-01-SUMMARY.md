---
phase: 14-candidate-priority-and-refresh-intake
plan: 01
subsystem: content
tags: [zod, content-data, candidate-intake, bun-test]
requires:
  - phase: 13-refresh-workflow-and-freshness-qa
    provides: published refresh queue and generated refresh artifact boundary
provides:
  - parsed candidate intake schema and TypeScript types
  - seven-row controlled candidate intake snapshot
  - candidate intake boundary documentation
affects: [phase-14-candidate-priority, phase-15-publication-wave]
tech-stack:
  added: []
  patterns: [zod-boundary-parser, controlled-content-data]
key-files:
  created:
    - content/data/state-candidate-intake.json
  modified:
    - src/lib/content/schema.ts
    - src/lib/content/schema.test.ts
    - content/data/README.md
key-decisions:
  - "Candidate intake is controlled maintainer data under content/data, not public state content."
  - "Ready-to-author candidate rows require official source availability and an official source URL."
  - "Deferred candidate rows require an explicit deferral reason."
patterns-established:
  - "Parse candidate intake through Zod before priority logic consumes it."
  - "Keep unpublished candidate records out of content/states during Phase 14."
requirements-completed: [CATA-10, REFR-06]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 14-2026-05-27T13-54-27
generated_at: 2026-05-27T14:30:19Z
duration: 12min
completed: 2026-05-27
---

# Phase 14 Plan 01: Candidate Intake Contract Summary

**Zod-validated candidate intake data with a seven-state unpublished candidate snapshot**

## Performance

- **Duration:** 12 min
- **Started:** 2026-05-27T14:18:00Z
- **Completed:** 2026-05-27T14:30:19Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Added `parseStateCandidateIntake` plus candidate intake schemas and exported types.
- Seeded seven unpublished candidate rows for Florida, Ohio, Kansas, North Dakota, South Dakota, Wyoming, and Utah.
- Documented that `state-candidate-intake.json` is controlled maintainer input, not canonical public state content.
- Verified that Phase 14 did not create or modify `content/states/*.md`.

## Task Commits

Task changes are currently staged for the phase-level implementation history; no per-task commit was created before the phase verification gate.

## Files Created/Modified

- `src/lib/content/schema.ts` - Candidate intake schemas, inferred types, and parser.
- `src/lib/content/schema.test.ts` - Parser tests for official-source readiness, secondary-only rejection, deferral reasons, and terminal source-rich candidates.
- `content/data/state-candidate-intake.json` - Seven-row unpublished candidate intake snapshot.
- `content/data/README.md` - Candidate intake boundary note.

## Decisions Made

- Candidate intake lives in `content/data/state-candidate-intake.json` to keep the maintainer source reviewable without creating public state pages.
- `ready-to-author` rows require official-source availability and `officialSourceUrl`.
- `defer` rows require `deferralReason`.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 14-02 can build the pure priority model from the parsed `StateCandidateIntakeEntry` type and seeded intake data.

---

*Phase: 14-candidate-priority-and-refresh-intake*
*Completed: 2026-05-27*
