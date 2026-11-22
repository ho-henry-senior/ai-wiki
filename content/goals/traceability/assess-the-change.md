---
type: how-to
summary: What a reviewer needs from their tools to assess an agent's change, some tools that provide it, and the checks to run yourself before you rely on CI or the agent's report.
status: developing
lane: guides
goal: traceability
checked: 2026-11-22
tags:
  - Pull requests and review
  - Testing
---

# Assess the change

Once you know where to look, make looking quick. A reviewer who sees more agent changes needs tools that make each one easy to read, and checks they can run themselves.

## What your tools need to do

Whatever you use, check it lets you:

- **see the whole change and each commit,** so you can follow it step by step and still judge the result as a whole;
- **leave out what doesn't need reading,** such as generated files and lock files, so your attention goes on the code;
- **see a line's history,** to tell what the agent changed from what was already there;
- **comment where you are reading,** so your questions go on the pull request, where the record is;
- **check the change out and run it,** rather than judging it only by reading.

## Some tools that do it

The choice is personal; these are examples, not recommendations.

- **[LazyGit](https://github.com/jesseduffield/lazygit),** a terminal interface for browsing commits and diffs quickly.
- **VS Code's built-in diff,** with GitHub's [Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) to check out, comment on and approve pull requests in the editor, and [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) for line history.
- **The [GitHub CLI](https://cli.github.com/manual/gh_pr):** `gh pr checkout` fetches a pull request locally, `gh pr diff --exclude 'generated/*'` shows the change without generated files, and `gh pr review` records your review.
- **Visual Studio,** which can review and approve GitHub pull requests commit by commit.
- **GitHub Desktop** and the pull request's own **Files changed** view on GitHub.

## Run the checks yourself

The agent's report says what it ran; CI shows what ran in CI. Neither is the same as you seeing the change work.

- **Run the repository's checks locally** before you rely on CI: linting, type checks and the tests for the area that changed. Deterministic checks give the same answer every time, so they are cheap to trust; see [discoverable deterministic checks](../economy/discoverable-deterministic-checks.md) and [local checks and tools for coding agents](../../reference/local-development-tools.md).
- **Read the tests, not just their result.** Passing tests show that those checks passed. Check that each one tests something the change is meant to do; see [verify the result](../alignment/hand-off-and-steer.md#verify-the-result).
- **Try the behaviour when it matters.** For a change people will use, run the application and exercise it. A passing unit suite doesn't show that a user can complete the task.

Then [review, decide and approve](review-decide-and-approve.md).

## Sources

- [GitHub CLI manual: gh pr diff](https://cli.github.com/manual/gh_pr_diff) and [gh pr checkout](https://cli.github.com/manual/gh_pr_checkout)
- [VS Code docs: Work with GitHub in VS Code](https://code.visualstudio.com/docs/sourcecontrol/github)
- [Visual Studio blog: Review pull requests in Visual Studio](https://devblogs.microsoft.com/visualstudio/?p=256498)
