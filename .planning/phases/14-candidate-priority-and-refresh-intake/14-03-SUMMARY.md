---
phase: 14-candidate-priority-and-refresh-intake
plan: 03
subsystem: generated-refresh
tags: [refresh-queue, candidate-priority, generated-artifacts, precommit]
requires:
  - phase: 14-candidate-priority-and-refresh-intake
    provides: parsed candidate intake schema and candidate priority model
provides:
  - combined state priority queue generator wiring
  - machine-readable state priority queue artifact
  - maintainer-readable state priority queue artifact
  - generated artifact boundary documentation
affects: [phase-15-publication-wave]
tech-stack:
  added: []
  patterns: [imperative-shell, generated-artifact-boundary, markdown-table-escaping]
key-files:
  created:
    - generated/refresh/state-priority-queue.json
    - generated/refresh/state-priority-queue.md
  modified:
    - scripts/build-refresh-queue.ts
    - generated/refresh/README.md
key-decisions:
  - "Keep the existing published refresh queue outputs unchanged while adding separate combined priority outputs."
  - "Read candidate intake through parseStateCandidateIntake before generating priority artifacts."
  - "Render source boundaries and separate published-refresh and first-publication sections in Markdown."
patterns-established:
  - "Generator scripts read controlled data, build pure models, and write generated artifacts."
  - "Freeform Markdown table cells are escaped before rendering generated maintainer artifacts."
requirements-completed: [CATA-11, REFR-04, REFR-06]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 14-2026-05-27T13-54-27
generated_at: 2026-05-27T14:36:30Z
duration: 10min
completed: 2026-05-27
---

# Phase 14 Plan 03: Priority Queue Generator Summary

**Combined published-refresh and first-publication priority artifacts generated from repo-owned inputs**

## Performance

- **Duration:** 10 min
- **Started:** 2026-05-27T14:26:00Z
- **Completed:** 2026-05-27T14:36:30Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Extended `bun run refresh:queue` so it still writes `state-refresh-queue.{json,md}` and now also writes `state-priority-queue.{json,md}`.
- Added generator-side candidate intake parsing through `parseStateCandidateIntake`.
- Rendered priority Markdown with summary counts, source boundaries, published refresh work, first publication candidates, and candidate intake notes.
- Documented that generated priority artifacts must stay under `generated/refresh/` and must not replace canonical `content/states/*.md` records.

## Task Commits

Task changes are currently staged for the phase-level implementation history; no per-task commit was created before the phase verification gate.

## Files Created/Modified

- `scripts/build-refresh-queue.ts` - Reads candidate intake, builds the combined priority model, escapes Markdown cells, and writes both refresh and priority artifacts.
- `generated/refresh/state-priority-queue.json` - Machine-readable combined priority queue.
- `generated/refresh/state-priority-queue.md` - Maintainer-readable combined priority queue.
- `generated/refresh/README.md` - Generated artifact boundary and output list.

## Decisions Made

- The existing refresh queue remains the canonical published-record maintenance artifact; the new priority queue is a separate combined maintainer artifact.
- Candidate intake remains controlled repo data and is parsed before use by the generator.
- Source-boundary text is rendered into both the combined model and Markdown output so unpublished candidates are not mistaken for public state entries.

## Verification

- `bun run refresh:queue` passed and wrote both refresh and priority artifacts.
- `bun -e 'import priority from "./generated/refresh/state-priority-queue.json"; if (!priority.firstPublicationCandidates?.length) process.exit(1);'` passed.
- `test -f generated/refresh/state-priority-queue.md` passed.
- `rg -n "State Priority Queue|Published Refresh Work|First Publication Candidates|Source Boundaries" generated/refresh/state-priority-queue.md` passed.
- `rg -n "State Refresh Queue|Review Due|Review Soon" generated/refresh/state-refresh-queue.md` passed.
- `rg -n "state-priority-queue\\.json|state-priority-queue\\.md|must not replace" generated/refresh/README.md` passed.
- `git diff --quiet -- content/states` passed.
- `bun run format:check` passed.
- `bun run lint` passed.
- `bunx tsc --noEmit` passed.
- `bun run validate:content` passed.
- `bun run compile:content` passed.
- `bun test` passed.
- `bun run build` passed.
- `bun run precommit` passed.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 15 can use `generated/refresh/state-priority-queue.md` and `.json` to select between stale published-record refresh work and first-publication candidates without relying on public placeholder pages.

---

*Phase: 14-candidate-priority-and-refresh-intake*
*Completed: 2026-05-27*
