# Making the most of agents

Practical guidance for developers using AI agents, mostly GitHub Copilot.

## Start here

Three changes worth making first, in this order. Each is small enough to try today.

1. **Show the agent how to work in your repository.** Give it named commands for focused tests and final checks (for example, in a `justfile`), then tell it when to use them in `AGENTS.md`. That saves time and tokens otherwise spent discovering the workflow. See [give agents a command interface with Just](pages/justfile-agent-workflows.md) and [write repository instructions in AGENTS.md](pages/repository-instructions.md).
2. **Agree on the problem before delegating the solution.** An agent can build a convincing solution to the wrong problem. Ask it to challenge your assumptions and question missing requirements, then draft a specification. Review and agree that specification before asking the agent to create issues and implement them. See [define, steer, and verify a task](pages/define-and-verify-tasks.md).
3. **Limit what the agent can do.** A mistake or an injected instruction does harm through the tools and access the agent has, and through changes it leaves for CI or other people to run, so limit those. Turn on the sandbox on your computer, or check the cloud agent's settings. See [security](pages/security.md).

## By goal

| Goal                                  | It helps you                         | First step                                                   |
| ------------------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| [Alignment](pages/alignment.md)       | solve the problem you intended        | Ask an agent to question your requirements before coding     |
| [Economy](pages/economy.md)           | spend less time and fewer tokens     | List your test commands in `AGENTS.md`                       |
| [Traceability](pages/traceability.md) | leave a record others can follow     | Check your last agent pull request answers five questions    |
| [Security](pages/security.md)         | limit what an agent can reach and do | Find out where the agent's tools run, then lock that down    |

## Look something up

- [Agent data-flow checklist](pages/agent-data-flow-checklist.md) — review an agent setup before sensitive work.
- [Glossary](pages/glossary.md) — terms used across the wiki.
- [Sitemap](pages/sitemap.md) — every page, grouped by goal and by type, with links to the concept, slide, and source indexes.

For this repository's design and editorial rules, see [maintainer documentation](maintainers/README.md). This material is kept on GitHub, not the public wiki.
