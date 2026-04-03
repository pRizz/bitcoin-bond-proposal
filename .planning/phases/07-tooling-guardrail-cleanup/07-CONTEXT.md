# Phase 7: Tooling Guardrail Cleanup - Context

## Decisions Captured

### Formatter ownership
- `bun run format` should remain the single top-level formatting entrypoint for the repo.
- Phase 7 should prefer repairing the current Biome-plus-Tailwind path first, rather than introducing a second formatter immediately.
- If split formatter responsibility becomes necessary, the user-facing contract still stays one command:
  - no generated files
  - no manual multi-step ritual
  - no repo-wide style sweep beyond what the command actually touches

### Lint scope boundary
- Lintable source should include:
  - `src/`
  - `scripts/`
  - `content/`
  - authored top-level config such as `app.config.ts`, `tsconfig.json`, and `package.json`
- Lint should exclude:
  - `.output/`
  - `.vinxi/`
  - generated asset bundles
  - `pdf/`
  - `node_modules/`
- `.planning/` should stay out of lint scope by default.
- Canonical content markdown should remain in scope only if the resulting checks stay practical and low-noise.

### Guardrail strictness
- `bun run format` and `bun run lint` should be restored as trustworthy, everyday source-level commands rather than merely becoming technically runnable.
- Phase 7 should expand pre-commit to include those checks once they are reliable and correctly scoped.
- The phase should restore the existing guardrails cleanly, not turn into a broad toolchain redesign.

### Failure posture and noise tolerance
- If scoped linting reveals a small number of real source issues, Phase 7 should fix those issues as part of the phase.
- Phase 7 should not become a repo-wide cleanup or style sweep.
- Generated-output problems remain out of scope even if tools can technically see them.
- When choosing between broader and narrower enforcement, Phase 7 should prefer narrow and reliable guardrails.

## Deferred Boundaries
- Do not broaden this phase into general tooling modernization.
- Do not expand formatting or lint scope to planning artifacts unless that becomes explicitly required in a later phase.

Committed understanding:
- Phase 7 is a focused cleanup phase to make formatting, linting, and pre-commit enforcement trustworthy at the authored-source boundary.
