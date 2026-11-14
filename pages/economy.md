---
type: guide
summary: Core advice for getting useful agent results with less time and fewer tokens, without sacrificing quality or security.
---

# Economy

Economy means getting useful results with less time and fewer tokens, without sacrificing quality or security. Reducing rework and making existing capabilities easy to use can help; a cheaper run is not an improvement if it misses the intended outcome.

## Try this first

Find an existing focused test and the repository's routine verification command. Make both discoverable to the agent, including what they check and whether they change files. Try the focused test on a relevant task, then run broader checks when the change warrants them.

## Core advice

- **Clarify the work early.** An outcome and acceptance criteria can reduce costly rework. Use a short description for small tasks and a fuller specification when the work needs it. [Define and verify a task](define-and-verify-tasks.md).
- **Reuse deterministic tools.** Make existing tests, formatters, and other bounded checks easy to discover and invoke. Explain their scope, prerequisites, and side effects. [Delegate repository tasks to tools](agent-tool-delegation.md).
- **Use focused feedback.** Start with checks that exercise the behavior being changed; broaden verification as appropriate. A fast check is useful only if it tests something that matters. [Unit tests in the age of AI](unit-tests-in-the-age-of-ai.md).
- **Keep context focused.** Give the agent a short entrypoint and make task-specific detail discoverable, rather than loading everything for every task. Confirm how the harness actually loads links. [Load context through focused entrypoints](../concepts/progressive-disclosure.md).
- **Reuse skills selectively.** Consider a skill when it addresses a recurring need and adds value beyond the harness's current capabilities. [Skills as a changing capability layer](skills-as-capabilities.md).

Do not trade away essential [security](security.md) controls for speed. When comparing approaches, check whether they still meet the task's requirements.

## Explore further

- [Tool choices by purpose](tools-by-purpose.md) — examples and selection considerations.
- [Evals](../concepts/evals.md) — compare outcomes alongside time and token use when repeatable assessment is useful.
