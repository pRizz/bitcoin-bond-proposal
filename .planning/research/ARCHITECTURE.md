# Architecture Research

**Domain:** State Bitcoin reserve and bond policy documents plus static research registry
**Researched:** 2026-03-31
**Confidence:** HIGH

## Standard Architecture

### System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Editorial Delivery Layer                 │
├─────────────────────────────────────────────────────────────┤
│  Homepage   Catalog   State Pages   Explainers   PDFs      │
└───────────────┬───────────────┬───────────────┬─────────────┘
                │               │               │
┌───────────────┴─────────────────────────────────────────────┐
│                 Generated Runtime Content Graph             │
├─────────────────────────────────────────────────────────────┤
│  validated state manifests  canonical docs  derived indexes│
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────┴─────────────────────────────────────────────┐
│                  Validation + Compile Layer                 │
├─────────────────────────────────────────────────────────────┤
│  schema validation   markdown parsing   route generation    │
│  comparison indexes  PDF build orchestration                │
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────┴─────────────────────────────────────────────┐
│                 Canonical Research Content Layer            │
├─────────────────────────────────────────────────────────────┤
│  Illinois docs   methodology   state entries   explainers   │
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────┴─────────────────────────────────────────────┐
│                 Intake + Queue + Artifact Layer             │
├─────────────────────────────────────────────────────────────┤
│  raw leads   queued manifests   review notes   batch traces │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Canonical content | Owns publishable Markdown, frontmatter, and state records | Repo-tracked Markdown and JSON validated by schema |
| Validation/compile scripts | Convert authored content into trustworthy runtime data | Bun + TypeScript scripts with Zod validation |
| Generated content graph | Serves as the runtime read model for the site | Static JSON or TS modules emitted during build |
| Static site | Presents homepage, methodology, catalog, state details, and explainers | SolidStart prerendered routes |
| PDF lane | Produces handoff-ready legislator documents from canonical Markdown | Build script that renders PDFs from the same source content |

## Recommended Project Structure

```text
content/
├── docs/
│   ├── illinois/
│   │   ├── one-page-summary.md
│   │   └── draft-bill.md
│   └── methodology.md
├── states/
│   ├── manifest.json
│   ├── illinois/
│   │   └── hb-1844.md
│   ├── texas/
│   └── new-hampshire/
├── explainers/
└── comparisons/

research/
├── intake/              # raw lead capture and scoped requests
├── queue/               # candidate manifests before publication
└── artifacts/           # normalization traces and intermediate notes

src/
├── components/
│   ├── ui/
│   └── editorial/
├── lib/
│   ├── content/
│   ├── schemas/
│   ├── seo/
│   └── infographics/
└── routes/

scripts/
├── compile-content.ts
├── validate-content.ts
├── build-pdf.ts
└── install-hooks.ts

generated/
└── content-graph.json

pdf/
```

### Structure Rationale

- **`content/`:** publishable source of truth for documents, state entries, explainers, and comparisons.
- **`research/`:** keeps raw leads and queued work separate from canonical published content.
- **`src/lib/schemas/`:** protects the project from inconsistent state records and drifting metadata.
- **`generated/`:** gives the app a clean runtime layer without parsing raw Markdown in route files.
- **`pdf/`:** stores derived outputs that can be inspected, diffed when useful, and regenerated deterministically.

## Architectural Patterns

### Pattern 1: Functional Core, Editorial Shell

**What:** Keep classification, normalization, freshness checks, and publishability decisions in pure functions; keep file I/O, fetches, and route composition thin.
**When to use:** All content compile, validation, and legislative status normalization work.
**Trade-offs:** Slightly more up-front structure, much easier testing and safer research refactors.

**Example:**
```typescript
type ProposalKind = "reserve" | "bond" | "both";

type StateEntry = {
  slug: string;
  proposalKind: ProposalKind;
  lastReviewed: string;
  primarySources: string[];
};

function isPublishableStateEntry(entry: StateEntry): boolean {
  return entry.primarySources.length > 0 && entry.lastReviewed.length > 0;
}
```

### Pattern 2: Canonical Content -> Generated Graph

