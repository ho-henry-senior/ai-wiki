---
type: reference
summary: Skills provide reusable procedures, profiles describe roles, and tools expose executable actions.
---

# Skills, profiles, and tools have different jobs

Skills, agent profiles, and tools can all influence an agent's work, but they serve different purposes. This is a portable working distinction, not a guarantee of identical naming or behavior across harnesses.

|                  | Skill                                                  | Agent profile                                          | Tool                                      |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------ | ----------------------------------------- |
| Main purpose     | Supply reusable, task-specific knowledge or procedures | Describe a role, operating behavior, and scope         | Perform an executable action              |
| Typical question | How should this kind of task be approached?            | What work is this agent expected and authorized to do? | What action can the system perform?       |
| Example          | A review procedure and reporting template              | A reviewer with explicit responsibilities and handoffs | A command that reads a diff or runs tests |

A reviewer profile may use a review skill and invoke several tools. A skill can package scripts, but the harness still needs an execution capability to run them.

## Limits

The mechanisms overlap, and a harness may provide equivalent behavior as a built-in feature. Check its actual formats, discovery rules, and capabilities.

A profile's stated limits are not automatically enforced tool permissions. See [Instructions are not enforced controls](instructions-vs-controls.md).

## Sources and applications

- [Agent Skills specification](https://agentskills.io/specification) — skills as instructions and optional supporting resources.
- [GitHub: Agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills) — Copilot's on-demand procedures.
- Applied in [Skills and agent profiles](../pages/skills-and-agent-profiles.md), [the changing capability layer](../pages/skills-as-capabilities.md), and [the repository layout](../pages/agent-facing-repository-structure.md).
