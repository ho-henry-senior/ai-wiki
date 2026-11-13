---
type: pattern
summary: Use a Justfile to give people and agents a stable, discoverable interface to the repository's existing commands and checks.
---

# A Justfile as an agent-facing task interface

A root `justfile` is a sensible addition to an agent-facing repository. It gives people and agents a stable, discoverable way to find and invoke the commands the project already uses. Treat it as an interface over existing tools, not a replacement build system.

## Expose useful tasks, not every command

Offer a small set of clear recipes for common work, such as setup, focused tests, linting, and routine verification. Recipes should delegate to the repository's existing scripts and tools where practical. Use `just --list` to discover available recipes.

Recipe names are a local contract, not universal standards. Names such as `check` or `verify` are useful only when their actual behavior is clear and consistent for the repository.

## Make each recipe's contract clear

An agent should be able to tell:

- what the recipe checks or changes;
- when it is appropriate, including how to run a focused check;
- whether it is read-only or modifies files;
- what setup or environment it needs; and
- whether it is a fast routine check or a broader diagnostic.

Repositories often benefit from distinguishing focused tests, a dependable routine gate, broader diagnostics, and mutating commands such as formatters. These are useful distinctions, not required tiers. Keep noisy scans or checks with known baseline findings out of a clean pass/fail gate unless their results are handled explicitly.

## Keep instructions and recipes in sync

Keep executable commands in the `justfile` or in their canonical project scripts. `AGENTS.md` should point to the task interface, explain how to list recipes, and identify the routine check; it should not duplicate the full recipe catalog or shell commands.

## When not to add one

Just is one practical choice, not a requirement. If existing package scripts or another task runner already provide an equally discoverable and dependable interface, use that rather than adding a wrapper layer for its own sake.

## Examples and related guidance

The [Justfile patterns across Node.js and Python repositories](../sources/repository-justfiles.md) show how different projects compose focused tests, routine checks, diagnostics, and mutating recipes. Treat them as examples, not normative recipe names.

For the broader principle of delegating bounded work to deterministic tools, see [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md). For how a task interface fits alongside `AGENTS.md`, skills, and agent documentation, see [A structure for agent-facing repositories](agent-facing-repository-structure.md).
