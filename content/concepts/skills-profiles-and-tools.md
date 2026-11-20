---
type: reference
summary: Add a skill for a repeatable procedure, a profile for a role with limits, and a tool for an action the agent cannot perform; in Copilot these are skills, custom agents, and tools or MCP servers.
status: established
lane: articles
goal: economy
order: 24
checked: 2026-11-15
tags:
  - Skills and custom agents
---

# Skills, agent profiles, and tools

Before you add configuration, name what is missing. Add a **skill** when a task keeps needing the same procedure, a **profile** when work needs a distinct role with its own limits, and a **tool** when the agent needs an action it cannot perform. A longer procedure cannot make up for a missing tool.

|               | Skill                                  | Profile                                                 | Tool                               |
| ------------- | -------------------------------------- | ------------------------------------------------------- | ---------------------------------- |
| Answers       | How should this kind of task be done?  | What is this agent for, and what may it do?             | What action can the agent perform? |
| Example       | A review procedure and report template | A reviewer that reports findings but does not edit code | A command that runs the tests      |
| In Copilot    | `.agents/skills/NAME/SKILL.md`         | A custom agent in `.github/agents/NAME.agent.md`        | Built-in tools and MCP servers     |
| Shared format | Yes: the open Agent Skills standard    | No: each agent product has its own format               | MCP is shared across agents        |

They combine: a reviewer custom agent can use a review skill and a test-quality skill, and call tools to read the diff and run checks.

## Limits

A profile's description does not restrict what it can do. In Copilot, a custom agent's `tools` list controls which tools it can use; if you omit the list, it can use all of them. Set the list when the restriction matters. See [instructions are not enforced controls](instructions-vs-controls.md).

Agents also build features in over time, so check whether Copilot already does what a skill would add. See [choose and add skills](../goals/economy/useful-skills.md).

## Sources

- [Agent Skills specification](https://agentskills.io/specification)
- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- [GitHub Docs: About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [GitHub Docs: Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

Illustrated in the [agent-workflow perspective](../articles/agent-role-boundaries.md) and the [repository layout](../goals/alignment/agent-facing-repository-structure.md).
