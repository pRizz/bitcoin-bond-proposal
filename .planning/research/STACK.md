# Stack Research

**Domain:** Milestone v1.2 national coverage expansion, comparison surfaces, and refresh workflows
**Researched:** 2026-04-11
**Confidence:** HIGH

## Recommended Stack Direction

### Keep the Existing Core

| Technology | Current Role | v1.2 Recommendation |
|------------|--------------|---------------------|
| Bun | scripts, package manager, tests | Keep as-is for refresh and compile workflow scripts |
| TypeScript | schema, compile pipeline, route helpers | Keep as-is for new comparison and freshness logic |
| SolidStart + SolidJS | public editorial routes | Keep as-is for cluster and comparison surfaces |
| Tailwind CSS v4 | editorial token system | Keep as-is; do not introduce a conflicting design system for this milestone |
| Zod | content and manifest validation | Extend the existing schemas instead of adding a second validation layer |
| Biome | formatting and linting | Keep as the only formatter/linter surface |

### Recommended Additions

| Need | Recommendation | Why |
|------|----------------|-----|
| Comparison views | Add derived comparison indexes to the generated content graph | Keeps comparison logic build-time and deterministic |
| Freshness workflow | Add repo-owned TypeScript scripts or helpers under `scripts/` | Makes refresh queues auditable and rerunnable |
| Richer grouping metadata | Extend canonical manifest and state schemas in `src/lib/content/schema.ts` | Keeps region, status bucket, and freshness cues validated at the boundary |
| UI treatment | Reuse current editorial components and CSS tokens first | Minimizes visual churn while the information model expands |

### Real Integration Points

| Surface | Likely Change |
|---------|---------------|
| `content/data/state-registry-manifest.json` | add or derive fields needed for grouping and refresh review |
| `content/states/*.md` | expand the publishable state batch and refresh metadata |
| `src/lib/content/schema.ts` | tighten and extend canonical registry fields |
| `scripts/compile-content.ts` | emit comparison-ready and freshness-aware derived data |
| `src/lib/site/content.ts` | expose grouped, filtered, and comparison-friendly selectors |
| `src/routes/(site)/states/index.tsx` | support richer grouping and freshness presentation |
| new site routes or sections | host cluster and comparison narratives |

## What Not to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Database-first ingestion | Too much infrastructure before the data contract proves itself | repo-tracked content plus generated indexes |
| Live legislative scraping | Encourages pseudo-real-time claims the project cannot verify continuously | dated refresh queues and explicit review metadata |
| Heavy charting or dashboard frameworks | Risks turning an editorial research product into cluttered analytics UI | CSS/SVG or small, purpose-built editorial comparison blocks |
| Broad `mystic-ui` adoption | Tailwind v4 and the current editorial system already cover the core needs | limit any adoption to a proven comparison or proof surface later |

## Dependency Recommendation

- No new core dependency is required to start v1.2.
- Prefer standard library and existing app code for comparison grouping, freshness checks, and queue generation.
- Revisit a small visualization helper only if a concrete comparison surface proves the current CSS/SVG approach insufficient.

## Sources

- Local repo structure: `src/lib/content/schema.ts`, `scripts/compile-content.ts`, `src/lib/site/content.ts`, `src/routes/(site)/states/*`
- Existing project context: `.planning/PROJECT.md`

---
*Stack research for: v1.2 National Coverage, Comparison, and Refresh*
