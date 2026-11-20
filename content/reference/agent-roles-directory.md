---
type: explanation
summary: How agent roles can call reusable skills, illustrated by four original role files from the lo-fi software factory case study.
status: developing
lane: articles
series: skills-and-agent-roles
seriesOrder: 4
checked: 2026-11-20
order: 13
tags:
  - Skills and custom agents
---

# How agent roles use skills

An **agent role** has a responsibility, boundaries and a handoff. A **skill** supplies a reusable procedure that the role may call on. Keeping these separate lets multiple roles reuse a procedure without inheriting one another's responsibilities. For the distinction and a complete Copilot custom-agent example, see [Agent roles, skills and tools](../concepts/skills-profiles-and-tools.md).

The four [original role files](../../data/role-examples/product.agent.md) below come from the [lo-fi software factory case study](../articles/lo-fi-software-factory-case-study.md). They describe one project's workflow, not a standard agent architecture or tested general configuration.

## Roles that name skills

### Product

**Source:** [product.agent.md](../../data/role-examples/product.agent.md).

The Product role directs its agent to check that globally installed `grill-me` is available, use it for requirements interviews, then call `to-spec` to draft a specification. It requires **human approval** before handing the specification to the Business Analyst. Its role-specific limit of five questions per batch belongs to the role, not to either skill.

### Business Analyst

**Source:** [business-analyst.agent.md](../../data/role-examples/business-analyst.agent.md).

The Business Analyst role uses the approved specification as input, checks for the globally installed `to-tickets` skill, and uses it to prepare an issue breakdown. It must ask for approval **before publishing issues**, even if a skill supports publishing them. The role, not the skill, owns that approval boundary.

These role files refer to skills by name. They do **not** prove that a particular Copilot session found, loaded or successfully executed those skills. The files explicitly instruct the agent to report unavailable skills rather than pretend to have used them.

## Roles that do not name skills

### Developer

**Source:** [developer.agent.md](../../data/role-examples/developer.agent.md).

The Developer role implements one selected issue, runs repository checks and opens a PR, with rules for dispatched and interactive runs. The supplied file does not explicitly call a skill. A reader **could adapt** the workflow to use a test-driven-development skill for the testing procedure, while retaining issue scope and PR handoff in the role. That is an adaptation, **not** what the supplied file does.

### Reviewer

**Source:** [reviewer.agent.md](../../data/role-examples/reviewer.agent.md).

The Reviewer role assesses a PR and verification evidence, reports findings and leaves approval to a human. Its supplied instructions do not explicitly call a skill. A reader **could adapt** it to use a reusable review checklist skill, but the role must still define what to review and who approves. Again, this is a proposed adaptation, not an observed use.

For original sources and their cautions, consult the standalone [agent skills directory](agent-skills-directory.md).

## Check discovery and tool access

In Copilot, skills and custom agents are separate customizations. Supported environments can discover skills through their [documented search locations and loading behaviour](https://docs.github.com/en/copilot/concepts/customizations/agent-skills). A role's mention of a skill is an instruction to use it, **not** a mechanism that installs it or guarantees it loads. Before relying on a pairing, check whether the skill exists in that environment and try the full task.

A Copilot custom agent's [`tools` configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration) controls which tools it can request. A skill that calls a command cannot work as written if its role lacks an execution tool; similarly, a skill needing GitHub access cannot create issues when its agent lacks the necessary tool or permissions. Match the skill's steps to the role's available capabilities and test the combination. No `tools` field is present in the four original example files, so do not treat their written boundaries as enforced access controls.

**Checked:** 2026-11-20 against GitHub's agent-skills and custom-agent configuration documentation. Configuration and support differ by Copilot surface.

For the wider workflow and human handoffs, see [Agile roles in agentic development](../articles/agent-role-boundaries.md).
