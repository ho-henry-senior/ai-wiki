---
type: reference
summary: Four inspected repository examples of agent instructions, task commands, CI verification, and agent resource layout, with source files and adaptation notes.
status: developing
lane: reference
order: 14
tags:
  - AGENTS.md
  - Commands
---

# Real repository examples: instructions, commands and checks

These four examples show different ways repositories give coding agents context and repeatable checks. Each source file was inspected on 2026-11-20. Follow the links to the full files before copying an approach; their contents and tooling can change. These are working project configurations, **not** tested endorsements or a standard layout.

## VS Code: a short instructions entrypoint

**Source:** [microsoft/vscode `AGENTS.md`](https://github.com/microsoft/vscode/blob/main/AGENTS.md) and its [detailed Copilot instructions](https://github.com/microsoft/vscode/blob/main/.github/copilot-instructions.md).

The root file points agents to the fuller project guidance, while keeping a specific rule about cancellation tokens directly in the entrypoint. It shows how a short file can expose one essential constraint without repeating an entire manual.

**Adapt:** keep task-critical rules in the entrypoint and link to project documentation for details. **Limit:** a link is not proof that every agent loads the target file; check the tool's instruction-loading behaviour. The cancellation rule is specific to VS Code.

## Just: focused tests and a broader check

**Source:** [casey/just `justfile`](https://github.com/casey/just/blob/master/justfile).

The project's recipes include a `filter PATTERN` test selector, a broader `test` recipe, and a `ci` recipe composed of tests, documentation work, lint and formatting checks. It also groups development, test, check and release recipes, making their purposes visible.

**Adapt:** expose a focused test command and a larger handoff gate using the runner you already have. Keep publishing and other mutating recipes separate. **Limit:** the commands depend on Rust, Cargo and this project's own aliases and tools. They are not portable recipes to paste into another repository.

## Awesome Copilot: agent resource folders with stated conventions

**Source:** [github/awesome-copilot `AGENTS.md`](https://github.com/github/awesome-copilot/blob/main/AGENTS.md).

The instructions map `agents/`, `instructions/`, `skills/`, `hooks/`, `workflows/` and `plugins/` to distinct purposes. They also state required front matter and give validation and generation commands for contributors. The value is the **relationship between resource types and their checks**, not the number of directories.

**Adapt:** document each agent-specific directory when it exists and name the checks that validate its contents. **Limit:** Awesome Copilot is itself a distribution of agent resources and plugins. Its large structure would be excessive for a typical application repository.

## This wiki: one verification path from instructions to CI

**Sources:** [`AGENTS.md`](https://github.com/ho-henry-senior/ai-wiki/blob/main/AGENTS.md), [`justfile`](https://github.com/ho-henry-senior/ai-wiki/blob/main/justfile), [`package.json`](https://github.com/ho-henry-senior/ai-wiki/blob/main/package.json) and [`verify.yml`](https://github.com/ho-henry-senior/ai-wiki/blob/main/.github/workflows/verify.yml).

`AGENTS.md` tells contributors and agents to run `just verify`. The `justfile` delegates to npm scripts; the GitHub Actions workflow runs the same verification script on pull requests. This is an inspectable example of **instructions, a named task and independent CI checking the same requirements**.

**Adapt:** make the documented handoff command and CI invoke the same underlying checks. **Limit:** the task runner is a convenience, not enforcement; CI and repository rules provide the independent gate. This project checks Markdown, links and style, not application tests.

## Where to go next

For a copyable starting point, use the [AGENTS.md example](agents-md-example.md), [Justfile example](justfile-example.md), or [repository layout example](repository-layout-example.md). Those are **illustrations**, not extracts from these external repositories. For the reasoning behind the choices, see [repository instructions](../goals/alignment/repository-instructions.md), [command interfaces](../goals/economy/justfile-agent-workflows.md), and [agent-facing repository structure](../goals/alignment/agent-facing-repository-structure.md).
