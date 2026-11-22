---
type: how-to
summary: Give an issue to a coding agent, correct it on the pull request rather than the issue, and check the result against the acceptance criteria before you accept it, with Copilot as the worked example.
status: established
lane: guides
goal: alignment
checked: 2026-11-15
tags:
  - Copilot
  - Pull requests and review
  - Testing
---

# Hand off an issue and steer the implementation

Give the agent one agreed issue, correct it as early as you can, and check what it produced against the issue's acceptance criteria before you accept it. The examples use GitHub Copilot; other agents have equivalent steps.

## Hand off the issue

Give the agent the whole issue, with its outcome, acceptance criteria, checks and out-of-scope list. In Copilot:

- **Cloud agent:** assign the issue to Copilot under **Assignees**, with extra instructions in the optional prompt field. Copilot works in GitHub Actions, opens a draft pull request linked to the issue, and requests your review when it finishes.
- **Copilot CLI or chat in your editor:** paste the same text as your first prompt.

Do not put requirements in HTML comments (`<!-- -->`): Copilot filters them out of issues and comments before it reads them.

## Steer it

A wrong turn costs more the longer it runs, so correct it as soon as you see it.

- **While the cloud agent is working:** open **View session** on its pull request and type in the prompt box below the log. Use **Stop session** if it is heading the wrong way, because every further step costs time and leaves more to undo.
- **After the cloud agent finishes:** mention `@copilot` in a comment on its pull request. Copilot reacts with 👀 when it picks the comment up. It responds only to people with write access, and not after the pull request is merged or closed.
- **Do not add corrections to the issue.** The cloud agent does not see issue comments made after it starts. Put them on the pull request.
- **In Copilot CLI:** type a new prompt at any time. Copilot treats it as steering for the current task. Press Esc twice to cancel; press Esc twice while idle to roll back to an earlier point.

For why corrections belong on the pull request, see [a record through your delivery process](../traceability/delivery-record.md).

## Verify the result

Check the work against the agreement, not against the agent's account of it.

- **Check each acceptance criterion against the diff,** not against the pull request description, which is the agent's account and can be wrong.
- **Review the diff before approving workflows, then confirm the checks ran.** Workflows do not run on the cloud agent's pull request until you click **Approve and run workflows**. Approving runs the agent's code with the workflows' permissions, so read the diff first, especially changes under `.github/workflows/`. Record any check that did not run, so the reviewer knows what was not tested.
- **Read the tests the agent wrote.** They share its assumptions about the task, so passing tests do not establish that the intended behavior was checked. Match each acceptance criterion to a test of an observable result, and look for plausible bugs that would make it fail. For example, a successful-login test does not verify that expired credentials are rejected. For a new behavior, ask the agent to run the test before fixing the code and show that it fails for the expected reason. Keep integration checks for behavior that unit tests cannot cover.
- **Decide, and say what is still unverified.** Accept the work, ask for changes, or stop. Note on the pull request any criterion you couldn't check, so the next reviewer knows. For review by risk and independent approval, see [Trust & Traceability](../traceability/README.md). When approvals are required, the approval of the person who asked Copilot for a pull request doesn't count.

These are the checks for one task. For how closely to review a change, and the approval decision, see the [Review and approve agent work](../traceability/review-and-approve-agent-work.md) guide.

## Sources

- [GitHub Docs: Get started with Copilot agents on GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview)
- [GitHub Docs: Troubleshooting Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent)
- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/review-copilot-prs)
- [GitHub Docs: Risks and mitigations for Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations)
- [GitHub Docs: Steering agents in Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/steer-agents)
- [GitHub Docs: Cancel and roll back in Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/cancel-and-roll-back)
- [Microsoft Learn: Assigning, tracking, and troubleshooting Copilot cloud agent tasks](https://learn.microsoft.com/en-gb/training/modules/github-copilot-code-agent/3-assign-track-troubleshoot-copilot-code-agent-tasks)
