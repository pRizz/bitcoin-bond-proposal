# Phase 8: Dark Theme Foundation - Research

**Researched:** 2026-04-04
**Status:** Ready for planning

## Objective

Research how to refactor the existing public shell into a dark-by-default editorial system without drifting into route-level polish or broader product changes.

## Current Technical State

### The current theme is still light-first

The entire shared shell is anchored to the current light token system in `src/styles/app.css`:

- canvas and panel colors are light neutrals
- shared borders, panel fills, and proof-strip surfaces assume a light background
- the current accent system already leans warm, but it was tuned for a light shell rather than a dark editorial one

This is good news for Phase 8:

- the dark foundation can be implemented as a single shared-system refactor
- the route layer does not need to be redesigned yet

### Shared surface ownership is clear

Phase 8 should primarily touch:

- `src/styles/app.css`
- `src/app.tsx`
- shared editorial components in `src/components/editorial/*`

The current shared components already concentrate most of the visual language:

- `SiteHeader.tsx`
- `SiteFooter.tsx`
- `ActionLink.tsx`
- `PacketFeature.tsx`
- `ProofStrip.tsx`
- `RegistrySnapshot.tsx`
- `StateCard.tsx`
- `PageSection.tsx`

Planning implication:

- this phase should focus on tokens, shell chrome, and shared component treatment
- avoid route-specific one-off fixes unless they are strictly necessary to keep the shared system coherent

## Phase Boundary

The roadmap and context are explicit:

### In scope for Phase 8

- dark-first token layer
- background system
- header/footer
- buttons/links
- cards/panels
- badges/chips
- dividers/borders
- shared diagram/component token adoption

### Out of scope for Phase 8

- route-by-route readability cleanup
- mobile regressions discovered only after the dark system lands
- detailed table/diagram/page polish
- theme toggle work

Planning implication:

- Phase 8 should establish the system
- Phase 9 should tune the routes

## Visual Direction Locked by Context

### 1. Palette direction

The user approved:

- near-black editorial tones
- slight warmth rather than blue-black coldness
- medium-high reading contrast
- subtle depth in large backgrounds

Planning implication:

- define a layered dark token system:
  - shell background
  - elevated panel
  - stronger panel
  - ink
  - subdued ink
  - border tiers

### 2. Accent strategy

The user approved:

- restrained Bitcoin-orange accents
- stronger, softer, and wash-level orange tones
- no neon crypto glow

Planning implication:

- Phase 8 should create a multi-step accent scale instead of reusing a single orange token everywhere

### 3. Atmosphere discipline

The user approved:

- editorial mood
- subtle metallic warmth
- low-noise texture
- no cyber styling

Planning implication:

- shared shell surfaces should feel darker and more intentional
- trust-heavy surfaces must remain disciplined and legible

## Recommended Plan Split

Two plans in two waves is the cleanest split.

### Wave 1

**08-01 Dark token layer and shell foundation**

- refactor the shared theme tokens in `app.css`
- establish dark backgrounds, borders, text, and accent tiers
- update the root app shell chrome enough that the whole site is unmistakably dark by default

### Wave 2

**08-02 Shared component adoption**

- apply the new token system to shared editorial components
- adapt cards, badges, chips, links, headers, footers, and proof surfaces
- carry the token adoption into shared diagram components without doing route-specific polish work

This split is strong because the second plan should consume the foundation from the first rather than inventing ad hoc color fixes.

## Risks and Gotchas

- If Phase 8 over-polishes route content, it will steal work from Phase 9 and muddy milestone accounting.
- Dark theme work can easily flatten the hierarchy if shell, cards, and elevated surfaces are not clearly separated.
- Orange accents can become too loud if active nav, CTA, eyebrow, and proof elements all compete at the same saturation.
- Markdown-rendered content surfaces may need token-aware prose treatment later, but detailed typography tuning should mostly wait for Phase 9 unless a shared token change is unavoidable now.

## Sources

- roadmap and context:
  - `.planning/ROADMAP.md`
  - `.planning/phases/08-dark-theme-foundation/08-CONTEXT.md`
- current shared shell and theme files:
  - `src/styles/app.css`
  - `src/app.tsx`
  - `src/components/editorial/SiteHeader.tsx`
  - `src/components/editorial/SiteFooter.tsx`
  - `src/components/editorial/ActionLink.tsx`
  - `src/components/editorial/PacketFeature.tsx`
  - `src/components/editorial/ProofStrip.tsx`

---
*Phase: 08-dark-theme-foundation*
*Research completed: 2026-04-04*
