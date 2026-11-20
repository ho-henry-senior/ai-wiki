---
type: guide
summary: "The agent's pull request description is its own account of what it did, so check it against the diff."
status: established
lane: goals
goal: traceability
order: 3
tags:
  - Pull requests and review
---

# Risk-focused change review

The agent's pull request description is its own account of what it did, so check it against the diff.

Read tests, configuration, workflows, and new dependencies closely: a change that weakens a test or loosens an access rule can make a task pass without anyone noticing. If the checks pass, the rest can take a lighter read.

## Sources

- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output)
