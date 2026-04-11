# Content Data

This directory holds small controlled data artifacts that support canonical authored content.

Use it for:

- controlled vocabularies such as proposal kinds and subtypes;
- small manifests and lookup tables for canonical published content;
- seed data that validation and compile scripts consume directly.

Do not use this directory for:

- generated read models;
- public packet documents;
- state proposal narrative entries;
- ad hoc scratch notes.

Canonical authored prose lives in:

- `content/docs/`
- `content/states/`
- `content/explainers/`

Generated artifacts belong outside `content/` so the authored source layer stays obvious.

Refresh workflow outputs such as review queues, stale-entry reports, or refresh-only
summaries must live under `generated/refresh/`. They are repo-owned artifacts, but they
are not canonical published content and must not be treated as substitutes for
`content/states/*.md` records.
