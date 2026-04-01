---
phase: 01-foundation-and-trust-contracts
plan: "04"
subsystem: infra
tags: [pdf, playwright, precommit, hooks, markdown-it]
requires:
  - phase: 01-02
    provides: Validation and compile entrypoints
  - phase: 01-03
    provides: Canonical packet source documents
provides:
  - Playwright PDF generation for packet docs
  - Narrow pre-commit orchestration
  - Repo-owned pre-commit hook
affects: [phase-2, packet, contributor-workflow]
tech-stack:
  added: [@types/markdown-it]
  patterns: [html-to-pdf render path, repo-owned hook path]
key-files:
  created:
    - src/lib/content/pdf-theme.css
    - src/lib/content/render-pdf-html.ts
    - scripts/build-pdf.ts
    - scripts/precommit.ts
    - .githooks/pre-commit
    - pdf/illinois-one-pager.pdf
    - pdf/illinois-draft-bill.pdf
    - pdf/methodology.pdf
  modified:
    - package.json
    - bun.lock
key-decisions:
  - "Used Playwright HTML-to-PDF generation so the packet and future site can share a rendering path."
  - "Kept pre-commit scoped to validation, compile, and packet PDF generation rather than a full site build."
patterns-established:
  - "Canonical markdown documents are rendered to PDF through a dedicated script, not hand-edited binary artifacts."
  - "The repo owns its hook script, while local git config points core.hooksPath at .githooks."
requirements-completed: [PIPE-01, PIPE-02, PIPE-03]
duration: 4 min
completed: 2026-04-01
---

# Phase 1 Plan 04: PDF and pre-commit workflow Summary

**Playwright-driven packet PDF generation with a narrow pre-commit gate and repo-owned hook wiring**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-01T08:15:54Z
- **Completed:** 2026-04-01T08:19:30Z
- **Tasks:** 3
- **Files modified:** 11

## Accomplishments
- Built a Playwright HTML-to-PDF path that generates the three required packet PDFs from canonical Markdown.
- Added a pre-commit orchestrator that runs validation, compile, and packet PDF generation in the agreed order.
- Wired a repo-owned pre-commit hook and verified the gate on real commits.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build the Markdown-to-PDF packet renderer** - `f074e90` (feat)
2. **Task 2: Implement the pre-commit orchestrator** - `6e3326f` (chore)
3. **Task 3: Wire the repo-owned git hook path** - `001eb42` (chore)

**Plan metadata:** Pending

## Files Created/Modified
- `src/lib/content/pdf-theme.css` - Provides the packet’s print CSS.
- `src/lib/content/render-pdf-html.ts` - Converts canonical markdown documents into printable HTML.
- `scripts/build-pdf.ts` - Generates packet PDFs from canonical docs.
- `scripts/precommit.ts` - Runs the narrow Phase 1 validation, compile, and PDF checks.
- `.githooks/pre-commit` - Invokes the repo-owned pre-commit workflow.
- `pdf/illinois-one-pager.pdf` - Committed packet output for the one-pager.
- `pdf/illinois-draft-bill.pdf` - Committed packet output for the draft bill.
- `pdf/methodology.pdf` - Committed packet output for the methodology memo.
- `package.json` - Added the `@types/markdown-it` type dependency needed for strict TypeScript checks.

## Decisions Made
- Chose Playwright-based PDF generation to stay inside the Bun and TypeScript toolchain while preserving print CSS control.
- Scoped the commit gate narrowly to trust-contract checks and required packet artifacts instead of broadening it into a whole-app build step.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added `@types/markdown-it` so the PDF renderer passed strict typechecking**
- **Found during:** Task 1 (Build the Markdown-to-PDF packet renderer)
- **Issue:** The PDF renderer worked at runtime, but `bunx tsc --noEmit` failed because `markdown-it` did not ship the declaration file the strict TypeScript lane needed.
- **Fix:** Added `@types/markdown-it` and regenerated the Bun lockfile.
- **Files modified:** `package.json`, `bun.lock`
- **Verification:** `bunx tsc --noEmit`, `bun test`, `bun run validate:content`, `bun run compile:content`, `bun run build:pdf`, and `bun run precommit` all pass.
- **Committed in:** `f074e90` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The fix preserved the strict verification lane and did not expand scope beyond the PDF renderer’s actual dependency surface.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The repo now has required packet PDFs committed and reproducible.
- The pre-commit hook is active and already proving the Phase 1 trust contract on commits.
- Phase 1 is ready for phase-level verification and closure.

---
*Phase: 01-foundation-and-trust-contracts*
*Completed: 2026-04-01*
