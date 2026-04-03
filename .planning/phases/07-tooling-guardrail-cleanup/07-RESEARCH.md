# Phase 7: Tooling Guardrail Cleanup - Research

**Researched:** 2026-04-03
**Status:** Ready for planning

## Objective

Research how to restore formatting and lint guardrails so they are trustworthy at the authored-source boundary and can be promoted into pre-commit without dragging generated output into the contract.

## Current Repo State

### What is currently configured

- `package.json` scripts:
  - `format`: `bunx @biomejs/biome format --write .`
  - `lint`: `bunx @biomejs/biome check .`
  - `precommit`: `bun scripts/precommit.ts`
- no `biome.json` or `biome.jsonc` exists
- `.gitignore` already excludes:
  - `.output/`
  - `.vinxi/`
  - `generated/*.json`
  - `node_modules/`

### What currently fails

#### `bun run format`

Current failure:

- Biome aborts on `src/styles/app.css`
- error text says Tailwind-specific syntax is disabled
- it explicitly recommends enabling `tailwindDirectives`

The failing syntax in the repo includes:

- `@theme`
- `@apply`

#### `bun run lint`

Current failure:

- `bun run lint` scans generated output under `.output/public`
- it emits thousands of diagnostics against built JS/CSS/HTML output
- it also reports formatting-only differences against authored files like `package.json` and `tsconfig.json`

Result:

- the current `lint` command is not a trustworthy source-level guardrail
- the current `format` command is unusable for the real CSS syntax the repo already ships

## Official Guidance Relevant to Phase 7

### 1. Tailwind v4 syntax is supported by Biome, but only when enabled

From the official Biome configuration docs and v2.3.0 notes:

- `css.parser.tailwindDirectives` enables parsing of Tailwind-specific syntax such as `@theme`, `@utility`, and `@apply`
- default is `false`

Planning implication:

- the repo needs an explicit Biome config file if it wants `bun run format` to handle `src/styles/app.css`

### 2. Biome file scope should be defined with configuration, not only CLI `.` usage

From the official configuration docs:

- `files.includes` defines which files are processed by Biome tools
- files outside `files.includes` are excluded from formatter/linter use
- Biome recommends force-ignore patterns for output folders when they should not be crawled

Planning implication:

- the repo should stop relying on `biome ... .` with no config
- Phase 7 should define a narrow authored-source boundary in config

### 3. Biome can honor `.gitignore`, but VCS integration is opt-in

From the official VCS integration guide:

- `vcs.enabled`
- `vcs.clientKind`
- `vcs.useIgnoreFile`

Planning implication:

- Phase 7 can likely use the repo’s existing `.gitignore` as part of the lint/format boundary, but only after enabling VCS integration explicitly
- explicit `files.includes` is still valuable because the user wants a narrow authored-source contract, not just “whatever git ignores”

## Repo-Specific Implications

### Formatter ownership

The user locked this behavior:

- `bun run format` stays the single top-level formatting command
- prefer fixing the current Biome path first
- allow internal implementation changes only if necessary

Planning implication:

- start by adding `biome.jsonc` with Tailwind directive parsing enabled
- only split formatter responsibility if that fails or becomes awkward

### Lint scope boundary

The user locked this scope:

- include: `src/`, `scripts/`, `content/`, and authored top-level config such as `app.config.ts`, `tsconfig.json`, `package.json`
- exclude: `.output/`, `.vinxi/`, generated bundles, `pdf/`, `node_modules/`
- `.planning/` stays out

Planning implication:

- Phase 7 should encode that boundary explicitly in Biome config and/or scripts

### Pre-commit behavior

The user overrode the default narrower recommendation:

- once `format` and `lint` are trustworthy, Phase 7 should expand pre-commit to include them

Planning implication:

- pre-commit should likely run:
  - a non-mutating format check
  - lint
  - existing content validation / compile / PDF checks
- avoid running the mutating `bun run format --write` inside pre-commit if a check-mode variant is cleaner

## Recommended Fix Shape

Two plans in two waves is the cleanest split.

### Wave 1

**07-01 Restore formatter and Biome config**

- create `biome.jsonc`
- enable Tailwind v4 directive parsing
- define the authored-source file boundary
- make `bun run format` succeed again
- add a non-mutating formatter check command if needed for pre-commit

### Wave 2

**07-02 Scope lint and promote checks into pre-commit**

- make `bun run lint` operate only on the intended authored-source boundary
- fix any real source issues surfaced by the cleaned-up lint scope
- expand `scripts/precommit.ts` to run the reliable formatting/lint checks before the existing content/PDF contract

## Risks and Gotchas

- `bun run lint` currently uses `biome check .`, which combines lint and formatting diagnostics; Phase 7 must decide whether to preserve that shape or make a clearer split without broadening scope.
- If config only uses `vcs.useIgnoreFile` without a narrow `files.includes` boundary, the repo may still lint more than the user wants.
- If pre-commit runs the mutating `format` command instead of a check-only variant, it may rewrite files during commit in a way that is harder to reason about.
- Canonical content markdown is part of authored source, but only if the resulting checks remain practical and low-noise.

## Recommended Plan Split

Two plans in two waves:

### Wave 1

- **07-01 Formatter restoration and Biome configuration**
  - add Biome config
  - enable Tailwind directives
  - define source boundary
  - restore `bun run format`

### Wave 2

- **07-02 Lint scoping and pre-commit promotion**
  - restore `bun run lint` as a source-only command
  - fix resulting real source issues
  - add format/lint checks into `precommit`

## Sources

- Official Biome configuration docs:
  - [Configuration](https://biomejs.dev/reference/configuration/)
- Official Biome Tailwind v4 support notes:
  - [Biome v2.3: Tailwind v4 support](https://biomejs.dev/blog/biome-v2-3/)
  - [Biome 2.3.0 changelog](https://biomejs.dev/internals/changelog/version/2-3-0/)
- Official Biome VCS integration docs:
  - [Integrate Biome with your VCS](https://biomejs.dev/guides/integrate-in-vcs/)
- Local repo evidence:
  - `package.json`
  - `.gitignore`
  - `scripts/precommit.ts`
  - `src/styles/app.css`
  - current `bun run format` and `bun run lint` command output

---
*Phase: 07-tooling-guardrail-cleanup*
*Research completed: 2026-04-03*
