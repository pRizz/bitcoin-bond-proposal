## lesson-phase-7-precommit-expansion | 2026-04-03 03:07 CDT
What went wrong:
- I initially recommended keeping Phase 7 focused on restoring `format` and `lint` without expanding pre-commit.

Preventive rule:
- When a tooling cleanup phase restores source-level guardrails, do not assume pre-commit should stay unchanged; confirm whether the user wants the restored checks promoted into the pre-commit contract.

Trigger signal to catch it earlier:
- The phase goal includes restoring repository guardrails, and the user is explicitly discussing what should count as the final enforcement contract.
