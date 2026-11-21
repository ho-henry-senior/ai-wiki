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

- **[Well-organised repository context](agent-ready-repository-context.md)** — Give the agent the facts it would otherwise infer: a short `AGENTS.md` for what every task needs, and detail it can load when a task calls for it.
- **[Discoverable deterministic checks](discoverable-deterministic-checks.md)** — Static analysis, linters, type checks, and tests give the same answer every time, and the agent spends tokens only on reading the result.

## Explore further

Two more levers matter once those are in place. A long session resends more context on every turn: in Copilot CLI, `/context` shows what the next request carries and `/compact` summarizes it, as [session history and active context](../../concepts/session-history-vs-context.md) explains. And the model is the biggest price lever: see [choose a model and control cost](choose-a-model-and-control-cost.md). For reusable procedures, start with the [Skills guide](useful-skills.md); for specialist roles, see [Agent roles](../../concepts/skills-profiles-and-tools.md). Add a skill only when it pays off. For background, [evals](../../reference/glossary.md#evaluation-eval) compare time, tokens, and outcomes across setups, and the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) is an observed workflow, without a measured cost baseline.
