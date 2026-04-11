# Architecture Research

**Domain:** Milestone v1.2 national coverage expansion, comparison surfaces, and refresh workflows
**Researched:** 2026-04-11
**Confidence:** HIGH

## Recommended System Shape

```text
canonical state content + manifest
        ↓
schema validation and derived grouping/freshness logic
        ↓
generated content graph with comparison-ready indexes
        ↓
editorial routes for catalog, clusters, comparisons, and state detail
        ↓
repo-owned refresh queue / review workflow
```

## Architectural Guidance

### Functional Core, Editorial Shell

- Keep grouping, bucketing, freshness evaluation, and refresh-queue rules in pure data-in/data-out helpers.
- Keep route files and scripts thin: read canonical content, call pure helpers, render the result or write derived artifacts.
- Extend boundary parsing in `src/lib/content/schema.ts` rather than scattering new string checks through route code.

### Canonical Content First

- `content/states/*.md` remains the publishable state source of truth.
- `content/data/state-registry-manifest.json` remains the broad registry contract.
- `scripts/compile-content.ts` should derive comparison and freshness indexes from those sources instead of teaching each route to invent its own grouping rules.

### Refresh Workflow Shape

- Build a repo-owned refresh queue that reads canonical content and emits a review list or artifact.
- Keep queued refresh work distinct from published content.
- Preserve the current trust model: refresh tooling can suggest review work, but it should not silently rewrite published claims.

## Integration Points

| Surface | Responsibility in v1.2 |
|---------|-------------------------|
| `src/lib/content/schema.ts` | add comparison/freshness fields or stricter derived typing |
| `scripts/compile-content.ts` | emit grouped and freshness-aware content graph slices |
| `src/lib/site/content.ts` | expose selectors for clusters, comparisons, and freshness display |
| `src/routes/(site)/states/index.tsx` | evolve from flat catalog to grouped exploration |
| new comparison or cluster route(s) | host narrative comparison surfaces |
| repo-owned refresh script(s) | produce stale-entry queue or review artifact |

## Sequencing Recommendation

1. Extend canonical schemas and compile outputs first.
2. Publish the next coverage batch using the stronger contract.
3. Build cluster and comparison surfaces on top of the richer graph.
4. Add refresh queue workflow and cross-surface freshness QA.

This keeps the milestone aligned with Bright Builds architecture guidance: parse at boundaries, keep illegal states hard to express, and avoid pushing comparison logic into ad hoc UI code.

## Sources

- `src/lib/content/schema.ts`
- `scripts/compile-content.ts`
- `src/lib/site/content.ts`
- Bright Builds `standards/core/architecture.md`

---
*Architecture research for: v1.2 National Coverage, Comparison, and Refresh*
