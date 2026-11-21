---
type: explanation
summary: How agent roles, reusable skills and executable tools differ, with a Copilot custom-agent example and permission boundaries.
status: established
lane: guides
goal: economy
order: 24
checked: 2026-11-20
tags:
  - Copilot
  - Agent roles
  - Skills
---

# Agent roles, skills and tools

A **role** says what responsibility an agent takes and where it hands work back; a **skill** provides a repeatable procedure; a **tool** makes an action possible. Choosing the wrong one creates either duplicated instructions or a capability the agent still cannot use.

In GitHub Copilot, a role can be implemented as a **custom agent** in a profile file such as `.github/agents/reviewer.agent.md`. Agent roles are the general idea; _custom agent_ and _agent profile_ are Copilot's configuration terms.

|               | Skill                        | Agent role                         | Tool                        |
| ------------- | ---------------------------- | ---------------------------------- | --------------------------- |
| Answers       | How should the task be done? | What is the agent responsible for? | What action can it perform? |
| Example       | Review procedure             | Reviewer role                      | Test command                |
| In Copilot    | Agent Skills                 | Custom agent                       | Built-in tools or MCP       |
| Shared format | Open Agent Skills standard   | Product-specific profile           | MCP for shared tools        |

In Copilot, a skill can live at `.agents/skills/NAME/SKILL.md`, a custom agent profile at `.github/agents/NAME.agent.md`, and an executable action can be a built-in tool or an MCP server.

To decide when a skill is warranted, see [Skills](../goals/economy/useful-skills.md). To create one, see [Write a SKILL.md](../reference/writing-agent-skills.md).

## Define the role's contract

A role is more than a descriptive label. Write down what it produces, what work it owns, what is out of scope, and what it hands to a person or another role.

- **Purpose:** the outcome it exists to produce.
- **Expected work:** responsibilities and decisions it may prepare.
- **Out of scope:** work it must not take on and decisions it must return to a human.
- **Handoff:** the output a reviewer or the next role needs.

These instructions state intended behaviour; they are **not enforced permission boundaries**.

## Example: a Copilot reviewer

A custom agent can describe a reviewer that reports findings without editing code:

```markdown
---
name: reviewer
description: Reviews a pull request against its issue's acceptance criteria and reports findings. Does not change code.
tools: ["read", "search"]
---

Compare the diff with each acceptance criterion in the linked issue. Report what is met, what is missing, and any risk.
```

GitHub's [custom-agent configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration) specifies the `tools` field: it limits the tools exposed to the custom agent; when omitted, all available tools are enabled by default. A tool restriction does not itself prove the agent has no other side effects, and its instructions cannot replace repository protections or external approvals. See [Instructions and enforced controls](instructions-vs-controls.md).

## Combine roles and skills

A reviewer role can use a reusable review skill if that skill is available in the agent's environment. The role owns **which changes to review, what to deliver, and where authority ends**. The skill owns **the repeatable review procedure**. Tools provide access to the diff, tests and permitted actions.

Naming a skill in an agent's instructions is not a guarantee that the skill is present or loaded. Skills are discovered according to the Copilot environment and its [agent-skills support](https://docs.github.com/en/copilot/concepts/customizations/agent-skills); the skill's steps also need suitable tools. For examples drawn from actual role files, continue to [How agent roles use skills](../reference/agent-roles-directory.md).

## Sources

- [Agent Skills specification](https://agentskills.io/specification)
- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- [GitHub Docs: About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [GitHub Docs: Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

The [agent-workflow perspective](../articles/agent-role-boundaries.md) illustrates role handoffs. **Checked:** 2026-11-20 against GitHub's agent-skills and custom-agent configuration documentation.
