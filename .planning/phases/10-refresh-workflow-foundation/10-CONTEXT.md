# Phase 10: Refresh Workflow Foundation - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Add the refresh-aware content, validation, and maintainer workflow foundation that later coverage expansion depends on. This phase defines how refresh cadence is encoded, how review status is derived, how queued versus published entries are kept separate in compile output, and how maintainers inspect freshness debt. It does not publish new state entries or redesign public registry routes beyond exposing safe foundation data.

</domain>

<decisions>
## Implementation Decisions

### Refresh contract
- **D-01:** Refresh state should use a small per-state manifest contract rather than a global heuristic so review expectations are explicit and auditable.
- **D-02:** `reviewCadenceDays` is required for manifest entries marked `published`; it remains optional for `queued` and `unresearched` states.
- **D-03:** Refresh status is derived from canonical snapshot dates only: `lastReviewed` plus `reviewCadenceDays`, evaluated against a supplied or current date. No live legislative lookups belong in this phase.

### Compile and publication boundary
- **D-04:** Canonical state-entry markdown files may continue to exist while manifest status is `queued`, but compile output and public route generation must only treat manifest-`published` entries as published.
- **D-05:** The compiled content graph should carry derived refresh metadata for published states so later public-surface work can reuse it without reimplementing date logic.

### Maintainer workflow
- **D-06:** Phase 10 should add a dry-run audit/report command, not an automatic content mutation workflow.
- **D-07:** The refresh report should surface published entries that are current, due soon, or overdue, plus queued states that represent likely near-term authoring targets.
- **D-08:** Authoring guidance should stay inside repo-owned docs and validation messages, not an external process document.

### the agent's Discretion
- Threshold for `due soon` versus `overdue`, as long as it is explicit in code and report output.
- Exact naming of the refresh script and helper functions.
- Exact shape of derived refresh metadata in the compiled graph as long as it remains small and reusable.

</decisions>

<specifics>
## Specific Ideas

- Preserve the current dark editorial shell and route structure; this phase is infrastructure-first.
- Treat selective `mystic-ui` adoption as a later consumer of the refresh foundation, not part of the implementation now.
- Keep snapshot-based trust cues central: review tooling should help maintainers maintain dated records, not drift toward pseudo-live tracking.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone scope
- `.planning/PROJECT.md` — v1.2 milestone goal, constraints, and decisions
- `.planning/REQUIREMENTS.md` — `PIPE-04`, `PIPE-05`, `PIPE-06`
- `.planning/ROADMAP.md` — Phase 10 goal, plans, and success criteria

### Existing content contract
- `content/data/state-registry-manifest.README.md` — manifest-only versus published-entry boundary
- `content/data/state-registry-manifest.json` — canonical 50-state manifest
- `src/lib/content/schema.ts` — current manifest and state-entry schemas
- `scripts/validate-content.ts` — current content validation workflow
- `scripts/compile-content.ts` — current compiled graph generation
- `src/lib/site/content.ts` — current graph consumption and registry stats helpers

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/content/schema.ts`: already owns manifest and state-entry parsing, uniqueness checks, and manifest/published assertions.
- `scripts/compile-content.ts`: already merges manifest data with canonical state-entry files into `generated/content-graph.json`.
- `scripts/validate-content.ts`: already enforces content contracts and is the right place to add freshness/boundary assertions.
- `src/lib/site/content.ts`: already centralizes typed access to compiled registry data for the app.

### Established Patterns
- Canonical content is Markdown plus small JSON control files; generated artifacts live outside `content/`.
- Validation and compile steps are repo-owned Bun scripts wired into pre-commit.
- Public routes consume the compiled graph rather than reading ad hoc state directly.

### Integration Points
- Manifest refresh cadence fields connect to schema parsing, validation, compile output, audit tooling, and later public freshness UI.
- The new audit script should sit beside the existing content scripts and reuse the same parsing helpers.
- `app.config.ts` route generation depends on `registry.publishedSlugs`, so compile semantics directly control what becomes public.

</code_context>

<deferred>
## Deferred Ideas

- Publishing the next state batch — Phase 11
- Catalog and state-detail freshness presentation — Phase 12
- Selective `mystic-ui` adoption on public surfaces — Phase 13

</deferred>

---
*Phase: 10-refresh-workflow-foundation*
*Context gathered: 2026-04-09*
