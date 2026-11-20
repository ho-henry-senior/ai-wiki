---
type: reference
summary: Eight inspected repositories showing agent instructions, task commands, scoped tests, skills and CI checks, with source files and adaptation notes.
status: developing
lane: reference
order: 14
tags:
  - AGENTS.md
  - Commands
---

# Real repository examples: instructions, commands and checks

These eight examples show different ways repositories give coding agents context and repeatable checks. The source files linked here were inspected on 2026-11-20. Follow the links to the full files before copying an approach; their contents and tooling can change. These are working project configurations, **not** tested endorsements or a standard layout.

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

## Next.js: scoped instructions for different kinds of work

**Sources:** [vercel/next.js root `AGENTS.md`](https://github.com/vercel/next.js/blob/canary/AGENTS.md), [`test/AGENTS.md`](https://github.com/vercel/next.js/blob/canary/test/AGENTS.md), and [`package.json`](https://github.com/vercel/next.js/blob/canary/package.json).

The root instructions map the monorepo and tell agents which build and test commands match development, production and bundler modes. The test-directory instructions add rules for deployment coverage, fixture compatibility and router tests. The package scripts provide the matching task entrypoints.

**Adapt:** keep common repository guidance at the root and put test-specific constraints near the tests. Expose commands for distinct test environments rather than relying on a single ambiguous `test` command. **Limit:** its extensive instructions and mode matrix reflect a large framework monorepo; smaller projects need fewer variants. See [repository instructions](../goals/alignment/repository-instructions.md).

## GitHub Agentic Workflows: instructions, skills and CI gates

**Sources:** [github/gh-aw `AGENTS.md`](https://github.com/github/gh-aw/blob/main/AGENTS.md), [developer `SKILL.md`](https://github.com/github/gh-aw/blob/main/.github/skills/developer/SKILL.md), [`Makefile`](https://github.com/github/gh-aw/blob/main/Makefile), and [CI workflow](https://github.com/github/gh-aw/blob/main/.github/workflows/ci.yml).

The entrypoint keeps always-applicable rules and routes task-specific detail to local skills. It names different checks for intermediate saves and final handoff; the Makefile implements those checks, and the CI workflow provides separate automated validation. Workflow-source changes have their own recompilation requirement.

**Adapt:** put essential stop conditions and handoff commands in the main instructions, then keep longer task procedures in skills. Make the named checks executable and maintain CI independently of the agent's account of its work. **Limit:** this project develops an agentic-workflow compiler, so its instruction budget, reporting calls and workflow compilation rules are not general requirements. See [agent tool delegation](../goals/alignment/agent-tool-delegation.md) and [choose and add skills](../goals/economy/useful-skills.md).

## Ruff: testing constraints tied to CI and a threat model

**Sources:** [astral-sh/ruff `AGENTS.md`](https://github.com/astral-sh/ruff/blob/main/AGENTS.md), [repository threat model](https://github.com/astral-sh/ruff/blob/main/.agents/references/repository-threat-model.md), and [CI workflow](https://github.com/astral-sh/ruff/blob/main/.github/workflows/ci.yaml).

The instructions distinguish tests that can run in a sandbox from file-watcher tests that require operating-system events. They give targeted `cargo nextest` commands and rules for reviewing generated snapshots. The repository threat model describes trust boundaries for automation, and CI calls a dedicated security-review workflow for certain pull requests.

**Adapt:** document environment-dependent checks and what to run when a test cannot work in the agent's environment. Link security-review instructions to an explicit model of the repository's actual trust boundaries. **Limit:** the Rust test commands, snapshot settings and CI security-review configuration are specific to Ruff and ty; their presence does not establish that every change is secure. See [untrusted code execution](../goals/security/untrusted-code-execution.md) and [pull request verification evidence](../goals/traceability/pull-request-verification-evidence.md).

## TypeScript: discoverable tasks with scoped handoff gates

**Sources:** [microsoft/TypeScript `AGENTS.md`](https://github.com/microsoft/TypeScript/blob/main/AGENTS.md), [`Herebyfile.mjs`](https://github.com/microsoft/TypeScript/blob/main/Herebyfile.mjs), [`package.json`](https://github.com/microsoft/TypeScript/blob/main/package.json), and [agent contribution rules](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md#contributing-to-typescript-for-agents).

The instructions advertise `npx hereby --tasks` and focused compiler-test commands, then distinguish the normal `validate` gate from `validate --api` or `validate --all` for different changes. The repository's Hereby tasks and package scripts provide a discoverable command interface without a Justfile.

**Adapt:** advertise the project's existing task runner, a focused check and the final gate; explain when a change needs a larger verification scope. **Limit:** this repository's compiler tests, Go-based tooling and contribution policies are highly project-specific. Do not copy its rules or assume every project needs multiple validation modes. See [command interfaces](../goals/economy/justfile-agent-workflows.md).

## Where to go next

For a copyable starting point, use the [AGENTS.md example](agents-md-example.md), [Justfile example](justfile-example.md), or [repository layout example](repository-layout-example.md). Those are **illustrations**, not extracts from these external repositories. For the reasoning behind the choices, see [repository instructions](../goals/alignment/repository-instructions.md), [command interfaces](../goals/economy/justfile-agent-workflows.md), and [agent-facing repository structure](../goals/alignment/agent-facing-repository-structure.md).
