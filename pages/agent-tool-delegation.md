---
type: pattern
summary: Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively.
---

# Get more from agents by delegating repo tasks to tools

The goal is to help agents deliver more value—faster, cheaper, more accurately, and repeatably. A repository can support this by making its purpose-built tools easy for agents to discover and invoke.

Agents should spend their reasoning on understanding the task and making changes. For bounded, repeatable work such as running focused tests or checking formatting, a deterministic tool can often do the job more cheaply and consistently than having an agent reverse-engineer the command or approximate the check itself.

## Try this first

Identify the commands the project already uses for focused tests and routine verification. Make them discoverable from the agent entrypoint or existing task interface, with prerequisites, scope, and whether they change files. Run them in the intended environment and check that their results are actionable.

Reuse existing scripts first. If commands are scattered or hard to invoke, a small task interface such as a [Justfile](justfile-as-agent-facing-task-interface.md) can provide consistent names; introducing one is not required when the current interface already works.

## Expose a stable task interface

Use the repository's existing scripts or task runner to expose a stable, discoverable interface to bounded work. A task runner such as [Just](https://just.systems/) can provide that interface, but is one practical option rather than a universal requirement. See [A Justfile as an agent-facing task interface](justfile-as-agent-facing-task-interface.md) for a focused pattern.

Make the command's [task contract](../concepts/task-interface-contracts.md) explicit: an agent needs to know its scope, prerequisites, cost, side effects, and how to interpret the result. Keep execution details in canonical scripts or recipes so documentation does not become a competing source of commands.

## Offer useful choices without prescribing rigid tiers

Focused checks, a routine handoff gate, broader diagnostics, and mutating commands serve different needs. Use the [gate-versus-diagnostic and side-effect distinctions](../concepts/task-interface-contracts.md#what-the-contract-should-explain) to expose choices appropriate to the repository, rather than prescribing mandatory tiers.

## Make the interface discoverable to agents

A short repository instruction can point the agent to the task interface and explain how to use it. It should identify the repository's routine check and explain how to run a narrower check such as a targeted test. Link to fuller documentation for diagnostics or unusual prerequisites; avoid copying the full task catalog into the instruction.

An agent should choose commands by their documented contract, not infer behavior from familiar names such as `verify`.

## What the repository examples show

The examples span Node.js/JavaScript, Node.js/TypeScript, and Python repositories. They show how focused tests and broader checks can coexist, with dependency, filesystem, and code scans kept apart from routine verification. Recipe composition and the exact meaning of `check` or `verify` vary; related repositories may share names when useful, but should document each task's actual contract. See the [Justfile pattern](justfile-as-agent-facing-task-interface.md) and [repository examples](../sources/repository-justfiles.md).

## The boundary with repository context

A task interface tells an agent **what it can run**. It does not explain the repository's domain, architecture, design constraints, or how to interpret every result. That context is a complementary part of making repositories agent-ready and is covered separately.

For examples of tools grouped by purpose, see [Tool choices by purpose](tools-by-purpose.md).

For a full repository layout showing how a task interface fits alongside `AGENTS.md`, agent documentation, and skills, see [A structure for agent-facing repositories](agent-facing-repository-structure.md).
