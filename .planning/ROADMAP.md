# Roadmap: Bitcoin Bond Proposal

## Overview

This roadmap turns the existing project context and research into an Illinois-first delivery path. The work starts with trust contracts, schemas, and the PDF publishing lane, then produces the flagship Illinois packet, expands into a credible 50-state catalog core, and finally wraps that content in a thesis-driven public site with an initial explainer layer.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and Trust Contracts** - Establish schemas, content structure, source rules, and the PDF/pre-commit publishing lane. Completed 2026-04-01.
- [x] **Phase 2: Illinois Flagship Package** - Produce the first serious Illinois policy packet from canonical source documents. Completed 2026-04-01.
- [x] **Phase 3: Research Registry Core** - Build the 50-state skeleton and publish the first 3-5 researched state entries. Completed 2026-04-01.
- [x] **Phase 4: Public Site Shell** - Deliver the minimal thesis-led website and public research surfaces. Completed 2026-04-01.
- [ ] **Phase 5: Editorial Polish and Explainers** - Add the first deeper explainer layer and refine the site into a coherent public-facing product.

## Phase Details

### Phase 1: Foundation and Trust Contracts
**Goal**: Create the canonical content model, taxonomy, methodology guardrails, and PDF/pre-commit workflow that everything else depends on.
**Depends on**: Nothing (first phase)
**Requirements**: DOCS-04, CATA-03, PIPE-01, PIPE-02, PIPE-03
**Success Criteria** (what must be TRUE):
  1. Canonical content types and schemas exist for documents, state entries, and citations.
  2. The project has explicit reserve-vs-bond taxonomy and visible caution-language rules.
  3. Markdown source documents can be compiled into PDFs through a documented build path.
  4. Pre-commit validation blocks commits when required publish artifacts or validation checks fail.
**Plans**: 4 plans

Plans:
- [x] 01-01: Bootstrap the Bun and TypeScript workspace, canonical content tree, and taxonomy seed.
- [x] 01-02: Implement the schema, validation, and compile layer for canonical content.
- [x] 01-03: Author the methodology memo and canonical Illinois packet source documents.
- [x] 01-04: Implement packet PDF generation and the repo-owned pre-commit workflow.

### Phase 2: Illinois Flagship Package
**Goal**: Produce the Illinois one-page summary, draft bill, and methodology memo from the canonical content system.
**Depends on**: Phase 1
**Requirements**: DOCS-01, DOCS-02, DOCS-03
**Success Criteria** (what must be TRUE):
  1. An Illinois one-page summary exists and can be exported as a polished PDF.
  2. A longer Illinois draft bill exists as a serious first-pass legislative document.
  3. A methodology memo exists and explains the project’s research and publication rules clearly.
**Plans**: 3 plans

Plans:
- [x] 02-01: Rework the Illinois one-pager into a serious packet front page and single-page PDF.
- [x] 02-02: Draft a counsel-serious Illinois reserve-and-bond act and regenerate its PDF.
- [x] 02-03: Align methodology, terminology, and packet PDFs into one coherent Illinois deliverable set.

### Phase 3: Research Registry Core
**Goal**: Create the national skeleton and publish the first trustworthy batch of reserve/bond state records.
**Depends on**: Phase 2
**Requirements**: CATA-01, CATA-02, CATA-04, CATA-05, CATA-06
**Success Criteria** (what must be TRUE):
  1. A 50-state skeleton exists in canonical content format.
  2. At least 3-5 state entries are fully researched and publishable.
  3. Published state entries include bill metadata, plain-English effects, primary sources, and freshness dates.
  4. The publish workflow clearly separates raw leads from canonical published content.
**Plans**: 3 plans

Plans:
- [x] 03-01: Build the 50-state skeleton, manifest boundary, and registry-aware content pipeline.
- [x] 03-02: Publish the first Illinois, Texas, and Arizona registry entries.
- [x] 03-03: Publish the Oklahoma and New Hampshire entries and promote the first registry batch.

### Phase 4: Public Site Shell
**Goal**: Deliver the first public-facing website that presents the thesis, methodology, catalog, and state detail surfaces.
**Depends on**: Phase 3
**Requirements**: SITE-01, SITE-02, SITE-03, SITE-04
**Success Criteria** (what must be TRUE):
  1. A thesis-led homepage exists and explains the project’s core claim clearly.
  2. A public methodology page exists and reflects the canonical memo and sourcing rules.
  3. Readers can browse a catalog page and open state detail pages backed by canonical content.
  4. The site is statically generated and coherent enough to serve as the public shell of the project.
**Plans**: 3 plans

Plans:
- [x] 04-01: Build the SolidStart shell, theme layer, and shared editorial primitives.
- [x] 04-02: Implement the thesis-first homepage and public methodology shell.
- [x] 04-03: Implement the catalog/state-detail routes and generated-content integration.

### Phase 5: Editorial Polish and Explainers
**Goal**: Add the first deeper explainer and refine the public shell into a stronger editorial product.
**Depends on**: Phase 4
**Requirements**: SITE-05, SITE-06
**Success Criteria** (what must be TRUE):
  1. At least one deeper explainer article exists and supports the project thesis with clear sourcing.
  2. The site has a coherent editorial voice and visual system aligned with the `free-the-world` reference without becoming a clone.
  3. The homepage and explainer layer make the reserve-and-bond thesis understandable to non-specialists.
**Plans**: TBD

Plans:
- [ ] 05-01: Write and publish the first explainer article.
- [ ] 05-02: Refine editorial hierarchy, visual language, and initial infographic treatment.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Trust Contracts | 4/4 | Complete | 2026-04-01 |
| 2. Illinois Flagship Package | 3/3 | Complete | 2026-04-01 |
| 3. Research Registry Core | 3/3 | Complete | 2026-04-01 |
| 4. Public Site Shell | 3/3 | Complete | 2026-04-01 |
| 5. Editorial Polish and Explainers | 0/TBD | Not started | - |
