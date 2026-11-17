---
type: reference
summary: Background. An eval runs an agent on a fixed set of tasks and checks the results, so you can tell whether a change to your setup made things better or worse.
lane: articles
date: 2026-11-14
tags:
  - Testing
---

# Evals

**Background:** not a step you need for everyday work with Copilot.

An evaluation, or **eval**, runs an agent on a fixed set of tasks and checks the results against agreed criteria. Use one when you want to know whether a change, such as a new line in `AGENTS.md` or a different model, actually helps.

## Build a small one

1. **Pick the behavior that matters** and how you will judge it.
2. **Choose 5 to 10 real tasks,** including edge cases and a security case. Hold a few back for a final check.
3. **Check each result** with a test where the requirement is observable, and with a person where it needs judgment. A model can grade too, but compare its verdicts with a person's.
4. **Run the same tasks before and after the change,** more than once if results vary. Record outcomes, time, and tokens.
5. **Read the failures,** and a sample of successes, before trusting the score.

For example, give Copilot five known bugs in disposable copies of a repository, check each fix with an independently written test, and compare the results before and after an instructions change. A cheaper run is no improvement if it breaks required behavior.

## Limits

An eval measures only the cases it contains. Small samples make differences uncertain, and a score can rise while the real goal does not. See [passing tests are evidence, not proof](tests-are-evidence.md).

## Sources

- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)
- [OpenAI: Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
