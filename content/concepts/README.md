# Reusable concepts

This directory holds focused explanations that articles can reuse. Each concept answers one standalone question or explains one useful distinction; it is more than a glossary definition and smaller in scope than a guided article.

## Models, tools, and context

- [The tool-call loop](tool-call-loop.md) — how the model requests tools, the harness permits or refuses them, and results inform the next step.
- [Session history and active context](session-history-vs-context.md) — saved conversations, context windows, compaction, and API-managed state.
- [Agent roles](skills-profiles-and-tools.md) — what a role is, and how it differs from a skill and a tool.
- [Progressive disclosure](progressive-disclosure.md) — disclose relevant detail on demand rather than loading everything.

## Security and data handling

- [Local MCP servers and data access](local-and-remote-mcp.md) — execution location, permissions, and downstream network requests.
- [Inference, data retention, and model training](inference-retention-training.md) — distinct questions about where data goes and how it is used.
- [Invented dependencies and supply-chain attacks](hallucinated-dependencies.md) — how hallucinated dependencies become malware, and what stops it.
- [Instructions and enforced controls](instructions-vs-controls.md) — behavioral guidance versus independently enforced permissions.

## Background

These explain general AI ideas behind the guidance. They are not steps in the goal paths.

- [Retrieval-augmented generation](retrieval-augmented-generation.md) — giving the model passages found by search.
