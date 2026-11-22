---
type: overview
summary: When you approve an agent's change, you take responsibility for it; keep agent work to the delivery process you already use, read the risky parts first, and keep approval with an accountable person.
status: established
lane: goals
goal: traceability
order: 4
checked: 2026-11-15
tags:
  - Pull requests and review
---

# Trust & Traceability

When you approve a change an agent made, you take responsibility for it, because the agent can't. **Trust** means a person can stand behind the change; **traceability** means someone else can later follow what happened and why. In public-sector work, that record may be an obligation.

Neither needs a new process: keep agent work to the delivery process you already use. For getting agent work into a form you can approve, see the [Review and approve agent work](review-and-approve-agent-work.md) guide.

## Core advice

### Agent authorship and attribution

A reader needs to know which changes a person wrote and which an agent did. Copilot cloud agent commits are authored by Copilot, signed, and link to the session log, which stays on GitHub and cannot be deleted. For a tool that commits under your name, add a `Co-authored-by:` line naming it.

### A record through your usual process

Use the norms you use for people's work: a ticket for the request, small commits with clear messages, a pull request that says what changed and why, and an approving review from a named person.

Record on the pull request what was checked, what it showed, and what wasn't checked. CI results aren't a lasting record: Actions keeps checks, runs and logs for 90 days by default, and public repositories can't keep them longer, while CLI and editor sessions are yours to delete. Make corrections in pull request comments too, [as when steering](../alignment/hand-off-and-steer.md#steer-it).

Summarize logs rather than pasting them, and never record secrets: a record is shared more widely than the session it came from. To keep records longer, check your organization's records policy; GitHub Enterprise Cloud can stream agent audit-log events to long-term storage.

### Risk-focused change review

The agent's pull request description is its own account, so check it against the diff. Read tests, configuration, workflows and new dependencies closely: a weakened test or a loosened access rule can make a task pass unnoticed. See [decide where to look](decide-where-to-look.md).

### Independent change approval

Approval is a person's decision and responsibility; an agent's review is evidence for it, not the decision ([review, decide and approve](review-decide-and-approve.md)). Have someone other than the requester approve, because the person who asked may share the agent's assumptions. Add a `CODEOWNERS` file naming who owns sensitive paths, such as `.github/workflows/`; GitHub then requests their review on any pull request that changes those files, and a repository admin can make their approval required.

## Automatic approval

<div class="app-developing-card">
  <p class="govuk-body-s"><strong>Developing — an area to watch, not a recommendation</strong></p>
  <p>Some teams are exploring automatic approval of changes judged low-risk, and tools now allow it: Copilot's code review can be set to submit approvals that count, in public preview.</p>
  <p>This wiki doesn't recommend automatic approval for its UK public-sector audience. Its approach is to keep an accountable person as approver, with automated checks helping direct review effort.</p>
</div>

## Example

Check whether someone could answer these five questions from an agent-produced pull request alone:

| Question                            | Where the answer should be                    |
| ----------------------------------- | --------------------------------------------- |
| What was asked?                     | The linked issue                              |
| Who or what made the change?        | Commit authors and `Co-authored-by:` lines    |
| What changed course, and why?       | Pull request comments                         |
| What was checked, and what was not? | A pull request comment summarizing the checks |
| Who approved it?                    | The pull request review                       |

This fictional timeline shows how a pull request can provide those answers:

```text
Issue #41   Add CSV export to the Orders page. Acceptance criteria: header row; quoted values; 10,000 rows.
PR #42      Opened by Copilot, linked to #41. Commits authored by Copilot, co-authored by A. Patel.
Comment     A. Patel: @copilot keep the existing column order; finance imports this file.
Comment     A. Patel: Unit tests passed. The 10,000-row test did not run: no test data.
Comment     A. Patel: @copilot add a generated 10,000-row fixture and run the test.
Comment     A. Patel: 10,000-row test passed (run 1187).
Review      B. Jones approved.
```

A commit another tool made under your name records the agent like this:

```text
Add CSV export for orders

Co-authored-by: Example Agent <agent@example.com>
```

## Explore further

For more depth, see [repository context for coding agents](../alignment/repository-context-for-agents.md) for decisions in ADRs, and the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) for review evidence in practice.

## Sources

- [GitHub Docs: Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
- [GitHub Docs: Tracking Copilot's sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/track-copilot-sessions)
- [GitHub Docs: Copilot session data](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data)
- [GitHub Docs: Creating a commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)
- [GitHub Changelog: Actions retention will cover checks, workflow runs, and statuses](https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses)
- [GitHub Docs: Agent management for enterprises](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/agent-management)
- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output)
- [GitHub Docs: About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Docs: Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review)
