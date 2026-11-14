---
type: guide
summary: Choose between reusable task procedures and role profiles, and combine them with tools for a concrete workflow.
---

# Skills and agent profiles

Start with the problem you want to solve, rather than the configuration file you could add. [Skills, profiles, and tools have different jobs](../concepts/skills-profiles-and-tools.md): a procedure, a role, and an executable capability can complement one another.

## Choose the missing piece

If the same task repeatedly needs a particular approach, package that procedure as a skill. It can be used by any suitable role without duplicating the procedure in each profile.

If work needs distinct responsibilities, limits, or handoffs, define a profile. For example, a reviewer role might assess requirements and report findings while a developer role implements changes. The [role-boundary pattern](agent-role-boundaries.md) develops those contracts.

If the agent needs an action it cannot currently perform, provide or configure a tool. A longer procedure cannot substitute for missing execution access.

## Combine them in a workflow

A reviewer profile could use one skill for requirements review and another for test-quality assessment, while invoking tools to read diffs and run focused checks. The profile supplies the role, the skills supply repeatable methods, and the tools supply actions.

Keep permission enforcement separate from the role description: [instructions are not enforced controls](../concepts/instructions-vs-controls.md). A stated read-only role should have appropriately restricted capabilities when that restriction matters.

When documenting a particular harness, state what its implementation actually supports. Keep the underlying purpose distinct from harness-specific names, formats, and loading behavior.

For explicit role responsibilities and limits, see [Define agent role responsibilities and boundaries](agent-role-boundaries.md).
