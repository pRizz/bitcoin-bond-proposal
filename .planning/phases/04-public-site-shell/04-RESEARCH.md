# Phase 4: Public Site Shell - Research

**Researched:** 2026-04-01
**Status:** Ready for planning

## Objective

Research what Phase 4 needs so the project can move from packet and registry artifacts into a serious first public-facing site shell.

## Current Repo Reality

The repo already has:

- canonical packet docs in `content/docs/`;
- a 50-state registry manifest in `content/data/state-registry-manifest.json`;
- five publishable state entries in `content/states/`;
- a generated content graph in `generated/content-graph.json`;
- no actual SolidStart or route-layer app yet.

Implication:

- Phase 4 must bootstrap the site layer itself, not merely style an existing app.

## Official Stack Guidance

### SolidStart routing and app config

From the official Solid docs:

- [Getting Started](https://docs.solidjs.com/solid-start/getting-started) shows `@solidjs/start` as the current app entrypoint and starter path.
- [Routing](https://docs.solidjs.com/solid-start/building-your-application/routing) confirms file-based routing with `<FileRoutes />`.
- [Route Pre-rendering](https://docs.solidjs.com/solid-start/building-your-application/route-prerendering) confirms static generation support through prerender configuration.
- [app.config.ts](https://docs.solidjs.com/solid-start/reference/entrypoints/app-config) and [defineConfig](https://docs.solidjs.com/solid-start/reference/config/define-config) show the current configuration surface.

Planning implication:

- The site shell should use file-based routes and explicit prerender configuration from the start.
- Phase 4 should wire routes around the current generated content graph rather than inventing runtime fetching.

### Tailwind CSS theme variables

From the official Tailwind docs:

- [Theme variables](https://tailwindcss.com/docs/theme) confirms Tailwind v4’s `@theme` model for design tokens and utility mapping.

Planning implication:

- Phase 4 should create a dedicated theme layer with explicit tokens instead of scattering raw values or relying on defaults.
- This is especially important because the agreed visual direction is editorial-financial seriousness, not default utility-site styling.

### Package versions already validated locally

Current package versions verified from npm:

- `@solidjs/start@1.3.2`
- `solid-js@1.9.12`
- `@kobalte/core@0.13.11`
- `tailwindcss@4.2.2`
- `class-variance-authority@0.7.1`
- `tailwind-merge@3.5.0`
- `clsx@2.1.1`

Planning implication:

- Phase 4 should bootstrap the public site with these current packages rather than planning around stale stack lines.

## Shell Architecture Implications

### 1. Phase 4 should be route- and component-first

The site shell needs:

- app bootstrap and route system;
- theme and editorial components;
- homepage and methodology routes;
- catalog and state detail routes;
- wiring from `generated/content-graph.json`.

That suggests a three-plan split:

1. bootstrap app shell + theme + shared editorial components;
2. homepage + methodology page + infographic primitives;
3. catalog + state detail routes + generated-content integration.

### 2. The homepage should be a thesis page, not a dashboard

Based on the locked context:

- lead with the thesis;
- feature the Illinois packet;
- use a compact registry proof strip;
- include one or two intuitive diagrams.

Planning implication:

- The homepage plan should explicitly include infographic primitives and proof-strip components, not just a generic hero and cards.

### 3. The catalog must preserve registry honesty

The catalog and state detail routes must preserve:

- visible status metadata;
- visible source trails;
- record-type honesty;
- especially the New Hampshire authority-action distinction.

Planning implication:

- The state-detail plan must include a dedicated record-type presentation treatment.

### 4. Methodology is part of the shell, not a misc doc route

The methodology page is part of the public trust model.

Planning implication:

- It should be planned alongside the homepage, not buried as a low-priority static page.

## Recommended Plan Split

### Wave 1

- **04-01 Site bootstrap, theme, and editorial primitives**
  - install SolidStart and style-system packages;
  - create app shell, config, root layout, theme tokens, and shared components.

### Wave 2

- **04-02 Homepage and methodology shell**
  - build the thesis-first homepage;
  - add the methodology page;
  - create the first infographic-oriented blocks.

- **04-03 Catalog and state detail shell**
  - build the catalog route and state detail route;
  - wire generated registry data into route-level pages;
  - preserve status, sources, and record-type honesty.

These Wave 2 plans can run in parallel if they avoid overlapping ownership of shared primitives by relying on the foundation created in `04-01`.

## Risks and Gotchas

- The homepage can easily drift into crypto-marketing aesthetics if the theme layer is not explicit.
- The catalog can become a spreadsheet wall if route composition ignores the locked narrative-first registry structure.
- The site can accidentally flatten New Hampshire into a normal bill record if record-type presentation is not explicit.
- If shared components are not established in `04-01`, Wave 2 plans will fight over UI primitives and layout patterns.

## Sources

- [SolidStart Getting Started](https://docs.solidjs.com/solid-start/getting-started)
- [SolidStart Routing](https://docs.solidjs.com/solid-start/building-your-application/routing)
- [SolidStart Route Pre-rendering](https://docs.solidjs.com/solid-start/building-your-application/route-prerendering)
- [SolidStart app.config.ts](https://docs.solidjs.com/solid-start/reference/entrypoints/app-config)
- [SolidStart defineConfig](https://docs.solidjs.com/solid-start/reference/config/define-config)
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme)
- local package versions from `npm view`
- current repo sources: `package.json`, `src/lib/content/*`, `generated/content-graph.json`

---
*Phase: 04-public-site-shell*
*Research completed: 2026-04-01*
