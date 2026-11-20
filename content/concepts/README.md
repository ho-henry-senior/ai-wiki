# Reusable concepts

This directory holds focused explanations that articles can reuse. Each concept answers one standalone question or explains one useful distinction; it is more than a glossary definition and smaller in scope than a guided article.

## Models, tools, and context

- [The model requests; the harness acts](tool-call-loop.md) — tool definitions, structured requests, results, and a complete exchange.
- [Session history is not active context](session-history-vs-context.md) — saved conversations, context windows, compaction, and API-managed state.
- [Skills, profiles, and tools have different jobs](skills-profiles-and-tools.md) — reusable procedures, roles, and executable capabilities.
- [Load context through focused entrypoints](progressive-disclosure.md) — disclose relevant detail on demand rather than loading everything.

## Security and data handling

- [Local MCP does not mean local-only data](local-and-remote-mcp.md) — execution location, permissions, and downstream network requests.
- [Inference, retention, and training are separate](inference-retention-training.md) — distinct questions about where data goes and how it is used.
- [Invented package names can be real attacks](hallucinated-dependencies.md) — how hallucinated dependencies become malware, and what stops it.
- [Instructions are not enforced controls](instructions-vs-controls.md) — behavioral guidance versus independently enforced permissions.

## Background

These explain general AI ideas behind the guidance. They are not steps in the goal paths.

- [Retrieval-augmented generation](retrieval-augmented-generation.md) — giving the model passages found by search.
- [Vector stores](vector-stores.md) — search by meaning using embeddings.
