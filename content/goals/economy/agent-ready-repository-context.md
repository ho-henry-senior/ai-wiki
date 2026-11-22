---
type: advice
summary: "Give the agent the facts it would otherwise infer: a short AGENTS.md for what every task needs, and detail it can load when a task calls for it."
status: established
lane: goals
goal: economy
order: 1
tags:
  - AGENTS.md
  - Economy
  - Repository
---

# Well-organised repository context

Give the agent the facts it would otherwise infer: a short `AGENTS.md` for what every task needs, and detail it can load when a task calls for it.

Without them, the agent works facts out from code and history: which command runs the tests, why money is stored as integer pence, which other repository consumes an API. That exploration costs time and [tokens](../../reference/glossary.md#token), and some of its guesses are wrong, so you pay again to correct them.

Organise what you give it:

- **What every task needs** goes in `AGENTS.md`: the commands to run, rules that aren't obvious from the code, and pointers to detail. See [write repository instructions in AGENTS.md](../alignment/repository-instructions.md) and the [AGENTS.md example](../../reference/agents-md-example.md).
- **Detail that only some tasks need** goes in files the agent opens when a task calls for them, linked from `AGENTS.md` with when to read each one: [progressive disclosure](../../concepts/progressive-disclosure.md).
- **Decisions and contracts** stay near the code they concern, in ADRs or where a contract is defined: [repository context for coding agents](../alignment/repository-context-for-agents.md).
- **Where each kind of file goes** is mapped in [Set up a repository for agents](../alignment/agent-facing-repository-structure.md), the guide that collects these pages.

On the next task, notice whether the agent asks about, or guesses, something you have written down. If it does, that fact is missing or hard to find: [start with that one missing fact](../alignment/repository-context-for-agents.md#start-with-one-missing-fact).
