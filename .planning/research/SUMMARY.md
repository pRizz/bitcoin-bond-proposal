# Project Research Summary

**Project:** Bitcoin Bond Proposal
**Domain:** State Bitcoin reserve and bond legislative package plus public research registry
**Researched:** 2026-03-31
**Confidence:** HIGH

## Executive Summary

This project is best treated as a content-first policy and research product, not as a database-heavy app and not as a generic crypto marketing site. The strongest implementation pattern is to keep canonical documents and state records in repo-tracked Markdown or JSON, validate them with schemas, compile them into a generated content graph, and use that graph to drive both a static public website and legislator-facing PDFs.

The research also shows that the reserve side of the thesis is ahead of the bond side in current state-level public artifacts. Texas, Arizona, Illinois, Missouri, and Oklahoma all provide reserve-related legislative signals, while the bond side is currently better represented by first-of-kind structures like New Hampshire’s officially announced bitcoin-backed municipal bond. That means the roadmap should deliver an Illinois-first reserve-and-bond model package while keeping the public research catalog honest about where reserve legislation is denser than bond legislation.

- This is a thesis-driven editorial research product with serious handoff documents.
- The recommended approach is canonical Markdown + schema validation + generated runtime graph + static site shell.
- The main risks are stale legislative status, taxonomy confusion around bonds, and drift between PDFs and the site.

## Key Findings

### Recommended Stack

Use Bun, TypeScript, SolidStart, SolidJS, Tailwind, wrapped Kobalte primitives, and Zod-backed content schemas. This matches the requested `free-the-world` shape while staying lightweight enough for a v1 static site and content pipeline.

**Core technologies:**
- **Bun:** scripts, installs, tests, and content pipeline tasks — best ergonomic fit for this repo shape
- **`@solidjs/start`:** static route layer — supports prerendered public pages and future richer interactivity
- **TypeScript + Zod:** schema and build backbone — keeps legislative metadata and page generation trustworthy
- **Tailwind + CVA:** editorial design system — good fit for infographic-forward pages and reusable content blocks

### Expected Features

The research strongly supports a launch centered on an Illinois packet plus a small but credible public registry. Users need a methodology page, a catalog view, state detail pages, downloadable PDFs, and visible source/freshness cues before anything more ambitious.

**Must have (table stakes):**
- Thesis-led homepage — users need the “why this matters” frame immediately
- Methodology page — trust contract for sourcing and freshness
- Downloadable Illinois packet — core legislative deliverable
- Catalog index and state detail template — baseline public registry shape
- Visible source trail and dated status metadata — credibility floor

**Should have (competitive):**
- Illinois-first model package — strongest differentiator
- Reserve vs bond taxonomy — clarifies a confused category
- Plain-English “what this would actually do” summaries — bridges bill text and public understanding
- Confidence/completeness metadata — keeps uneven coverage honest

**Defer (v2+):**
- Real-time refresh claims
- CMS/admin workflows
- Broad topic expansion beyond reserve and bond legislation

### Architecture Approach

The cleanest system shape is: canonical content -> validation and compile scripts -> generated runtime graph -> prerendered website and PDFs. Keep raw intake, queued leads, review artifacts, and canonical published entries as separate layers. This follows the user’s research-registry reference and aligns with the Bright Builds architecture guidance around functional core / imperative shell and parse-at-boundaries design.

**Major components:**
1. **Canonical content layer** — Illinois docs, state entries, methodology, explainers
2. **Validation/compile layer** — schemas, normalization, publishability checks, generated graph
3. **Delivery layer** — static public routes plus derived PDFs

### Critical Pitfalls

1. **Overclaiming legislative status** — solve with mandatory dated status metadata and primary sources
2. **Blurring reserve and bond concepts** — solve with explicit taxonomy and subtype fields
3. **Weak source discipline under strong advocacy tone** — solve by separating fact, interpretation, and argument
4. **Drift between site content and PDF packet** — solve by deriving both from the same canonical Markdown
5. **Trying to deeply cover all 50 states too early** — solve by using a full skeleton plus only 3-5 exemplars in v1

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and Trust Contracts
**Rationale:** The schema, methodology, PDF lane, and content architecture are prerequisites for everything else.
**Delivers:** Repo structure, canonical content model, validation rules, pre-commit PDF path, and methodology framework.
**Addresses:** trust, consistency, and taxonomic clarity.
**Avoids:** stale-status publishing and packet/site drift.

