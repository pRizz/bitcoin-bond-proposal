# Phase 5: Editorial Polish and Explainers - Research

**Researched:** 2026-04-02
**Status:** Ready for planning

## Objective

Research what Phase 5 needs so the public shell becomes a stronger editorial product and gains its first deeper explainer without drifting into scope creep or stylistic noise.

## Current Site State

The public shell already has:

- a thesis-led homepage;
- a public methodology page;
- a medium-density state catalog;
- state detail pages with visible record typing;
- a serious theme layer and editorial component set;
- static prerendered routes for the registry batch.

What it does **not** yet have:

- a deeper article or explainer route;
- a sharper editorial rhythm beyond the initial shell;
- more refined infographic treatment beyond the initial pathway and registry snapshot blocks.

Implication:

- Phase 5 should deepen and polish the shell rather than re-architect it.

## Official Guidance Relevant to Phase 5

### Solid route rendering and prerender

From the SolidStart docs:

- [Route prerendering](https://docs.solidjs.com/solid-start/building-your-application/route-prerendering) continues to reinforce a static-first delivery model for content-rich pages.
- The site already uses prerender configuration in `app.config.ts`, so Phase 5 can add an explainer route without changing the hosting model.

Planning implication:

- The explainer should be a first-class prerendered route rather than a client-only novelty page.

### Tailwind theme variables

From the Tailwind docs:

- [Theme variables](https://tailwindcss.com/docs/theme) support the token-based direction already used in Phase 4.

Planning implication:

- Phase 5 visual polish should mostly happen by refining the theme and component language, not by adding ad hoc one-off styles everywhere.

## Editorial Implications

### 1. The first explainer should sharpen the project’s point of view

The approved topic is:

- why bond-financed reserve accumulation is different from simply buying Bitcoin with taxpayer funds

That is the strongest Phase 5 editorial move because it:

- sharpens the thesis;
- explains the project’s actual preference;
- gives the public shell a real argument instead of just a registry plus packet.

Planning implication:

- the explainer route should be authored and promoted as a first-class public page;
- the homepage should reference it directly, not treat it as a hidden article.

### 2. Polish should make the shell feel authored, not busier

The current shell already proves the route architecture. What it lacks is a more finished editorial cadence:

- sharper hero subcopy;
- stronger spacing contrast;
- more deliberate transitions between proof, packet, and registry sections;
- a more precise visual relationship between text and diagrams.

Planning implication:

- there should be a plan specifically for homepage and shell refinement, not just the explainer.

### 3. Infographics should stay explanatory, not ornamental

The approved priority order is:

1. reserve-versus-bond pathway diagram;
2. registry proof / state-status visual.

Planning implication:

- improve those existing visuals before introducing more;
- use restrained motion or emphasis only if it clarifies meaning.

### 4. Voice must sharpen selectively

The approved direction:

- stronger editorial judgments;
- low but noticeable dry edge;
- no sass in status blocks, source trails, or methodology rules.

Planning implication:

- the polish pass should touch homepage support copy, explainer subheads, and “why this matters / why this is limited” framing;
- it should not rewrite factual layers into a more playful tone.

## Recommended Plan Split

Three plans in two waves is the cleanest shape.

### Wave 1

- **05-01 First explainer route and canonical article**
  - author the first deep explainer;
  - add a route and supporting page structure for it;
  - surface it as a featured editorial artifact.

### Wave 2

- **05-02 Homepage and visual polish**
  - refine hero subcopy, section rhythm, and polish targets;
  - upgrade the reserve-versus-bond pathway and registry proof visuals;
  - keep the shell serious and restrained.

- **05-03 Editorial alignment pass**
  - tighten voice across support copy and “why this matters / why this is limited” surfaces;
  - connect the explainer into the shell cleanly;
  - verify the explainer and shell read as one product rather than separate pieces.

This split keeps the explainer as the new content anchor, then uses Wave 2 to integrate it into the public shell.

## Risks and Gotchas

- The explainer can become repetitive if it restates homepage copy instead of deepening the argument.
- Polish can easily slip into decoration if the site starts adding movement or visual devices without explanatory payoff.
- Sharpening the voice can break trust if it spills into factual surfaces that should stay neutral.
- The first explainer needs enough source scaffolding to feel credible, not like an opinion essay pasted onto a research product.

## Sources

- [SolidStart Route Pre-rendering](https://docs.solidjs.com/solid-start/building-your-application/route-prerendering)
- [Tailwind Theme Variables](https://tailwindcss.com/docs/theme)
- current local public shell routes and components:
  - `src/routes/(site)/index.tsx`
  - `src/routes/(site)/methodology.tsx`
  - `src/routes/(site)/states/index.tsx`
  - `src/routes/(site)/states/[slug].tsx`
  - `src/components/editorial/*`

---
*Phase: 05-editorial-polish-and-explainers*
*Research completed: 2026-04-02*
