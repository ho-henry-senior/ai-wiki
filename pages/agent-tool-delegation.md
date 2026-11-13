---
type: guide
summary: Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively.
---

# Get more from agents by delegating repo tasks to tools

The goal is to help agents deliver more value—faster, cheaper, more accurately, and repeatably. A repository can support this by making its purpose-built tools easy for agents to discover and invoke.

Agents should spend their reasoning on understanding the task and making changes. For bounded, repeatable work such as running focused tests or checking formatting, a deterministic tool can often do the job more cheaply and consistently than having an agent reverse-engineer the command or approximate the check itself.

## Expose a stable task interface

A task runner such as [Just](https://just.systems/) can provide a discoverable interface over the tools a repository already uses. A `justfile` is one practical option, not a universal requirement. The important property is a clear, shared way to find and invoke repository tasks without requiring every agent or developer to reconstruct shell commands.

Keep the runnable recipes in one source of truth. Documentation should explain what a recipe is for and when to use it, rather than duplicating its underlying shell command. The interface should help an agent answer:

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

A short repository instruction can point the agent to the task interface and explain how to use it. It should tell the agent how to list available recipes, which recipe is the repository's routine gate, and how to run a narrower check such as a targeted test. Link to fuller documentation for diagnostics or unusual prerequisites; avoid copying the full recipe catalog into the instruction.

Recipe names such as `verify` and `run-tests-target` appear in the example repositories below, but they are not universal standards. An agent should follow the contract documented by the repository it is working in, not infer behavior from a familiar name.

## What the repository examples show

The examples span Node.js/JavaScript and Node.js/TypeScript repositories, plus Python repositories for REST APIs and queue consumers. They expose tasks through Justfiles while using different tools underneath. Across them, focused tests and broader checks are available, while dependency, filesystem, and code scans are kept apart from routine verification.

The exact meaning of `check` and `verify` varies across these repositories. That variation is a reason to document each recipe's contract—not to assume that one naming scheme is canonical. Related repositories may choose to share a few names or conventions when that makes agents more effective across them, but this is a contextual choice.

See the [Justfile patterns across Node.js and Python repositories](../sources/repository-justfiles.md) for the observed differences.

## The boundary with repository context

A task interface tells an agent **what it can run**. It does not explain the repository's domain, architecture, design constraints, or how to interpret every result. That context is a complementary part of making repositories agent-ready and is covered separately.

For examples of tools grouped by purpose, see [Tool choices by purpose](tools-by-purpose.md).

For a full repository layout showing how a task interface fits alongside `AGENTS.md`, agent documentation, and skills, see [A structure for agent-facing repositories](agent-facing-repository-structure.md).
