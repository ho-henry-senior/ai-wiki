---
type: how-to
summary: Use an agent's review as evidence, decide what to do with its findings, approve, ask for changes or decline, and leave a record of the decision through the process your team already uses.
status: developing
lane: guides
goal: traceability
checked: 2026-11-22
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review
verification: Copilot code review behaviour is checked against GitHub Docs, which the daily review rechecks.
tags:
  - Copilot
  - Pull requests and review
---

# Review, decide and approve

The last step is yours: inspect the change and its evidence, decide what to do with the findings, and approve only what you can stand behind. Agents can review well, but the responsibility stays with the person who approves.

## Inspect the change and its evidence

The agent's report says what it ran, and CI shows what ran there; neither replaces examining the change.

- **Use a diff tool that shows the complete change and individual commits.** Filter generated files when they obscure the review, but inspect lock files when dependencies change. Options include [LazyGit](https://github.com/jesseduffield/lazygit), VS Code with GitHub's [Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) or [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens), and the GitHub CLI (`gh pr checkout`, `gh pr diff`).
- **Check what CI ran and read the tests, not just their results.** CI on a trusted runner is often more reproducible than a local run. For a risky change or gaps in the evidence, run the checks yourself; see [local checks and tools](../../reference/local-development-tools.md) and [verify the result](../alignment/hand-off-and-steer.md#verify-the-result).

## Use an agent's review as evidence

An agent's review often raises good points, including ones a person would miss, such as an unhandled error or a case the tests don't reach. People tend to notice different things: whether the change suits its users, fits the product, or does more than was asked. Use both.

Addressing an agent's findings doesn't mean the change can go ahead. Decide what to do with each one, and say so on the pull request:

- **fix it** in this change;
- **defer it,** opening an issue so it isn't lost;
- **reject it,** with a reason, such as being out of scope.

## What doesn't count as approval

- **The agent's own review or summary.** By default, Copilot's code review leaves a comment review, which doesn't count toward a repository's required approvals. Every Copilot review also includes an assessment of whether it thinks the pull request is ready; that doesn't count either.
- **A risk score or a passing check.** Both are evidence for your decision, not the decision.
- **An agent's approval.** What GitHub allows: Copilot can be configured to submit approvals that count toward required approvals, a feature in public preview and off by default. What this guide recommends: approval by an accountable person, because an agent's approval can't carry responsibility for the change. Leave the setting off.

## Decide, and record it

Approve when you can stand behind the change; otherwise request changes, saying what would make it complete, or decline it. Requesting changes and reviewing again is normal review, not a failure. If the evidence is incomplete, ask for what's missing rather than approving on the agent's assurance that it works.

Record the decision through the process your team already follows: the ticket, small commits with clear messages, a documented pull request, and an approving review from a named person. Add a short comment with what a later reader couldn't otherwise tell: anything you knowingly left unchecked, limitations you accepted, and why you approved despite them. For what the record should answer, see [check the record](delivery-record.md#check-the-record).

## Sources

- [GitHub CLI manual: gh pr diff](https://cli.github.com/manual/gh_pr_diff) and [gh pr checkout](https://cli.github.com/manual/gh_pr_checkout)
- [VS Code docs: Work with GitHub in VS Code](https://code.visualstudio.com/docs/sourcecontrol/github)
- [GitHub Docs: Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review)
- [GitHub Docs: Approving a pull request with required reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/approving-a-pull-request-with-required-reviews)