### Phase 2: Illinois Flagship Package
**Rationale:** The Illinois one-pager and draft bill are the most important proof that this is more than a tracker.
**Delivers:** one-page summary, draft bill, methodology memo, and shared terminology.
**Uses:** canonical Markdown docs and PDF generation.
**Implements:** the project’s most serious audience-facing assets first.

### Phase 3: Research Registry Core
**Rationale:** Once the trust model exists, build the 50-state skeleton and fill 3-5 exemplar entries.
**Delivers:** manifest schema, state entry template, exemplar state pages, and initial publish workflow.
**Uses:** validation and compile scripts from Phase 1.
**Implements:** the catalog backbone without overcommitting to full national depth.

### Phase 4: Public Site Shell
**Rationale:** Once content exists, build the minimum public delivery surfaces around it.
**Delivers:** homepage, methodology page, catalog page, state detail page, and one explainer.
**Uses:** generated content graph and editorial component layer.
**Implements:** the first real public product.

### Phase 5: Infographics and Comparative Storytelling
**Rationale:** Strong visuals should amplify a proven content model, not substitute for one.
**Delivers:** homepage infographics, reserve-vs-bond explanatory graphics, and refined comparisons.
**Uses:** validated content and shared visual tokens.
**Implements:** the broader public-education layer.

### Phase Ordering Rationale

- Trust rules and content contracts must come before publication.
- The Illinois flagship package should precede broader registry expansion.
- The catalog should precede more elaborate visual storytelling.
- The site should consume generated content, not define it ad hoc.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2:** draft bill structure and legal caution language need focused legislative drafting research
- **Phase 3:** bond-side exemplar selection may require careful judgment because current official examples are sparser than reserve examples
- **Phase 5:** infographic claims need metric selection and source discipline

Phases with standard patterns (skip research-phase):
- **Phase 1:** content schemas, compile scripts, and hook setup follow established patterns
- **Phase 4:** static editorial route composition is straightforward once the content model exists

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Strongly aligned with the provided site seed and official docs |
| Features | HIGH | User’s v1 definition is concrete and matches the domain evidence |
| Architecture | HIGH | Content-first static architecture fits both the site seed and the legislative packet workflow |
| Pitfalls | HIGH | Risks are already visible in current legislative tracker and advocacy patterns |

**Overall confidence:** HIGH

### Gaps to Address

- Bond-side legislative examples are thinner than reserve-side examples, so the bond catalog may start smaller and more explanatory.
- Illinois legislative drafting details will need a later focused pass once the initial architecture and methodology are in place.
- Exact PDF renderer choice should be decided during implementation based on quality vs setup trade-offs.

## Sources

### Primary (HIGH confidence)
- [Texas SB 21 history](https://capitol.texas.gov/billlookup/History.aspx?Bill=SB21&LegSess=89R) — enacted reserve-law signal
- [Illinois HB 1844](https://www.ilga.gov/legislation/104/HB/10400HB1844.htm) — Illinois reserve-bill signal
- [Arizona SB 1025](https://www.azleg.gov/legtext/57leg/1r/bills/sb1025s.htm) — reserve-bill signal
- [Arizona HB 2749 law](https://www.azleg.gov/legtext/57leg/1r/laws/0150.htm) — enacted reserve-fund-related law
- [Missouri HB 1217](https://house.mo.gov/BillContent.aspx?bill=HB1217&code=R&year=2025) — reserve-bill signal
- [Oklahoma HB 1203 summary](https://www.oklegislature.gov/cf_pdf/2025-26%20SUPPORT%20DOCUMENTS/BILLSUM/House/HB1203%20INT%20BILLSUM.PDF) — reserve-bill signal
- [NH BFA Bitcoin-backed municipal bond](https://nhbfa.com/news/nh-bfa-approves-worlds-first-bitcoin-backed-municipal-bond/) — bond-side official signal

### Secondary (MEDIUM confidence)
- User-provided `free-the-world` research-registry prompt — stack, IA, and tone template

### Tertiary (LOW confidence)
- None needed for the initialization-level conclusions above

---
*Research completed: 2026-03-31*
*Ready for roadmap: yes*
