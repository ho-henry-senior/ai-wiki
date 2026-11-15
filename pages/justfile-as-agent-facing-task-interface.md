---
type: pattern
summary: Use a Justfile to give people and agents a stable, discoverable interface to the repository's existing commands and checks.
---

# A Justfile as an agent-facing task interface

A root `justfile` is a sensible addition to an agent-facing repository. It gives people and agents a stable, discoverable way to find and invoke the commands the project already uses. Treat it as an interface over existing tools, not a replacement build system.

## Expose useful tasks, not every command

Offer a small set of clear recipes for common work, such as setup, focused tests, linting, and routine verification. Recipes should delegate to the repository's existing scripts and tools where practical. Use `just --list` to discover available recipes.

Apply [explicit task contracts](../concepts/task-interface-contracts.md): familiar recipe names such as `check` or `verify` are not universal standards.

## Make each recipe's contract clear

Use recipe comments and clear names to expose the [scope, prerequisites, side effects, and interpretation](../concepts/task-interface-contracts.md#what-the-contract-should-explain) of each task. For example, give a file-rewriting formatter a different recipe from its read-only check, and keep a noisy diagnostic distinct from the routine gate.

## Example: this wiki's Justfile

These recipes are an excerpt from this wiki's [Justfile](../justfile):

```just
# Test and check the sitemap, Markdown formatting, and local links without modifying files.
verify:
    npm run verify

# Check Markdown formatting without modifying files.
format-check:
    npm run format:check

# Apply Markdown formatting (modifies files).
format:
    npm run format
```

`just --list` exposes the recipe names and comments. The checks are separate from the mutating formatter, and the recipes delegate to the wiki's npm scripts. These commands depend on this repository's tooling; they are an example rather than a universal set of recipes. See the Justfile and `package.json` for the current definitions.

## Keep instructions and recipes in sync

Keep executable commands in the `justfile` or in their canonical project scripts. `AGENTS.md` should point to the task interface, explain how to list recipes, and identify the routine check; it should not duplicate the full recipe catalog or shell commands.

## When not to add one

Just is one practical choice, not a requirement. If existing package scripts or another task runner already provide an equally discoverable and dependable interface, use that rather than adding a wrapper layer for its own sake.

## Examples and related guidance

The [Justfile patterns across Node.js and Python repositories](../sources/repository-justfiles.md) show how different projects compose focused tests, routine checks, diagnostics, and mutating recipes. Treat them as examples, not normative recipe names.

For the broader principle of delegating bounded work to deterministic tools, see [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md). For how a task interface fits alongside `AGENTS.md`, skills, and agent documentation, see [A structure for agent-facing repositories](agent-facing-repository-structure.md).