**What:** Treat Markdown and structured manifests as the source of truth, then compile a generated graph for the app runtime.
**When to use:** Catalog pages, detail routes, comparisons, search indexes, and PDF manifests.
**Trade-offs:** Requires a compile step, but avoids runtime parsing chaos and duplicated indexing logic.

**Example:**
```typescript
const graph = compileContent({
  statesDir: "content/states",
  docsDir: "content/docs",
});
```

### Pattern 3: Queue Before Publish

**What:** Separate raw legislative leads from reviewed, canonical state records.
**When to use:** New states, stale entries, or uncertain bond-related items.
**Trade-offs:** Slower than direct publishing, much safer for a policy project where errors damage credibility.

## Data Flow

### Request Flow

```text
Raw legislative lead
    ↓
Queue manifest
    ↓
Research + summary + source collection
    ↓
Schema validation + publishability checks
    ↓
Canonical Markdown / JSON entry
    ↓
Generated content graph
    ↓
Static routes + PDF outputs
```

### State Management

```text
Canonical content
    ↓ (compile)
Generated graph
    ↓
Routes and editorial blocks
    ↔
Filter state in UI
```

### Key Data Flows

1. **Illinois packet flow:** Markdown draft -> validation -> PDF render -> website document surface.
2. **State registry flow:** raw lead -> queued manifest -> researched entry -> generated graph -> catalog/detail pages.
3. **Thesis page flow:** canonical metrics and explainer copy -> infographic blocks -> homepage.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100 state/proposal records | Repo-tracked Markdown and JSON are sufficient |
| 100-1,000 records | Add stronger generated indexes, search manifests, and batch validation tools |
| 1,000+ records or high refresh cadence | Revisit database-backed ingestion, but keep canonical publish contracts explicit |

### Scaling Priorities

1. **First bottleneck:** inconsistent state-entry metadata — fix with schemas and compile-time validation.
2. **Second bottleneck:** manual refresh throughput — fix with queue tooling and repeatable batch workflows, not immediate database sprawl.

## Anti-Patterns

### Anti-Pattern 1: Raw Research as Published Data

**What people do:** publish notes, tracker rows, or partial summaries directly.
**Why it's wrong:** readers cannot tell which claims are vetted, current, or just leads.
**Do this instead:** keep intake, queue, artifacts, and canonical entries as separate layers.

### Anti-Pattern 2: Separate Website and PDF Source Files

**What people do:** maintain one set of website content and another for handout PDFs.
**Why it's wrong:** the Illinois packet and the public site drift immediately.
**Do this instead:** author once in canonical Markdown and render multiple outputs.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Official legislature sites | Human-reviewed source collection with stable links | Treat as primary authority and preserve `status as of` dates |
| PDF renderer | Local build tool invoked by script | Keep deterministic and documented |
| Static hosting | Build-and-upload output | Prefer cheap static hosting until the product proves a need for more |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `content/` ↔ `scripts/compile-content.ts` | frontmatter + schema parsing | Validation must fail loudly |
| `generated/` ↔ routes | generated data modules or JSON | Routes should consume the graph, not raw files |
| docs ↔ PDFs | build manifest and output paths | Never hand-edit generated PDFs |

## Sources

- `free-the-world` research-registry prompt provided by the user — architectural reference point
- [Texas SB 21 history](https://capitol.texas.gov/billlookup/History.aspx?Bill=SB21&LegSess=89R) — reserve-law workflow example
- [Illinois HB 1844](https://www.ilga.gov/legislation/104/HB/10400HB1844.htm) — Illinois-first document target context
- [Arizona SB 1025](https://www.azleg.gov/legtext/57leg/1r/bills/sb1025s.htm) — reserve-bill example
- [NH BFA Bitcoin-backed municipal bond](https://nhbfa.com/news/nh-bfa-approves-worlds-first-bitcoin-backed-municipal-bond/) — bond-side structure signal
- [SolidStart docs](https://docs.solidjs.com/solid-start) — static delivery guidance

---
*Architecture research for: state Bitcoin reserve and bond legislative registry*
*Researched: 2026-03-31*
