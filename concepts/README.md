# Reusable concepts

This directory holds focused explanations that articles can reuse. Each concept answers one standalone question or explains one useful distinction; it is more than a glossary definition and smaller in scope than a guided article.

## Writing a concept

Use descriptive, lowercase, hyphenated filenames and the same `type` and `summary` front matter as [authored pages](../MAINTAINING.md#articles-and-concepts). Concepts normally use `type: reference` or `type: pattern`.

Use the shared [completeness status conventions](../MAINTAINING.md#completeness-status) when a concept has been assessed.

State the core idea first. Keep its explanation, a useful example or diagram, essential caveats, and supporting sources together. Link to articles that apply it and to related concepts where that helps navigation.

Extract a concept when it is useful independently or needed in multiple places. Keep its detailed explanation canonical here; articles should summarize it in their own narrative and link to it. A concept may suit a short slide, but neither a fixed word count nor slide-sized formatting is required. Keep brief definitions in the [glossary](../pages/glossary.md), linking here for depth.

[Short slides](../slides/README.md) summarize selected concepts and link back here for the fuller explanation.

Follow [the freshness guidance](../MAINTAINING.md#keeping-content-current) when editing concepts. Add new concepts to this index and the relevant outcome overviews linked from [the homepage](../README.md).

## Models, tools, and context

- [The model requests; the harness acts](tool-call-loop.md) — tool definitions, structured requests, results, and a complete exchange.
- [Session history is not active context](session-history-vs-context.md) — saved conversations, context windows, compaction, and API-managed state.
- [Skills, profiles, and tools have different jobs](skills-profiles-and-tools.md) — reusable procedures, roles, and executable capabilities.
- [Load context through focused entrypoints](progressive-disclosure.md) — disclose relevant detail on demand rather than loading everything.
- [Retrieval-augmented generation](retrieval-augmented-generation.md) — use retrieved information as context, with quality and security limits.
- [Vector stores](vector-stores.md) — similarity search, embeddings, filtering, and maintenance.

## Security and data handling

- [Local MCP does not mean local-only data](local-and-remote-mcp.md) — execution location, permissions, and downstream network requests.
- [Inference, retention, and training are separate](inference-retention-training.md) — distinct questions about where data goes and how it is used.
- [Secrets can leak through tool output](secrets-in-tool-output.md) — accidental exposure through diagnostics, history, and later requests.
- [A worktree is not a sandbox](worktrees-not-sandboxes.md) — separating changes versus restricting execution.
- [Instructions are not enforced controls](instructions-vs-controls.md) — behavioral guidance versus independently enforced permissions.

## Repository feedback

- [Evals](evals.md) — task-specific cases, checks, comparisons, and limitations.
- [Hill climbing](hill-climbing.md) — iterative local improvement, deterministic and stochastic search, and evaluation limits.
- [Task names need explicit contracts](task-interface-contracts.md) — scope, side effects, prerequisites, and gates versus diagnostics.
- [Passing tests are evidence, not proof](tests-are-evidence.md) — assertions, intended behavior, and independent expectations.
