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

Once the agent has repository context and discoverable commands, there are other ways to improve economy:

- **Manage session context.** Long sessions can carry growing amounts of context. In Copilot CLI, `/context` shows what the next request carries and `/compact` summarises it. See [Session history and active context](../../concepts/session-history-vs-context.md).
- **Choose a cost-effective model.** Model selection is a major cost lever. See [Choose a model and control cost](choose-a-model-and-control-cost.md).
- **Reuse procedures where worthwhile.** See the [Skills guide](useful-skills.md) for repeatable procedures and [Agent roles](../../concepts/skills-profiles-and-tools.md) for specialist responsibilities. Add customisation only when it pays off.

For background, [evaluation (evals)](../../reference/glossary.md#evaluation-eval) explains comparing outcomes across setups. The [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) describes an observed workflow, but does not establish a measured cost saving.
