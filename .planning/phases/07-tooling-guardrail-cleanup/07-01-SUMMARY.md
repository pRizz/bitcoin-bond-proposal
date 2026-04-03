---
phase: 07-tooling-guardrail-cleanup
plan: "01"
subsystem: tooling
tags: [biome, formatter, tailwind, guardrails, config]
requires: []
provides:
  - explicit biome configuration
  - tailwind v4 css parsing support
  - restored top-level format command
affects: [tooling, precommit, source-quality]
tech-stack:
  added: [Biome config]
  patterns: [scoped formatter boundary, non-mutating formatter check]
key-files:
  created:
    - biome.jsonc
  modified:
    - package.json
    - authored source files touched by the initial formatter normalization
    - pdf/illinois-one-pager.pdf
    - pdf/illinois-draft-bill.pdf
    - pdf/methodology.pdf
key-decisions:
  - "The repo now encodes its Biome file boundary explicitly instead of relying on CLI defaults."
  - "Tailwind v4 directive parsing should be enabled in Biome rather than worked around by avoiding the CSS layer."
patterns-established:
  - "Source-level formatting is scoped through Biome config rather than by hoping `biome ... .` will stay within intended boundaries."
  - "The repo now has a distinct non-mutating `format:check` path suitable for enforcement."
requirements-completed: [PIPE-02]
duration: 11 min
completed: 2026-04-03
---

# Phase 7 Plan 01: Formatter restoration Summary

**Biome configuration added, Tailwind v4 parsing enabled, and the repo’s top-level formatter restored**

## Performance

- **Duration:** 11 min
- **Started:** 2026-04-03T08:16:00Z
- **Completed:** 2026-04-03T08:27:00Z
- **Tasks:** 2
- **Files modified:** 45

## Accomplishments
- Added a repo-level `biome.jsonc` with an explicit authored-source boundary.
- Enabled Tailwind v4 directive parsing so `src/styles/app.css` no longer breaks Biome.
- Restored `bun run format` and added a non-mutating `format:check` path.
- Normalized authored source formatting under the new Biome contract.

## Task Commits

Each task was committed atomically:

1. **Task 1: Add explicit Biome configuration for the repo** - `e9946ef` (chore)
2. **Task 2: Enable Tailwind v4 CSS parsing and restore format command behavior** - `75d14fa` (chore)

**Plan metadata:** Pending

## Files Created/Modified
- `biome.jsonc` - New repo-level Biome configuration with explicit file scope, VCS ignore support, and Tailwind directive parsing.
- `package.json` - Added `format:check` and rewired tooling scripts around the restored Biome contract.
- authored files across `src/`, `scripts/`, `content/`, and top-level config - Normalized by the first successful repo-scoped formatting pass.

## Decisions Made
- Encoded the authored-source boundary in Biome rather than only in script conventions.
- Kept `bun run format` as the single top-level formatting entrypoint.
- Used a dedicated check-only formatting command for later enforcement instead of putting a mutating formatter into pre-commit.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Refreshed packet PDFs after canonical markdown formatting changed derived outputs**
- **Found during:** Task 2 (Enable Tailwind v4 CSS parsing and restore format command behavior)
- **Issue:** The restored formatter normalized canonical markdown content, which caused the repo-owned packet PDFs to become stale relative to source.
- **Fix:** Regenerated the packet PDFs and committed the refreshed derived artifacts.
- **Files modified:** `pdf/illinois-one-pager.pdf`, `pdf/illinois-draft-bill.pdf`, `pdf/methodology.pdf`
- **Verification:** Pre-commit passed with up-to-date packet artifacts after regeneration.
- **Committed in:** `6b6af76`

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Lint now has a stable formatter contract to build on.
- Pre-commit can safely promote formatter checks in Wave 2 without mutating files at commit time.

---
*Phase: 07-tooling-guardrail-cleanup*
*Completed: 2026-04-03*
