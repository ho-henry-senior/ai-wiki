---
type: guide
summary: Working notes on documenting domain, decisions, architecture, and repository boundaries so agents can understand the system they are changing.
---

# Furnish repositories with context for agents

Purpose-built tools tell agents what they can run. Repository context helps them understand what the system is, why it is shaped as it is, and what constraints apply to a change. The goal is not to maximize documentation volume, but to make relevant context findable when an agent needs it.

These are working notes on areas to explore, not a complete prescription.

## Record decisions, including the ones that were never written down

Architecture Decision Records (ADRs) can preserve the context behind important choices: the problem, constraints, options considered, decision, and consequences. They are useful both for new decisions and for explaining existing designs.

Agents can help recover that context by examining code, configuration, tests, and existing documentation, then proposing a draft decision record. When the rationale is not evident from those sources, an agent can ask focused questions to elicit it from people who know the system. Keep inferred behavior separate from confirmed rationale, and make unknowns explicit rather than presenting guesses as historical fact.

## Describe boundaries between repositories

In a system spread across repositories, important contracts can be implicit: schemas, API shapes, message formats, shared identifiers, or assumptions about ownership and versioning. Making these boundaries visible helps an agent reason about the impact of a change beyond the repository it is editing.

Useful context may include:

- which repositories or components produce and consume a contract;
- where the authoritative schema or interface is defined;
- compatibility expectations and versioning assumptions; and
- where a proposed change needs coordination across repository boundaries.

The aim is to expose the relationship and its source of truth, not to copy every contract into multiple places.

## Use diagrams close to the system they explain

Localized system or architecture diagrams can show how a repository, subsystem, or service participates in a larger system. Depending on the question, a useful diagram might explain component boundaries, data flow, deployment relationships, or cross-repository interactions.

Prefer diagrams that answer a specific question and can be found from the related documentation. A single diagram of the entire organization is unlikely to provide the right level of context for every task.

For diagrams that Mermaid can express clearly and the target tools can render, prefer it as a default. Its text source makes nodes and relationships explicit, is straightforward to author and maintain, and is easier for agents to inspect, generate, and revise than a binary image. Keep the rendered view available to people, and validate it in the target environment. Use another format when Mermaid cannot express the visual structure clearly or rendering support is unsuitable.

## Make the context discoverable

Give agents and developers a clear starting point that links to the relevant domain, decision, interface, and architecture material. Keep detail near the subsystem or contract it describes, and link across repositories rather than relying on an agent to infer the connections.

This complements a repository task interface: the interface answers **what can I run?**; contextual documentation helps answer **what does this system mean, and what should I change?**

## Questions to develop

- Which kinds of missing context most often cause agents to make incorrect assumptions?
- How should reverse-engineered behavior and human-confirmed rationale be distinguished?
- Which cross-repository contracts need a shared source of truth, and how should consumers discover it?
- How can diagrams and decision records be kept aligned with changes to the system?
