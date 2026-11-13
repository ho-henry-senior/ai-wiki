---
type: guide
summary: Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively.
---

# Get more from agents by delegating repo tasks to tools

The goal is to help agents deliver more value—faster, cheaper, more accurately, and repeatably. A repository can support this by making its purpose-built tools easy for agents to discover and invoke.

Agents should spend their reasoning on understanding the task and making changes. For bounded, repeatable work such as running focused tests or checking formatting, a deterministic tool can often do the job more cheaply and consistently than having an agent reverse-engineer the command or approximate the check itself.

## Expose a stable task interface

Use the repository's existing scripts or task runner to expose a stable, discoverable interface to bounded work. A task runner such as [Just](https://just.systems/) can provide that interface, but is one practical option rather than a universal requirement. See [A Justfile as an agent-facing task interface](justfile-as-agent-facing-task-interface.md) for a focused pattern.

Keep runnable commands in one source of truth. Documentation should explain what a task is for and when to use it, rather than duplicating its underlying shell command. The interface should help an agent answer:

- What tasks are available?
- Which task is appropriate for this change?
- What does it check, and how long or costly is it likely to be?
- Does it modify files, need special setup, or produce output that requires interpretation?

## Offer useful choices without prescribing rigid tiers

Many repositories benefit from offering:

- **Focused checks** for fast feedback, such as running one test file without coverage.
- **A dependable routine gate** for checking a change before handoff.
- **Broader diagnostics** for deeper investigation, such as dependency or code scans.
- **Explicitly mutating commands** for formatting or applying fixes.

These are useful distinctions, not mandatory categories. Choose commands that fit the repository and explain their actual scope. A routine gate should give a stable, actionable signal on a healthy repository. Checks with known baseline findings or noisy output can still be valuable, but should be presented as diagnostics rather than as a clean pass/fail gate. File-changing commands should be clearly identified.

## Make the interface discoverable to agents

A short repository instruction can point the agent to the task interface and explain how to use it. It should identify the repository's routine check and explain how to run a narrower check such as a targeted test. Link to fuller documentation for diagnostics or unusual prerequisites; avoid copying the full task catalog into the instruction.

Task names such as `verify` and `run-tests-target` appear in the example repositories, but they are not universal standards. An agent should follow the contract documented by the repository it is working in, not infer behavior from a familiar name.

## What the repository examples show

The examples span Node.js/JavaScript, Node.js/TypeScript, and Python repositories. They show how focused tests and broader checks can coexist, with dependency, filesystem, and code scans kept apart from routine verification. Recipe composition and the exact meaning of `check` or `verify` vary; related repositories may share names when useful, but should document each task's actual contract. See the [Justfile pattern](justfile-as-agent-facing-task-interface.md) and [repository examples](../sources/repository-justfiles.md).

## The boundary with repository context

A task interface tells an agent **what it can run**. It does not explain the repository's domain, architecture, design constraints, or how to interpret every result. That context is a complementary part of making repositories agent-ready and is covered separately.

For examples of tools grouped by purpose, see [Tool choices by purpose](tools-by-purpose.md).

For a full repository layout showing how a task interface fits alongside `AGENTS.md`, agent documentation, and skills, see [A structure for agent-facing repositories](agent-facing-repository-structure.md).
