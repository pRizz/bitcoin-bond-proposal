# Pitfalls Research

**Domain:** Milestone v1.2 national coverage expansion, comparison surfaces, and refresh workflows
**Researched:** 2026-04-11
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Comparison Pages Drift Beyond Canonical Data

**What goes wrong:** comparison or cluster pages summarize patterns that are not derivable from the canonical state records.

**Prevention:** derive comparison inputs at compile time from canonical manifest and state content, then render those derived values everywhere.

### Pitfall 2: Refresh Signals Exist in Some Surfaces but Not Others

**What goes wrong:** state detail pages show freshness dates, but catalog or comparison surfaces imply stronger freshness than the details actually support.

**Prevention:** make freshness cues a shared contract in the generated content graph and use the same fields across catalog, comparison, and detail routes.

### Pitfall 3: Coverage Expansion Turns Into Shallow Nationwide Sprawl

**What goes wrong:** the milestone publishes too many thin entries, weakening the project's credibility and making comparison pages misleading.

**Prevention:** expand in a deliberate batch and keep confidence/completeness signals visible when entries are uneven.

### Pitfall 4: Refresh Workflow Quietly Becomes Live Automation

**What goes wrong:** a refresh queue script starts looking like live tracking, even though it still depends on manual review and dated snapshots.

**Prevention:** keep refresh outputs as review queues or reports, not published truth. Preserve visible review dates and explicit human publication steps.

### Pitfall 5: UI Experimentation Steals the Milestone

**What goes wrong:** comparison work becomes a proxy for a component-library migration or animation project.

**Prevention:** require every visual change to support a coverage, comparison, or freshness need. Keep `mystic-ui` selective and optional.

## Milestone-Specific Warning Signs

- A comparison page needs hand-authored facts that are not present in canonical state records.
- Grouping logic exists separately in route files and build scripts.
- Refresh scripts modify published content automatically.
- New UI dependencies appear before the information model and route contract are settled.

## Sources

- `.planning/PROJECT.md`
- `src/lib/content/schema.ts`
- `scripts/compile-content.ts`

---
*Pitfalls research for: v1.2 National Coverage, Comparison, and Refresh*
