---
type: overview
summary: Stop the agent discovering what you could tell it; give the repository the information it would otherwise infer, and cheap deterministic tools behind a discoverable, focused command interface.
status: established
lane: goals
goal: economy
order: 2
---

# Economy

Stop the agent discovering what you could tell it. When an agent lacks a fact, it infers it from the code and its history; when it does not know how to run your tests or tools, it experiments. Either way you pay in tokens and time, and the result varies from run to run. Telling it, or giving it a tool, is cheaper, faster, and more consistent. A run that misses the outcome entirely is the most expensive of all, which is [Alignment](../alignment/README.md)'s concern.

## Core advice

- **[Give the repository the information the agent would otherwise infer](give-the-repository-information.md)** — Put the instructions every task needs in `AGENTS.md`, and keep it short, linking to detail that loads only when a task needs it: progressive disclosure.
- **[Give it cheap deterministic tools, and tell it how to run them](give-it-cheap-deterministic-tools.md)** — Static analysis, linters, type checks, and tests give the same answer every time, and the agent spends tokens only on reading the result.

Do not trade away [security](../security/README.md) controls for speed. A faster run that leaks a credential is the most expensive run of all.

## Explore further

Two more levers matter once those are in place. A long session resends more context on every turn: in Copilot CLI, `/context` shows what the next request carries and `/compact` summarizes it, as [session history versus context](../../concepts/session-history-vs-context.md) explains. And the model is the biggest price lever: see [choose a model and control cost](choose-a-model-and-control-cost.md). Add a skill only when it pays off: [choose and add skills](useful-skills.md). For background, [evals](../../concepts/evals.md) compare time, tokens, and outcomes across setups, and the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) is an observed workflow, without a measured cost baseline.
