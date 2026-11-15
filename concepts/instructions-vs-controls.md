---
type: reference
summary: Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly.
status: established
---

# Instructions are not enforced controls

Asking an agent to avoid an action differs from preventing that action. Instructions are useful behavioral guidance; access restrictions must be enforced by the harness, tool, operating system, or connected service.

For example, "use the database read-only" asks the model to behave. A database identity without write privileges prevents writes through that identity even if the agent requests one.

## Use layers

Keep instructions explicit, but combine them with narrowly scoped tools and credentials, filesystem and network restrictions, and meaningful approval for consequential actions. Treat retrieved content as data rather than authority to widen access.

The same distinction applies to role profiles: saying that a reviewer does not implement changes is a role contract, not proof that its tools cannot edit files.

No single layer guarantees safety. Scanning and redaction may miss sensitive content; approval can be poorly informed; a sandbox may cover one tool but not another. Check each integration's actual execution and authorization path.

## Sources and applications

- [OWASP: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) — enforce minimal permissions and independent approval.
- [OWASP: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — untrusted inputs and layered mitigations.
- Applied in [Sensitive data in agent workflows](../pages/sensitive-data-in-agent-workflows.md), [role responsibilities and boundaries](../pages/agent-role-boundaries.md), and [repository instructions](../pages/agents-md-as-shared-entrypoint.md).
