---
type: pattern
summary: Use an agent to question requirements, agree a specification before creating issues, then steer and verify implementation against that agreement.
status: established
lane: articles
goal: alignment
order: 1
checked: 2026-11-15
tags:
  - Copilot in the editor
  - Copilot CLI
  - Copilot cloud agent
  - Testing
---

# Define, steer, and verify a task

An agent can complete the task you described and still solve the wrong problem. Before implementation, use it to question your request, surface assumptions and draft a specification for human review. Once you agree what success means, let it create issues and implement them. Check the result against that agreement, not the agent's summary of its own work. Corrections belong where the work is recorded, so reviewers can see why the result differs from the request.

## Agree on the problem

Ask the agent to question your request before proposing a solution. Have it challenge assumptions, ask about missing behavior and edge cases, and identify choices that only you can make. For example:

> Before writing code, question me about the CSV export I want. Ask about ambiguous behavior, edge cases and constraints. Challenge vague answers. Draft a specification with acceptance criteria, non-goals and unresolved questions. Do not create issues or implement anything until I have reviewed it.

Review the draft specification, settle or explicitly defer open decisions, and agree what should be built. The agent may propose answers, but it should not silently turn its guesses into requirements.

## Turn the specification into issues

Once the specification is agreed, ask the agent to split it into small, verifiable GitHub issues, each linked to the specification. Check that the issues collectively cover the agreed outcome and do not introduce new requirements. For each issue, use four headings. Each answers a question the implementing agent would otherwise answer for itself:

```markdown
## Outcome

Users can export the orders table as a CSV file from the Orders page.

## Acceptance criteria

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
- **Acceptance criteria** are what the agent will check its work against. Make each one observable, so a check fails if it is missed; "works well" cannot fail.
- **Checks** names the commands, so the agent runs your tests rather than inventing its own or judging by reading the code.
- **Out of scope** stops nearby work the agent might think helps, which costs time and makes the diff harder to review.

If you cannot write the acceptance criteria, the issue is not ready: return to the specification or settle the open questions first. For a small, clear change, a short agreed task may be enough without a separate specification document.

For independent local agent tasks, [Git worktrees](../../reference/git-worktrees-for-agents.md) give each session a separate working directory and branch without isolating its tools or credentials.

Related skill: Matt Pocock's [\`/to-tickets\`](../../reference/agent-skills-directory.md#to-tickets) proposes dependent vertical-slice tickets. Check and approve the breakdown before creating issues.

## Hand an issue to Copilot

- **Cloud agent:** assign the issue to Copilot under **Assignees**, with extra instructions in the optional prompt field. Copilot works in GitHub Actions, opens a draft pull request linked to the issue, and requests your review when it finishes.
- **Copilot CLI or chat in your editor:** paste the same text as your first prompt.

Do not put requirements in HTML comments (`<!-- -->`): Copilot filters them out of issues and comments before it reads them.

## Steer it

- **While the cloud agent is working:** open **View session** on its pull request and type in the prompt box below the log. Use **Stop session** if it is heading the wrong way, because every further step costs time and leaves more to undo.
- **After the cloud agent finishes:** mention `@copilot` in a comment on its pull request. Copilot reacts with 👀 when it picks the comment up. It responds only to people with write access, and not after the pull request is merged or closed.
- **Do not add corrections to the issue.** The cloud agent does not see issue comments made after it starts. Put them on the pull request.
- **In Copilot CLI:** type a new prompt at any time. Copilot treats it as steering for the current task. Press Esc twice to cancel; press Esc twice while idle to roll back to an earlier point.

For why corrections belong on the pull request, see [Traceability & Trust](../traceability/README.md#core-advice).

## Verify the result

- **Check each acceptance criterion against the diff,** not against the pull request description, which is the agent's account and can be wrong.
- **Review the diff before approving workflows, then confirm the checks ran.** Workflows do not run on the cloud agent's pull request until you click **Approve and run workflows**. Approving runs the agent's code with the workflows' permissions, so read the diff first, especially changes under `.github/workflows/`. Record any check that did not run, so the reviewer knows what was not tested.
- **Read the tests the agent wrote.** They share its assumptions about the task, so passing tests do not establish that the intended behavior was checked. Match each acceptance criterion to a test of an observable result, and look for plausible bugs that would make it fail. For example, a successful-login test does not verify that expired credentials are rejected. For a new behavior, ask the agent to run the test before fixing the code and show that it fails for the expected reason. Keep integration checks for behavior that unit tests cannot cover.
- **Have someone else approve it.** You may share the agent's assumptions about the task; another reviewer may catch what you both missed. GitHub stops the person who asked Copilot for a pull request from approving it, so with required approvals on, someone else has to.

## Scale it to the work

A small, clear change may need only a brief agreement and one issue. Larger or ambiguous work warrants a reviewed specification and linked issues. The principle stays the same: establish what success means before delegating implementation.

**Next:** [limit what the agent can do](../security/README.md), step 3 of [start here](../../../README.md#first-steps).

## Sources

- [GitHub Docs: Get started with Copilot agents on GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview)
- [GitHub Docs: Troubleshooting Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent)
- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/review-copilot-prs)
- [GitHub Docs: Risks and mitigations for Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations)
- [GitHub Docs: Steering agents in Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/steer-agents)
- [GitHub Docs: Cancel and roll back in Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/cancel-and-roll-back)
- [Microsoft Learn: Assigning, tracking, and troubleshooting Copilot cloud agent tasks](https://learn.microsoft.com/en-gb/training/modules/github-copilot-code-agent/3-assign-track-troubleshoot-copilot-code-agent-tasks)
