---
type: guide
summary: "The model cannot reliably tell data from instructions, so a hidden line in an issue, web page, or tool output can steer it: prompt injection."
status: established
lane: goals
goal: security
order: 3
---

# Hidden instructions in content

The model cannot reliably tell data from instructions, so a hidden line in an issue, web page, or tool output can steer it: [prompt injection](prompt-injection-coding-agents.md).\n\nRules in `AGENTS.md` cannot prevent it, because [instructions are not enforced controls](../../concepts/instructions-vs-controls.md); the access limits described in [Excessive agent access](excessive-agent-access.md) contain it.\n\nDeny the commands that would do most harm if it obeyed, such as `copilot --deny-tool='shell(git push)'`.
