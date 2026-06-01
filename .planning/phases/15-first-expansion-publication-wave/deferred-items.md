# Deferred Items

## 15-02-generated-graph-test-counts | 2026-06-01

- **Found during:** Plan 15-02 overall verification attempt.
- **Issue:** After `bun run compile:content` updated the working-tree `generated/content-graph.json` to 15 state entries, `bun test` failed two hard-coded registry grouping expectations in `src/lib/site/content.test.ts`.
- **Reason deferred:** Plan 15-03 owns `generated/content-graph.json`, refresh artifacts, candidate intake cleanup, and the full Phase 15 verification contract.
- **Expected follow-up:** During Plan 15-03, commit regenerated artifacts and update any affected grouping expectations in the same generated-artifact verification scope.
