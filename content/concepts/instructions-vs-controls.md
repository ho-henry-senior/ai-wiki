---
type: reference
summary: Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly.
status: established
lane: articles
goal: security
order: 21
tags:
  - Security
  - Permissions and sandboxing
---

# Instructions and enforced controls

Asking an agent to avoid an action differs from preventing that action. Instructions guide behavior; access restrictions must be enforced by the [harness](../reference/glossary.md#agent-harness), tool, operating system, or connected service.

For example, "use the database read-only" asks the model to behave. A database identity without write privileges prevents writes through that identity even if the agent requests one.

In Copilot, writing "never push to `main`" in `AGENTS.md` is an instruction. Starting Copilot CLI with `--deny-tool='shell(git push)'`, protecting the branch, or leaving `execute` out of a custom agent's `tools` list, so it cannot run shell commands at all, is a control.

## Use layers

Keep instructions explicit, but combine them with narrowly scoped tools and credentials, filesystem and network restrictions, and meaningful approval for consequential actions. Treat retrieved content as data rather than authority to widen access.

The same distinction applies to role profiles: saying that a reviewer does not implement changes is a role contract, not proof that its tools cannot edit files.

No single layer guarantees safety. Scanning and redaction may miss sensitive content; approval can be poorly informed; a sandbox may cover one tool but not another. Check each integration's actual execution and authorization path.

## Sources and applications

- [OWASP: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) — enforce minimal permissions and independent approval.
- [OWASP: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — untrusted inputs and layered mitigations.
- Applied in [secure a local coding agent](../goals/security/local-agent-security.md), [the data-flow checklist](../reference/agent-data-flow-checklist.md), and [repository instructions](../goals/alignment/repository-instructions.md); illustrated in the [agent-workflow perspective](../articles/agent-role-boundaries.md).
