---
type: how-to
summary: Decide how closely to review an agent's change, starting with what agents tend to get wrong, then look efficiently with good diff tools and checks you run yourself.
status: developing
lane: guides
goal: traceability
checked: 2026-11-22
tags:
  - Pull requests and review
  - Testing
---

# Decide where to look

Not every change needs the same depth of review. These questions help you decide where to spend your attention. They are prompts for judgement, not a score: no total tells you a change is safe to approve.

## Start with what agents tend to get wrong

| Question                                  | Look harder when                                                                                                |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Does it do what was asked, and only that? | The diff has changes nobody asked for, or doesn't match the agent's description of it                           |
| Did it change tests?                      | Assertions were removed or loosened, tests were skipped, snapshots were regenerated, or many new tests appeared |
| Who ran the checks?                       | Only the agent ran them, or nothing exercised the behaviour people will use                                     |
| Is it bigger than it needs to be?         | It's too big to hold in your head; ask for it to be [split](ask-for-work-you-can-approve.md)                    |

## Then weigh the risk

The questions you'd ask of any change still apply. Look harder when it reaches shared code, other systems or interfaces others use; when it is hard to undo, such as a data migration; when a failure would be silent; and when it changes workflows, access rules, authentication or dependencies. A documentation fix may need only a careful read; an authentication change needs every line read and its owner's review, which a [`CODEOWNERS` file](README.md#independent-change-approval) can request. Several of these questions come from a talk on the code-review bottleneck; see [the notes on it](../../sources/warp-code-review-bottleneck.md).

## Then look

The agent's report says what it ran, and CI shows what ran there; neither is you seeing the change work.

- **Use a diff tool that shows each commit and the whole change,** lets you filter out generated files, and splits a large change into sections you can manage. Review lock files when dependencies change: they show unexpected indirect updates. Some examples: [LazyGit](https://github.com/jesseduffield/lazygit); VS Code's diff with GitHub's [Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) and [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens); and the GitHub CLI, where `gh pr checkout` fetches the change and `gh pr diff --exclude 'generated/*'` hides generated files.
- **Check the evidence, then run what the risk calls for.** Look at what ran in CI and at the tests themselves; CI on a trusted runner is often more reproducible than a local run. When a change is risky or the evidence leaves you unsure, run the relevant checks yourself; see [local checks and tools for coding agents](../../reference/local-development-tools.md).
- **Read the tests, not just their result;** see [verify the result](../alignment/hand-off-and-steer.md#verify-the-result).

## When you can't answer a question

If the change and its evidence don't let you answer one of these questions, that is a finding in itself. Ask for what's missing before you [decide](review-decide-and-approve.md): the evidence, a check you can run, or a smaller change.

## Sources

- [GitHub CLI manual: gh pr diff](https://cli.github.com/manual/gh_pr_diff) and [gh pr checkout](https://cli.github.com/manual/gh_pr_checkout)
- [VS Code docs: Work with GitHub in VS Code](https://code.visualstudio.com/docs/sourcecontrol/github)
