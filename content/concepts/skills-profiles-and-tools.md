---
type: explanation
summary: What an agent role is, when to add one, and how it differs from a skill and a tool, with a Copilot custom-agent example and its permission limits.
status: established
lane: guides
goal: economy
order: 24
checked: 2026-11-20
verification: "Checked against GitHub's agent-skills and custom-agent configuration documentation; see Sources for the relevant references."
tags:
  - Copilot
  - Agent roles
  - Skills
---

# Agent roles

An **agent role** says what an agent is responsible for, where its work stops, and what it hands back to a person or another agent. Roles help when work genuinely needs distinct responsibilities or independent review, but each extra role adds coordination. Start with one agent and a human reviewer, and add a role only when clear responsibilities and handoffs improve a recurring workflow.

A role differs from a **skill**, which provides a repeatable procedure, and a **tool**, which makes an action possible. Choosing the wrong one creates either duplicated instructions or a capability the agent still cannot use.

In GitHub Copilot, a role can be implemented as a **custom agent** in a profile file such as `.github/agents/reviewer.agent.md`. Agent roles are the general idea; _custom agent_ and _agent profile_ are Copilot's configuration terms.

<!-- include -->

[Table: how an agent role compares with AGENTS.md, a skill and a tool](../includes/skills-instructions-roles-tools.md)

For what a skill is and how to find, write and test one, see the [Skills](../goals/economy/useful-skills.md) guide.

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
description: >-
  Reviews a pull request against its issue's acceptance
  criteria and reports findings. Does not change code.
tools: ["read", "search"]
---

Compare the diff with each acceptance criterion in the
linked issue. Report what is met, what is missing, and
any risk.
```

GitHub's [custom-agent configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration) specifies the `tools` field: it limits the tools exposed to the custom agent; when omitted, all available tools are enabled by default. A tool restriction does not itself prove the agent has no other side effects, and its instructions cannot replace repository protections or external approvals. See [Instructions and enforced controls](instructions-vs-controls.md).

## Combine roles and skills

A reviewer role can use a reusable review skill if that skill is available in the agent's environment. The role owns **which changes to review, what to deliver, and where authority ends**. The skill owns **the repeatable review procedure**. Tools provide access to the diff, tests and permitted actions.

Naming a skill in a role's instructions doesn't install it or guarantee it loads, and the skill's steps need tools the role has; see [check discovery and tool access](../reference/agent-roles-directory.md#check-discovery-and-tool-access), with examples from real role files.

## Sources

- [Agent Skills specification](https://agentskills.io/specification)
- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- [GitHub Docs: About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [GitHub Docs: Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

The [agent-workflow perspective](../articles/agent-role-boundaries.md) illustrates role handoffs. **Checked:** 2026-11-20 against GitHub's agent-skills and custom-agent configuration documentation.
