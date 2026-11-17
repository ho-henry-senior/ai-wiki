# Making the most of agents

Practical guidance for developers using AI agents, mostly GitHub Copilot.

## Start here

Three changes worth making first, in this order. Each is small enough to try today.

1. **Show the agent how to work in your repository.** Give it named commands for focused tests and final checks (for example, in a `justfile`), then tell it when to use them in `AGENTS.md`. That saves time and tokens otherwise spent discovering the workflow. See [give agents a command interface with Just](pages/justfile-agent-workflows.md) and [write repository instructions in AGENTS.md](pages/repository-instructions.md).
2. **Agree on the problem before delegating the solution.** An agent can build a convincing solution to the wrong problem. Ask it to challenge your assumptions and question missing requirements, then draft a specification. Review and agree that specification before asking the agent to create issues and implement them. See [define, steer, and verify a task](pages/define-and-verify-tasks.md).
3. **Limit what the agent can do.** A mistake or an injected instruction does harm through the tools and access the agent has, and through changes it leaves for CI or other people to run, so limit those. Turn on the sandbox on your computer, or check the cloud agent's settings. See [security](pages/security.md).

## By goal

- **[Alignment](pages/alignment.md)** — Solve the problem you intended.
- **[Economy](pages/economy.md)** — Spend less time and fewer tokens.
- **[Security](pages/security.md)** — Limit what an agent can reach and do.
- **[Traceability & Trust](pages/traceability.md)** — Leave a record others can follow, and review changes you can rely on.

## Look something up

- [Agent data-flow checklist](pages/agent-data-flow-checklist.md) — review an agent setup before sensitive work.
- [Glossary](pages/glossary.md) — terms used across the wiki.
- Indexes of every [page](pages/README.md), [concept](concepts/README.md), [slide](slides/README.md), and [source](sources/README.md).

