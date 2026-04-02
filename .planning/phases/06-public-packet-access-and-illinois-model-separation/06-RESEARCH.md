# Phase 6: Public Packet Access and Illinois Model Separation - Research

**Researched:** 2026-04-02
**Status:** Ready for planning

## Objective

Research how to close the v1.0 milestone audit blocker: the public shell says the Illinois model packet is part of the site, but the actual Illinois packet is not reachable in the built shell.

## Audit-Derived Problem Statement

The latest milestone audit found one critical integration gap:

- the homepage, explainer, packet feature, and footer all label `/states/illinois` as the Illinois model packet;
- `/states/illinois` is actually the descriptive HB1844 registry entry;
- the real Illinois packet artifacts exist as canonical docs and PDFs, but they are not exposed through the public shell.

This breaks the intended reading path:

- model = Illinois packet
- argument = financing explainer
- proof = registry

At runtime, readers can reach only the argument and proof layers. The model layer is described but not actually navigable.

## Current Technical State

### What already exists

- canonical packet docs:
  - `content/docs/illinois-one-pager.md`
  - `content/docs/illinois-draft-bill.md`
  - `content/docs/methodology.md`
- generated packet PDFs:
  - `pdf/illinois-one-pager.pdf`
  - `pdf/illinois-draft-bill.pdf`
  - `pdf/methodology.pdf`
- docs metadata already compiled into `generated/content-graph.json`
- site helpers already support loading canonical doc bodies:
  - `getDocumentBySlug()` in `src/lib/site/content.ts`
  - `readDocumentBody()` in `src/lib/site/raw-content.ts`

### What the site currently exposes

The current public route set is:

- `/`
- `/methodology`
- `/states`
- `/states/{slug}`
- `/explainers/bond-financed-reserve-accumulation`

There is no public packet route and no public packet PDF link surface.

### Why the gap exists

Phase 4 and Phase 5 correctly built the thesis, methodology, registry, and explainer surfaces, but they never added the normative packet layer as a real route. Because of that, later CTA wiring reused the Illinois registry route as a stand-in.

## Recommended Fix Shape

The narrowest robust fix is:

1. add one dedicated Illinois packet route in the public shell;
2. render the canonical packet docs there from their markdown sources;
3. include honest links to the packet PDFs;
4. rewire all packet CTAs to that route;
5. keep `/states/illinois` as the descriptive registry record and label it that way.

## Route Recommendation

Recommended route:

- `/packet/illinois`

Why this is the right level of scope:

- it solves the milestone blocker without inventing a full generic docs subsystem;
- it keeps the distinction between packet and registry visible in the URL structure;
- it leaves room for future packet routes for other states without forcing that abstraction now.

## Public-Shell Implications

### Packet route should include

- packet framing that clearly says this is the normative Illinois model;
- the one-pager content;
- the draft bill content;
- links to the packet PDFs;
- a clearly labeled link to the descriptive Illinois registry record.

### CTA rewiring should cover

- homepage hero
- packet feature
- explainer sidebar
- footer featured packet link
- any Illinois-specific support box on the Illinois registry page

### Distinction that must remain explicit

- `/packet/illinois` = normative project model
- `/states/illinois` = descriptive legislative record about HB1844

That distinction is the actual audit requirement. Fixing the URL target alone is not enough if the copy still blurs the two surfaces.

## Verification Implications

Phase 6 should verify all of the following:

- the packet route is prerendered in the production build;
- the homepage and explainer CTAs point to `/packet/illinois`;
- the Illinois registry page no longer serves as the packet stand-in;
- the packet route exposes the one-pager and draft bill clearly enough to satisfy the intended `model / argument / proof` sequence.

## Recommended Plan Split

Two plans in two waves is the cleanest shape.

### Wave 1

- **06-01 Public Illinois packet surface**
  - build `/packet/illinois`
  - render canonical packet docs
  - expose packet PDFs
  - prerender the route

### Wave 2

- **06-02 CTA rewiring and narrative separation**
  - update homepage, explainer, footer, and packet feature CTAs
  - add honest cross-links between packet and Illinois registry record
  - verify the `model / argument / proof` reading path end to end

## Risks and Gotchas

- A generic “all docs” routing system would likely overshoot the gap and create unnecessary surface area.
- The packet route should not duplicate methodology in full; methodology already has its own route and should remain separate.
- The Illinois registry page must stay descriptive and should not be rewritten into a packet page.
- CTA rewiring must be checked in built output, not just source files, because the audit gap was discovered at the flow level.

## Sources

- milestone audit:
  - `.planning/v1.0-MILESTONE-AUDIT.md`
- current shell routes and CTA surfaces:
  - `src/routes/(site)/index.tsx`
  - `src/components/editorial/PacketFeature.tsx`
  - `src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx`
  - `src/app.tsx`
  - `src/routes/(site)/states/[slug].tsx`
- packet content and docs graph:
  - `content/docs/illinois-one-pager.md`
  - `content/docs/illinois-draft-bill.md`
  - `generated/content-graph.json`

---
*Phase: 06-public-packet-access-and-illinois-model-separation*
*Research completed: 2026-04-02*
