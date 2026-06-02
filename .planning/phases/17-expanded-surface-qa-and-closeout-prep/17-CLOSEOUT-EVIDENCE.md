# Phase 17 Closeout Evidence

## Coverage Outcome

- Final public registry coverage: 17 published states.
- v1.3 additions: Florida, Kansas, North Dakota, Ohio, Utah, South Dakota, and Wyoming.
- `content/data/state-candidate-intake.json` has zero current candidate intake rows: `{ "candidates": [] }`.
- The final state count is source-gated, not quota-gated; Phase 16 published South Dakota and Wyoming only after official-source publication gates passed.

## Generated Artifact Evidence

- `generated/content-graph.json` is current for 2026-06-02 and contains 17 states.
- `generated/content-graph.json` includes the v1.3 published slugs `florida`, `kansas`, `north-dakota`, `ohio`, `utah`, `south-dakota`, and `wyoming`.
- `generated/refresh/state-priority-queue.json` reports `candidateCount: 0` and `firstPublicationCandidateCount: 0`.
- `generated/refresh/state-priority-queue.json` has `firstPublicationCandidates` length 0.
- `generated/refresh/state-refresh-queue.json` is the current published-record refresh queue; it was regenerated with `latestReview: 2026-06-02`, 6 current snapshots, 0 review-soon records, 11 review-due records, and 11 queue entries.

## Command Evidence

- `bun run validate:content` - PASS.
- `bun run compile:content` - PASS.
- `bun run refresh:queue` - PASS.
- `bunx tsc --noEmit` - PASS.
- `bun test` - PASS.
- `bun run build` - PASS.
- `bun run precommit` - PASS.
- Boundary check - PASS: `Phase 17 generated boundary ok: 17 states, 7 v1.3 additions, 0 candidate rows, 0 first-publication candidates`.

## Browser QA Evidence

- `.planning/phases/17-expanded-surface-qa-and-closeout-prep/17-browser-qa-report.json` status: passed.
- Browser QA ran 18 route checks: 6 routes across 3 viewports.
- Routes checked: `/states`, `/states/clusters`, `/states/compare`, `/states/south-dakota`, `/states/wyoming`, and `/states/texas`.
- Viewports checked: 390x844, 768x1024, and 1280x900.
- The Playwright harness verified OK responses, required route text, no horizontal page overflow, no horizontal visible text/control overflow, and required canonical state-detail links.

## Deferred Scope Not Included

Phase 17 did not add new publication work, advanced filters, comparison matrix, broad redesign, mystic-ui, or route-specific state exceptions.

## Milestone Closeout Readiness

v1.3 is ready for archive/audit review once `/gsd-verify-work` or milestone closeout consumes this evidence. The closeout packet now has final coverage facts, generated artifact evidence, command evidence, browser QA evidence, and explicit deferred-scope boundaries for the expanded registry.
