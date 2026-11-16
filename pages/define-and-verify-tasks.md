---
type: pattern
summary: Why a written task is the agent's target and your yardstick, and how to write one for Copilot, steer it where the work is recorded, and review the result against what you wrote.
status: established
lane: guidance
goal: alignment
order: 1
---

# Define, steer, and verify a task

An agent works from the task and the context it can reach. Where an important requirement is missing, it may fill the gap with a plausible guess. A written task closes the gaps that matter before it starts, and it gives you something fixed to check the result against later, instead of the agent's summary, which is its own account of what it did. Corrections belong where the work is recorded, so a reviewer can see why the result differs from the request.

## Write the task

Use four headings. Each answers a question the agent would otherwise answer for itself. This works as a GitHub issue for the Copilot cloud agent and as a prompt for any agent:

```markdown
## Outcome

Users can export the orders table as a CSV file from the Orders page.

## Done when

- The file has a header row that matches the table's columns.
- Values containing commas or quotes are quoted correctly.
- An export of 10,000 rows finishes without timing out.

## Checks

- Add a test with a value that contains both a comma and a quote.
- Run `make test-unit` for the exporter tests, then `make check`.

## Out of scope

- Excel (.xlsx) export.
- Changing the table's columns.
```

- **Outcome** says what the user gets, so the agent aims at the result rather than at a plausible change.
- **Done when** is what the agent will check its work against. Make each line observable, so a check fails if it is missed; "works well" cannot fail.
- **Checks** names the commands, so the agent runs your tests rather than inventing its own or judging by reading the code.
- **Out of scope** stops nearby work the agent might think helps, which costs time and makes the diff harder to review.

If you cannot write the "Done when" lines, the task is not ready: settle the open questions first, or the agent may decide them without you.

## Hand it to Copilot

- **Cloud agent:** assign the issue to Copilot under **Assignees**, with extra instructions in the optional prompt field. Copilot works in GitHub Actions, opens a draft pull request linked to the issue, and requests your review when it finishes.
- **Copilot CLI or chat in your editor:** paste the same text as your first prompt.

Do not put requirements in HTML comments (`<!-- -->`): Copilot filters them out of issues and comments before it reads them.

## Steer it

- **While the cloud agent is working:** open **View session** on its pull request and type in the prompt box below the log. Use **Stop session** if it is heading the wrong way, because every further step costs time and leaves more to undo.
- **After the cloud agent finishes:** mention `@copilot` in a comment on its pull request. Copilot reacts with 👀 when it picks the comment up. It responds only to people with write access, and not after the pull request is merged or closed.
- **Do not add corrections to the issue.** The cloud agent does not see issue comments made after it starts. Put them on the pull request.
- **In Copilot CLI:** type a new prompt at any time. Copilot treats it as steering for the current task. Press Esc twice to cancel; press Esc twice while idle to roll back to an earlier point.

For why corrections belong on the pull request, see [traceability](traceability.md#core-advice).

## Verify the result

- **Check each "Done when" line against the diff,** not against the pull request description, which is the agent's account and can be wrong.
- **Review the diff before approving workflows, then confirm the checks ran.** Workflows do not run on the cloud agent's pull request until you click **Approve and run workflows**. Approving runs the agent's code with the workflows' permissions, so read the diff first, especially changes under `.github/workflows/`. Record any check that did not run, so the reviewer knows what was not tested.
- **Read the tests the agent wrote.** They share its understanding of the task, so they can pass while missing what you meant. See [passing tests are evidence, not proof](../concepts/tests-are-evidence.md#ask-for-tests-that-can-fail).
- **Have someone else approve it.** You may share the agent's assumptions about the task; another reviewer may catch what you both missed. GitHub stops the person who asked Copilot for a pull request from approving it, so with required approvals on, someone else has to.

## Scale it to the work

A small change needs only the four headings above. The cost of a wrong guess grows with the work, so for larger or ambiguous work, agree a specification before you break it into tasks, and link each task to it.

**Next:** [limit what the agent can do](security.md), step 3 of [start here](../README.md#start-here).

## Sources

Checked 15 November 2026.

- [GitHub Docs: Get started with Copilot agents on GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview)
- [GitHub Docs: Troubleshooting Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent)
- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/review-copilot-prs)
- [GitHub Docs: Risks and mitigations for Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations)
- [GitHub Docs: Steering agents in Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/steer-agents)
- [GitHub Docs: Cancel and roll back in Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/cancel-and-roll-back)
- [Microsoft Learn: Assigning, tracking, and troubleshooting Copilot cloud agent tasks](https://learn.microsoft.com/en-gb/training/modules/github-copilot-code-agent/3-assign-track-troubleshoot-copilot-code-agent-tasks)
