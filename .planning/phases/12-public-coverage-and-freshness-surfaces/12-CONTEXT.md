---
phase: 12-public-coverage-and-freshness-surfaces
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: phase-20260411T153046Z
generated_at: 2026-04-11T15:30:46.617Z
---

# Phase 12: Public Coverage and Freshness Surfaces - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Make expanded coverage and review recency obvious in public registry flows without blurring trust boundaries. This phase updates the public states catalog to show published, queued, and unresearched coverage status, and it sharpens state detail pages so freshness, source-first trust, and review cadence are visible. It does not add new state content or introduce a new visual language beyond what the current editorial system already supports.

</domain>

<decisions>
## Implementation Decisions

### Catalog coverage surface
- **D-01:** The `/states` route should stop behaving like a published-only list and become a coverage ledger for all 50 states.
- **D-02:** Published states should remain the richest cards and keep direct record links.
- **D-03:** Queued and unresearched states should be visibly distinct, but they should not pretend to be published records or detail pages.
- **D-04:** The coverage surface should expose status counts at a glance: published, queued, unresearched, plus freshness debt when available.

### Filtering and sorting
- **D-05:** The catalog should support status-aware browsing in addition to proposal-focus filtering.
- **D-06:** Sorting should remain simple and legible; no complex search or clustering is needed in this phase.

### Detail trust and freshness surface
- **D-07:** State detail pages should surface review status, next review due, and cadence near the top of the support rail.
- **D-08:** The sidebar should explicitly remind readers that these are snapshot-based descriptive records anchored in official sources, not live tracking.
- **D-09:** Existing packet-versus-registry distinctions must stay intact, especially for Illinois.

### the agent's Discretion
- Exact visual treatment for coverage summary tiles and non-published state cards.
- Exact sort labels and empty-state phrasing, as long as the public status distinctions remain obvious.
- Whether to reuse `StateCard` or introduce a small adjacent coverage-only card component.

</decisions>

<specifics>
## Specific Ideas

- Show the national coverage posture first, then let the reader drill into published records.
- Keep queued states visible as “next likely publishable” rather than hidden metadata.
- Use the new Phase 10 refresh fields to show “current / due soon / overdue” in an editorially restrained way.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone scope
- `.planning/PROJECT.md` — v1.2 milestone constraints and product posture
- `.planning/REQUIREMENTS.md` — `SITE-07`, `SITE-08`
- `.planning/ROADMAP.md` — Phase 12 goal, plans, and success criteria

### Existing registry workflow and data
- `.planning/phases/10-refresh-workflow-foundation/10-01-SUMMARY.md` — refresh metadata and compile boundary
- `.planning/phases/10-refresh-workflow-foundation/10-02-SUMMARY.md` — audit/report workflow
- `.planning/phases/11-expanded-state-coverage/11-03-SUMMARY.md` — ten-state published batch
- `src/lib/site/content.ts` — current graph consumption and stats helpers
- `src/routes/(site)/states/index.tsx` — current published-only catalog
- `src/routes/(site)/states/[slug].tsx` — current detail support rail
- `src/components/editorial/StateCard.tsx` — published record card pattern

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/site/content.ts`: already has published-state helpers and registry status counts from the compiled graph.
- `src/components/editorial/StateCard.tsx`: established published-card visual language for the catalog.
- `src/styles/app.css`: already has reusable editorial surface classes (`panel-wash`, `support-panel`, `data-chip`, `eyebrow`).

### Established Patterns
- Published records use state-level routes only when `registryStatus` is `published`.
- Public descriptive records must stay visually distinct from the Illinois normative packet.
- Status and freshness should read as calm editorial metadata, not dashboard chrome.

### Integration Points
- The states index should consume manifest-wide coverage data in addition to published states.
- The state detail route already receives refresh metadata from the compiled graph and can surface it without re-reading Markdown frontmatter.

</code_context>

<deferred>
## Deferred Ideas

- Region, cluster, or proposal-type comparison pages
- Search-heavy catalog interactions
- `mystic-ui`-driven motion or component swaps

</deferred>

---
*Phase: 12-public-coverage-and-freshness-surfaces*
*Context gathered: 2026-04-11*
