# Stack Research

**Domain:** State Bitcoin reserve and bond legislative document system plus static research registry site
**Researched:** 2026-03-31
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Bun | 1.3.9 | Package management, scripts, tests, content pipeline tasks | Matches the requested `free-the-world` stack shape, is fast for static-site and content workflows, and keeps script orchestration simple. |
| TypeScript | 5.x | Application, content validation, and build scripts | Strong fit for schema-driven content systems, static route generation, and editorial tooling. |
| `@solidjs/start` | 1.3.2 | Static site framework on top of Solid | Aligns with the requested stack, supports static output well, and leaves room for richer filters and route-level SEO without jumping to a heavier app stack. |
| SolidJS | 1.9.12 | UI and route composition | Good fit for a content-heavy site that still needs interactive filters, comparisons, and infographic surfaces. |
| Vinxi | 0.5.11 | Build and prerender pipeline under SolidStart | Keeps the static export path explicit and compatible with content-driven prerendering. |
| Tailwind CSS | 4.2.2 | Tokenized styling and layout system | Supports a bold editorial interface, design tokens, and fast iteration on infographic-heavy pages. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@kobalte/core` | 0.13.11 | Accessible primitives | Use for wrapped local UI controls like dialogs, accordions, tabs, and menus. Do not spread raw primitives across route files. |
| `class-variance-authority` | 0.7.1 | Typed visual variants | Use for buttons, badges, cards, and editorial block variants so the site stays coherent as it grows. |
| `clsx` | 2.1.1 | Class composition | Use with CVA for conditional styling that remains readable. |
| `tailwind-merge` | 3.5.0 | Tailwind conflict resolution | Use when variant utilities or content blocks may emit overlapping utility classes. |
| `zod` | 4.3.6 | Content and manifest validation | Use to validate state entries, bill metadata, source citations, and generated content graphs before publish. |
| `gray-matter` | 4.0.3 | Markdown frontmatter parsing | Use for canonical Markdown docs, state pages, explainers, and methodology content. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Biome | Linting and formatting | Prefer one fast formatter-linter for TS/JS/JSON/Markdown-adjacent files instead of layering multiple overlapping tools. |
| `git` hooks via repo-owned hook path or lightweight hook manager | Enforce PDF build and validation before commit | Keep the hook repo-tracked and auditable. Avoid invisible workstation-only setup. |
| PDF renderer lane | Build legislator-facing artifacts from Markdown | Prefer a deterministic path. If formal pagination matters most, use Pandoc/Typst. If minimizing non-JS dependencies matters more, render HTML and print to PDF with Playwright. |

## Installation

```bash
# Core
bun add solid-js @solidjs/start tailwindcss

# Supporting
bun add @kobalte/core class-variance-authority clsx tailwind-merge zod gray-matter

# Dev dependencies
bun add -d @biomejs/biome
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| `@solidjs/start` | Astro | Use Astro only if the project stays almost entirely static and content-only, with minimal filter/state interactivity. |
| Bun | pnpm | Use pnpm if team tooling or deployment constraints block Bun. Bun remains the better default for this repo shape. |
| Markdown + schemas + generated graph | Headless CMS | Use a CMS only if editorial throughput and non-technical editing become the real bottleneck. It is premature for v1. |
| Manual snapshot refresh with dated entries | Live legislative ingestion | Use automation later when the schema, publish criteria, and validation gates are stable enough to trust repeat runs. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Database-first architecture in v1 | Adds infra and mutable state before the content contract is stable | Repo-tracked content plus generated runtime data |
| Runtime scraping as the published source of truth | Encourages stale or unverifiable claims on legislation | Curated entries with visible review dates and source trails |
| Raw Kobalte primitives in page files | Spreads accessibility and styling decisions across the app | Small wrapped local UI components |
| Neutral “spreadsheet only” presentation | Fights the project’s thesis-driven editorial goal and weakens the story | Explicit stance with clearly separated facts, interpretation, and caveats |

## Stack Patterns by Variant

**If formal legislative PDFs are the hardest requirement:**
- Use Markdown as the source format.
- Compile through a deterministic PDF lane with a locked template and page styles.
- Because one-pagers and draft bills need stable pagination and repeatable output.

**If static public delivery is the hardest requirement:**
- Keep all canonical content in Markdown or JSON with schemas.
- Generate a content graph at build time and prerender routes explicitly.
- Because public browsing, SEO, and cheap hosting matter more than runtime dynamism.

**If bond research stays sparse while reserve research matures first:**
- Keep reserve and bond records under the same umbrella manifest.
- Model subtype explicitly in schemas and UI.
- Because the bond side likely starts more as explanatory and template content than as a dense legislative catalog.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `@solidjs/start@1.3.2` | `solid-js@1.9.12` | Current SolidStart line should be treated as the route and prerender anchor. |
| `tailwindcss@4.2.2` | `class-variance-authority@0.7.1` + `tailwind-merge@3.5.0` | Strong fit for typed variants and tokenized editorial blocks. |
| `zod@4.3.6` | Markdown frontmatter and generated JSON artifacts | Use one schema layer for both author-time validation and build-time graph generation. |

## Sources

- [Bun](https://bun.sh) — runtime and package manager baseline
- [SolidStart docs](https://docs.solidjs.com/solid-start) — static-site framework guidance
- [Tailwind CSS docs](https://tailwindcss.com/docs) — v4 design system direction
- [Kobalte docs](https://kobalte.dev/docs/core/overview/) — accessible primitive model
- [npm: `@solidjs/start`](https://www.npmjs.com/package/@solidjs/start) — version verification
- [npm: `solid-js`](https://www.npmjs.com/package/solid-js) — version verification
- [npm: `tailwindcss`](https://www.npmjs.com/package/tailwindcss) — version verification
- [npm: `@kobalte/core`](https://www.npmjs.com/package/@kobalte/core) — version verification
- [npm: `class-variance-authority`](https://www.npmjs.com/package/class-variance-authority) — version verification
- [npm: `tailwind-merge`](https://www.npmjs.com/package/tailwind-merge) — version verification
- [npm: `clsx`](https://www.npmjs.com/package/clsx) — version verification
- [npm: `zod`](https://www.npmjs.com/package/zod) — version verification
- [npm: `gray-matter`](https://www.npmjs.com/package/gray-matter) — version verification

---
*Stack research for: state Bitcoin reserve and bond legislative research site*
*Researched: 2026-03-31*
