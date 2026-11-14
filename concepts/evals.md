---
type: reference
summary: Evals compare AI system behavior against task-specific criteria, using representative cases and appropriate checks to inform improvements.
---

# Evals

An evaluation, or **eval**, checks an AI system against defined tasks and success criteria. A set of cases can help compare approaches, detect regressions, and make progress visible. For an agent, evaluate the outcome and, when relevant, its tool use and effects—not just its final explanation.

## Design a useful eval

1. **Define the objective.** State the behavior that matters and how success will be judged.
2. **Choose cases.** Include representative tasks, important edge cases, and relevant failure or security scenarios. Reserve some cases for a final check rather than tuning against all of them.
3. **Choose checks.** Use deterministic tests for observable requirements; use human review or a model grader for judgments that need nuance. Model graders can be inconsistent or biased, so compare their judgments with human review.
4. **Compare runs.** Establish a baseline, use the same cases and conditions for comparisons, and repeat trials when results vary. Record relevant settings, outcomes, time, and token use.
5. **Interpret and improve.** Investigate failures and trade-offs, update cases as needs change, and check for regressions as well as improvements.

An eval can provide feedback for [hill climbing](hill-climbing.md), but improving a score is useful only when the cases and checks reflect the real goal.

## Example: a bug-fixing agent

Give the agent several known issues in isolated copies of a repository. For each issue, check an independently specified regression test, relevant existing tests, and whether the change meets the request. Record time and token usage separately; a cheaper run is not an improvement if it breaks required behavior.

Compare a proposed instruction change with the baseline across the same issues, using repeated trials where practical. Review failures and a sample of successes, then check held-out issues. Use test data and environments appropriate to the task, avoiding unnecessary exposure of private code or credentials.

## Limits

An eval measures the cases and criteria it contains, not every possible use. A model grader or a test can miss an important failure; [passing tests are evidence, not proof](tests-are-evidence.md). Small samples and variable results can make apparent differences uncertain. More trials, human review, and broader cases can improve confidence, but also cost time and tokens.

## Sources and applications

- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) — agent evals, grading methods, trials, and regression testing.
- [OpenAI: Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) — task-specific objectives, cases, metrics, and comparison.
- Related: [Unit tests in the age of AI](../pages/unit-tests-in-the-age-of-ai.md) — deterministic feedback and its limits.
