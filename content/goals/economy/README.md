---
type: overview
summary: Stop the agent discovering what you could tell it; give the repository the information it would otherwise infer, and cheap deterministic tools behind a discoverable, focused command interface.
status: established
lane: goals
goal: economy
order: 2
---

# Economy

Stop the agent discovering what you could tell it. Without repository context it infers facts from code and history; without clear commands it experiments, costing time and tokens. Give it the information and deterministic tools it needs to work faster and more consistently. A run that misses the intended outcome is costliest of all; see [Alignment](../alignment/README.md).

## Core advice

- **[Repository context for coding agents](../alignment/repository-context-for-agents.md)** — Keep [`AGENTS.md`](../alignment/repository-instructions.md) short, and link to decisions, schemas and other detail that the agent loads only when needed: [progressive disclosure](../../concepts/progressive-disclosure.md).
- **[Discoverable deterministic checks](discoverable-deterministic-checks.md)** — Static analysis, linters, type checks, and tests give the same answer every time, and the agent spends tokens only on reading the result.

## Explore further

Two more levers matter once those are in place. A long session resends more context on every turn: in Copilot CLI, `/context` shows what the next request carries and `/compact` summarizes it, as [session history versus context](../../concepts/session-history-vs-context.md) explains. And the model is the biggest price lever: see [choose a model and control cost](choose-a-model-and-control-cost.md). For reusable procedures and specialist roles, start with the [Skills and agent roles](../../articles/skills-and-agent-roles.md) series; add a skill only when it pays off. For background, [evals](../../reference/glossary.md#evaluation-eval) compare time, tokens, and outcomes across setups, and the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) is an observed workflow, without a measured cost baseline.
