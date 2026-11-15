---
type: reference
summary: Use AGENTS.md as a concise repository entrypoint, with Copilot CLI support and explicit limits on portability.
status: established
---

# AGENTS.md as a shared agent entrypoint

`AGENTS.md` is a useful convention for giving coding agents repository-level instructions. Treat it as a shared entrypoint, not a guarantee that every harness will load the same instructions. This page focuses on the portable practice and Copilot CLI, rather than other products' setup.

## What the documentation says

GitHub documents `AGENTS.md` as a source of Copilot CLI instructions, discovered in repository and working-directory locations and along paths relevant to the files being worked on. Applicable instruction files are combined; the documentation does not define a general precedence order between them, so avoid conflicting guidance.

These are Copilot CLI behaviors, not a loading contract for every harness. Check the [current custom-instruction documentation](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) and verify discovery in the client in use.

## What to put in the entrypoint

Keep the file short enough to be useful as routinely loaded context. Prefer stable, repository-wide guidance:

- a brief description of the system and important boundaries;
- constraints or conventions that materially affect changes and are not obvious from code;
- the dependable setup, test, lint, and build commands, or a link to their canonical documentation;
- a small map to deeper domain, architecture, decision, and cross-repository context; and
- guidance on where to look for task-specific instructions.

Use [progressive disclosure](../concepts/progressive-disclosure.md): keep starting context small and make task-specific detail discoverable. Verify whether a reference is an ordinary link or an eager import in the chosen harness.

Avoid turning the file into a duplicate of the README, a complete architecture manual, or a list of rules already enforced by tools. If different harnesses need different native files, keep one canonical source where practical and make any adapters or imports explicit. Do not assume that nested files, imports, or precedence behave the same across tools.

## Example: this wiki's entrypoint

This shortened illustration is adapted from this wiki's [AGENTS.md](../AGENTS.md):

```markdown
# Working in this wiki

This repository is a Markdown knowledge base, not an application.

## Find the relevant context

- Before substantive content or structural changes, read [the design goals](DESIGN-GOALS.md).
- To locate a topic, use [the homepage](README.md).

## Make and verify changes

Use `just --list` to discover tasks and `just verify` before handoff.
See [maintenance](MAINTAINING.md) for setup details.
```

The entrypoint identifies the kind of project, tells an agent when to load relevant context, and points to the task interface. It does not reproduce the full design goals or command implementations. The linked file is the current, fuller version; other repositories will need different context and checks.

For a complete illustrative layout that places `AGENTS.md` alongside agent documentation, skills, and task commands, see [A structure for agent-facing repositories](agent-facing-repository-structure.md).

## Findings and limitations

`AGENTS.md` is a shared convention, not a guarantee of uniform runtime behavior. Keep its purpose clear, link it from the project's main documentation, and validate discovery in the harness in use. Its content is also [guidance, not enforced access control](../concepts/instructions-vs-controls.md).

## Sources

- [GitHub Copilot CLI: Add custom instructions](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [AGENTS.md convention](https://github.com/agentsmd/agents.md)

Copilot CLI discovery and combination behavior checked 14 November 2026; harness behavior can change.
