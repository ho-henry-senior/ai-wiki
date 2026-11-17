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

- **Give the repository the information the agent would otherwise infer.** Put the instructions every task needs in [`AGENTS.md`](../alignment/repository-instructions.md), and keep it short, linking to detail that loads only when a task needs it: [progressive disclosure](../../concepts/progressive-disclosure.md). Record what the code cannot show: decisions in ADRs, schemas, how your repositories relate, and diagrams in Mermaid, which is text the agent reads like any other file and which GitHub renders. [Furnish repositories with context for agents](../alignment/repository-context-for-agents.md).
- **Give it cheap deterministic tools, and tell it how to run them.** Static analysis, linters, type checks, and tests give the same answer every time, and the agent spends tokens only on reading the result; it could approximate some of them by reading code, but more slowly, at greater cost, and less consistently. Name them in a `justfile`, so the agent does not experiment to find how to run them, with focused recipes, such as one test or one file of tests, for while it edits, and a full gate to run once before handoff. Checks raise the standard of the code cheaply; Alignment makes it the right code. [Give agents a command interface with Just](justfile-agent-workflows.md), [let the agent run your repository's commands](../alignment/agent-tool-delegation.md), and [local checks and tools](../../reference/local-development-tools.md).

Do not trade away [security](../security/README.md) controls for speed. A faster run that leaks a credential is the most expensive run of all.

## Try this first

Expose a command for one test file or case, plus a full verification gate, and list both in `AGENTS.md`. On the next task, see whether Copilot runs the focused command while editing and the full gate before handoff.

## Explore further

Two more levers matter once those are in place. A long session resends more context on every turn: in Copilot CLI, `/context` shows what the next request carries and `/compact` summarizes it, as [session history versus context](../../concepts/session-history-vs-context.md) explains. And the model is the biggest price lever: see [choose a model and control cost](choose-a-model-and-control-cost.md). Add a skill only when it pays off: [choose and add skills](useful-skills.md). For background, [evals](../../concepts/evals.md) compare time, tokens, and outcomes across setups, and the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) is an observed workflow, without a measured cost baseline.
