# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.2 — National Coverage, Comparison, and Refresh

**Shipped:** 2026-04-12  
**Phases:** 4 | **Plans:** 8 | **Sessions:** 6

### What Was Built
- A stronger registry contract with grouping metadata and a dedicated refresh-artifact boundary.
- A ten-state published research registry with shared confidence/completeness cues.
- Editorial cluster and comparison reading paths under `/states`.
- A repo-owned refresh queue plus shared freshness cues across public registry surfaces.

### What Worked
- Phase 10's shared graph and selector contract made later phases mostly additive rather than rework-heavy.
- Yolo phase execution stayed reliable because each phase finished with summaries and verification before the next started.

### What Was Inefficient
- Phase 12 still needed a follow-up fix after route review, which exposed how easy it is for grouped-surface labeling to drift.
- Browser-level regression coverage for grouped registry routes remains manual, so some confidence still depends on runtime checks.

### Patterns Established
- Keep cluster, comparison, and freshness logic in shared site-content helpers instead of route-local transforms.
- Generate refresh-only workflow artifacts under `generated/refresh/` and wire them into repo-owned Bun scripts.

### Key Lessons
1. When the same registry data powers multiple surfaces, centralize narrative and trust logic in shared models before route work begins.
2. Refresh workflow artifacts should be generated and versioned like the content graph, not treated as ad hoc maintainer notes.

### Cost Observations
- Model mix: Not explicitly tracked in repo artifacts; execution stayed on the balanced/yolo path.
- Sessions: 6
- Notable: The milestone shipped in one concentrated day because the earlier content and route foundations were stable enough to reuse directly.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.2 | 6 | 4 | Shared content-graph and site-model contracts now drive grouped browsing, comparison, and refresh work instead of route-local shaping |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.2 | 24 local tests plus 4 passed phase verifications | High on shared business logic, lighter on browser regression automation | 0 |

### Top Lessons (Verified Across Milestones)

1. Repo-owned verification steps scale well when promoted into pre-commit only after they become trustworthy.
2. Trust-sensitive editorial products benefit from keeping canonical content, generated artifacts, and runtime selectors as clearly separated layers.
