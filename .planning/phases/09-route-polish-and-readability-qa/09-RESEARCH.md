# Phase 9: Route Polish and Readability QA - Research

**Researched:** 2026-04-04  
**Status:** Ready for planning

## Objective

Research how to finish the dark-mode refactor by polishing the shipped routes for readability, interaction clarity, and mobile consistency, without reopening the shared dark foundation completed in Phase 8.

## Current Technical State

### The shared dark foundation is already established

Phase 8 already completed:

- dark token system in `src/styles/app.css`
- dark shell chrome in `src/app.tsx`, `SiteHeader.tsx`, and `SiteFooter.tsx`
- dark shared controls and shared proof surfaces

Planning implication:

- Phase 9 should not spend effort reworking the token layer or global shell again
- the work now belongs at the route surface level

### Route surfaces now show the remaining polish work clearly

The current route files reveal the phase boundary:

- homepage: `src/routes/(site)/index.tsx`
- methodology: `src/routes/(site)/methodology.tsx`
- packet: `src/routes/(site)/packet/illinois.tsx`
- explainer: `src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx`
- states index: `src/routes/(site)/states/index.tsx`
- state detail: `src/routes/(site)/states/[slug].tsx`

The likely remaining work is not “make them dark” but:

- homepage contrast and section rhythm tuning
- long-form reading comfort
- proof and data scanability
- filter/control clarity
- mobile wrapping and interaction-state QA

## Phase Boundary

### In scope for Phase 9

- route-level readability tuning
- contrast and hierarchy polish
- hover / active / focus clarity
- mobile wrapping and spacing fixes
- table/list/data-surface readability
- dark-mode consistency across all shipped routes

### Out of scope for Phase 9

- new public surfaces
- route structure redesign
- theme toggle work
- new content or expanded registry coverage
- shared theme system reinvention

Planning implication:

- route-specific fixes are expected here
- the work should still stay bounded to existing routes and surfaces

## Recommended Plan Split

Two plans in two waves is the cleanest shape.

### Wave 1

**09-01 Homepage and route-level interactive polish**

- tune homepage hero contrast and reading-path hierarchy
- sharpen proof strip and registry snapshot scanability
- improve catalog filter clarity and state-card hierarchy
- improve obvious route-level hover/active/focus states where they are easiest to validate

### Wave 2

**09-02 Long-form readability and final QA**

- tune methodology, explainer, packet, and state-detail reading surfaces
- improve table, list, and metadata-block readability
- run mobile and interaction QA pass across all shipped routes

This split is strong because:

- homepage and card/proof polish can land quickly on top of the existing dark system
- long-form and final QA work benefits from having those surface-level tweaks already in place

## Route-Specific Observations

### Homepage

The homepage structure is already correct and should be preserved:

- hero
- proof rail
- signal section
- read-first section

Planning implication:

- improve clarity through spacing, contrast, and emphasis
- do not redesign the information architecture

### Methodology, packet, explainer, and state detail

These routes already inherit dark long-form styling via `MarkdownContent`, but route framing still needs tuning:

- intro panels
- support boxes
- metadata groups
- table density and borders

Planning implication:

- route-level support surfaces need readability tuning in addition to prose styling

### States index and detail

The catalog and state detail pages are the most trust-sensitive dark-mode surfaces:

- state cards
- filter controls
- metadata blocks
- support boxes

Planning implication:

- the polish should make them clearer and more scannable without making them feel like dashboards

## Risks and Gotchas

- Over-polishing the homepage could become a redesign, which this phase explicitly forbids.
- Long-form readability fixes can accidentally drift back into shared theme work if they are made only in the shared prose layer.
- Mobile wrapping issues will likely show up in cards, chips, filter controls, and metadata blocks first.
- Trust surfaces can become too contrast-heavy and lose their calm tone if every label and block gets emphasized equally.

## Sources

- phase context:
  - `.planning/phases/09-route-polish-and-readability-qa/09-CONTEXT.md`
- current route files:
  - `src/routes/(site)/index.tsx`
  - `src/routes/(site)/methodology.tsx`
  - `src/routes/(site)/packet/illinois.tsx`
  - `src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx`
  - `src/routes/(site)/states/index.tsx`
  - `src/routes/(site)/states/[slug].tsx`
- current shared foundation:
  - `src/styles/app.css`
  - `src/components/editorial/MarkdownContent.tsx`
  - `src/components/editorial/ProofStrip.tsx`
  - `src/components/editorial/RegistrySnapshot.tsx`
  - `src/components/editorial/StateCard.tsx`

---
*Phase: 09-route-polish-and-readability-qa*
*Research completed: 2026-04-04*
