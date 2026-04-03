---
phase: 07-tooling-guardrail-cleanup
plan: "02"
subsystem: tooling
tags: [lint, precommit, guardrails, biome, source-scope]
requires:
  - phase: 07-01
    provides: restored formatter and biome configuration
provides:
  - source-only lint contract
  - fixed source issue surfaced by scoped lint
  - expanded pre-commit guardrails
affects: [tooling, precommit, source-quality]
tech-stack:
  added: []
  patterns: [lint fails on warnings, precommit uses non-mutating format check]
key-files:
  created: []
  modified:
    - package.json
    - scripts/precommit.ts
    - src/entry-client.tsx
key-decisions:
  - "The restored lint command should fail on warnings so it acts as a real guardrail."
  - "Pre-commit should run a non-mutating formatter check plus lint before the existing content and PDF contract."
patterns-established:
  - "Generated output is no longer part of the lint failure path."
  - "Pre-commit now enforces source guardrails and content/PDF guardrails in one deterministic pipeline."
requirements-completed: [PIPE-02]
duration: 6 min
completed: 2026-04-03
---

# Phase 7 Plan 02: Lint and pre-commit promotion Summary

**Scoped lint restored as a real source-level gate and promoted into the repo-owned pre-commit contract**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-03T08:24:00Z
- **Completed:** 2026-04-03T08:30:00Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Restored `bun run lint` as a source-only command and made it fail on warnings.
- Fixed the one real source issue surfaced by the cleaned-up lint scope.
- Expanded `bun run precommit` to run `format:check` and `lint` before the existing content validation, compile, and PDF steps.

## Task Commits

Each task was committed atomically:

1. **Task 1: Scope lint to authored source and remove generated-output noise** - `1dab81b` (chore)
2. **Task 2: Fix real source issues surfaced by the cleaned-up guardrails** - `7a27f27` (fix)
3. **Task 3: Expand pre-commit to include format and lint guardrails** - `fb990bf` (chore)

**Plan metadata:** Pending

## Files Created/Modified
- `package.json` - Tightened `lint` with `--error-on-warnings`.
- `src/entry-client.tsx` - Replaced the non-null assertion with an explicit startup guard.
- `scripts/precommit.ts` - Added formatter and lint checks ahead of the existing content/PDF trust contract.

## Decisions Made
- Treated warnings as failures for the source-level lint contract.
- Kept pre-commit non-mutating by using `format:check` instead of `format --write`.
- Preserved the existing validation, compile, and PDF checks after the new source guardrails.

## Deviations from Plan

None - plan executed as intended.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The repo now has trustworthy source-level format/lint enforcement plus the existing content/PDF enforcement.
- The milestone can be re-audited without the known tooling debt caveat.

---
*Phase: 07-tooling-guardrail-cleanup*
*Completed: 2026-04-03*
