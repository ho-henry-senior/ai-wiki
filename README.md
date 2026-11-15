# Making the most of agents

Practical guidance for developers using AI agents, mostly GitHub Copilot.

## Start here

Three changes worth making first, in this order. Each is small enough to try today.

1. **Tell the agent about your repository.** Add an `AGENTS.md` with your rules and the commands it should run. See [write repository instructions in AGENTS.md](pages/repository-instructions.md), then [let the agent run your repository's commands](pages/agent-tool-delegation.md).
2. **Write your next task down.** State the outcome, how you will know it is done, the checks, and what is out of scope; then steer the agent and check its work. See [define, steer, and verify a task](pages/define-and-verify-tasks.md).
3. **Limit what the agent can do.** Turn on the sandbox on your computer, or check the cloud agent's settings. See [security](pages/security.md).

## By goal

| Goal                                  | It helps you                         | First step                                                   |
| ------------------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| [Alignment](pages/alignment.md)       | get what you asked for               | Write one "Done when" line, then check the result against it |
| [Economy](pages/economy.md)           | spend less time and fewer tokens     | List your test commands in `AGENTS.md`                       |
| [Traceability](pages/traceability.md) | leave a record others can follow     | Check your last agent pull request answers five questions    |
| [Security](pages/security.md)         | limit what an agent can reach and do | Find out where the agent's tools run, then lock that down    |

## Look something up

- [Agent data-flow checklist](pages/agent-data-flow-checklist.md) — review an agent setup before sensitive work.
- [Glossary](pages/glossary.md) — terms used across the wiki.
- [Sitemap](pages/sitemap.md) — every page, grouped by goal and by type, with links to the concept, slide, and source indexes.
