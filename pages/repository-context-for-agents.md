---
type: overview
summary: Working notes on documenting domain, decisions, architecture, and repository boundaries so agents can understand the system they are changing.
status: developing
---

# Furnish repositories with context for agents

These working notes explore ways to give agents relevant repository context. Treat the ideas below as selective follow-ups, not a setup checklist: begin with one missing fact that causes a recurring or consequential misunderstanding and document that first.

<a id="try-this-first"></a>

## Start with the shared entrypoint

Use [Copilot repository instructions](copilot-repository-instructions.md) to explain what the repository does, its essential constraints, and where to find relevant documentation. That guide covers the focused starting technique; add deeper context only when a specific need justifies maintaining it. Check that your agent actually loads the file.

To choose what to add, note an incorrect assumption or repeated question, identify the smallest source-of-truth detail that would resolve it, and link that detail from the entrypoint. A brief explanation near the relevant code or command may be enough.

<a id="record-decisions-including-the-ones-that-were-never-written-down"></a>

## Use ADRs

Architecture Decision Records (ADRs) capture why an important choice was made: its context, alternatives, decision, and consequences. Use one when a consequential decision or repeated ambiguity makes that history valuable; an ADR is not a prerequisite for agent use.

An agent can draft a record from code, tests, and documentation, then ask people to confirm the rationale. Keep observed behavior separate from confirmed reasoning, and state what remains unknown.

<a id="example-a-decision-record-draft"></a>

### Sample ADR

This is a fictional sample ADR record:

> **Status:** Proposed.
>
> **Decision:** Continue rejecting credentials at expiry.
>
> **Evidence:** An existing test checks the behavior; a maintainer confirms the requirement.
>
> **Open question:** Were clock differences between systems considered?
>
> **Consequence:** The test captures the current boundary, but the team still needs to assess the open question.

## Describe boundaries between repositories

In systems spread across repositories, contracts such as schemas, APIs, message formats, and ownership can be implicit. Make these relationships visible when cross-repository changes or recurring misunderstandings make them relevant; a map of every repository is not a starting requirement.

Useful context may include:

- which repositories or components produce and consume a contract;
- where the authoritative schema or interface is defined;
- compatibility expectations and versioning assumptions; and
- where a proposed change needs coordination across repository boundaries.

The aim is to expose the relationship and its source of truth, not to copy every contract into multiple places.

## Use diagrams close to the system they explain

Use a diagram only when it answers a specific question about component boundaries, data flow, deployment, or cross-repository interactions better than a short description. Keep it close to the system it explains and link to it from the related documentation.

Prefer Mermaid when it can express the structure clearly and the target tools can render it: its text source is easier for agents to inspect and maintain than a binary image. Validate the rendered view; use another format when Mermaid or the target tools are unsuitable.

## Make the context discoverable

Use [progressive disclosure](../concepts/progressive-disclosure.md): keep entrypoints concise and link to detail near the subsystem or contract it describes. Agents can then find and load relevant context when needed. Link across repositories rather than relying on an agent to infer the connections.

For larger collections, [retrieval-augmented generation](../concepts/retrieval-augmented-generation.md) can supply relevant passages on demand. It adds retrieval and maintenance costs, so compare it with focused entrypoints and ordinary search for the task.

## Questions to develop

- Which kinds of missing context most often cause agents to make incorrect assumptions?
- How should reverse-engineered behavior and human-confirmed rationale be distinguished?
- Which cross-repository contracts need a shared source of truth, and how should consumers discover it?
- How can diagrams and decision records be kept aligned with changes to the system?
