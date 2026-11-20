---
type: guide
summary: When an agent gets something wrong because it lacked a fact about your system, write that fact down once, near the code it concerns, and link it from AGENTS.md.
status: developing
lane: articles
goal: alignment
order: 4
checked: 2026-11-15
tags:
  - AGENTS.md
---

# Repository context for coding agents

When an agent gets something wrong because it did not know a fact about your system, write that fact down once, near the code it concerns, and link it from `AGENTS.md`.

Do not try to document everything first: you cannot predict which facts an agent will need, and documentation nobody uses goes stale. Each wrong assumption shows you a fact that matters. Keep the instructions every task needs in a short `AGENTS.md`, and link to details that can be loaded for a specific task: [progressive disclosure](../../concepts/progressive-disclosure.md).

## Start with one missing fact

1. **Note the wrong assumption or repeated question.** For example, Copilot used floating-point numbers for money.
2. **Find the smallest source of truth** that would have prevented it: a rule, a decision, or a contract.
3. **Put it where it belongs.** A one-line rule goes in `AGENTS.md` or a [path-specific instructions file](repository-instructions.md#add-rules-for-one-part-of-the-codebase); a decision goes in an ADR; a contract stays where it is defined.
4. **Link it** from `AGENTS.md`, saying when to read it.

## Record decisions in ADRs

An Architecture Decision Record captures why a choice was made: context, alternatives, decision, and consequences. Write one when a decision is costly to reverse or keeps being questioned.

An agent can draft an ADR from the code, tests, and documentation, then ask people to confirm the reasons. Keep what the code shows separate from what a person confirmed, and say what is still unknown. A fictional example:

> **Status:** Proposed.
>
> **Decision:** Keep storing money as integer pence.
>
> **Evidence:** Every amount column is an integer, and a maintainer confirms that floats caused rounding errors in an earlier system.
>
> **Open question:** How should currencies without minor units be stored?
>
> **Consequence:** New code must not introduce floating-point amounts, but the team still needs to answer the open question.

## Describe boundaries between repositories

The Copilot cloud agent works in the repository it is opening a pull request for and cannot read your other repositories. So when a change can break another repository, say so in this one:

- which repositories produce and consume each schema, API, or message format;
- where the authoritative definition lives;
- what compatibility each consumer expects; and
- which changes need coordinating with another team.

Point to the source of truth rather than copying every contract.

## Use diagrams close to the system

Add a diagram only when it answers a question about components, data flow, or deployment better than a sentence does. Prefer Mermaid: agents can read its text, and GitHub renders it. Keep it next to the code it describes.

For very large documentation sets, [retrieval-augmented generation](../../concepts/retrieval-augmented-generation.md) is background reading on how agents can search them.

## Open questions

- Which kinds of missing context cause the most wrong assumptions?
- How should consumers in other repositories find a shared contract?
- How can diagrams and ADRs be kept in step with the code?

## Sources

- [Microsoft Learn: Responsible use of the Copilot coding agent](https://learn.microsoft.com/en-us/training/modules/github-copilot-code-agent/5-responsible-use-github-copilot-code-agent-github) — the agent can access only the repository where it is creating a pull request.
