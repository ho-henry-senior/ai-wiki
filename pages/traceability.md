---
type: overview
summary: Why agent work needs a record someone else can follow, and a review you can rely on; let the record make itself, put the check results on the pull request, read the risky parts first, and have someone else approve.
status: developing
lane: goals
goal: traceability
order: 4
checked: 2026-11-15
---

# Traceability & Trust

With an agent, the work is split: a model writes the code, a person directs it, and someone else approves it. The decisions that shaped the result often happen in a session only one person saw, and the evidence that it worked, such as check runs and logs, expires. Unless the record is copied to where reviewers look, later readers cannot reconstruct who decided what, or why; for public-sector work, being able to answer that is often an obligation. The same record is what lets a reviewer trust a change without redoing it: they check the agent's claims against the evidence, and spend their attention where the risk is.

## Core advice

- **Let the record make itself.** A reader needs to know which changes a person wrote and which an agent did. Copilot cloud agent commits are authored by Copilot, signed, and link to the session log, which stays on GitHub and cannot be deleted. For a tool that commits under your name, add a `Co-authored-by:` line naming it.
- **Put the check results on the pull request.** Actions keeps checks, runs, and logs for 90 days by default, and public repositories cannot keep them longer, while CLI and editor sessions are yours to delete. So add one comment saying which checks ran, what they showed, and which did not run, and make corrections in pull request comments rather than a private session, [as when steering](define-and-verify-tasks.md#steer-it). Summarize logs rather than pasting them, and never record secrets: a record is shared more widely than the session it came from.
- **Read the risky parts first.** The agent's pull request description is its own account of what it did, so check it against the diff. Read tests, configuration, workflows, and new dependencies closely: a change that weakens a test or loosens an access rule can make a task pass without anyone noticing. If the checks pass, the rest can take a lighter read.
- **Have someone other than the requester approve.** The person who asked may share the agent's assumptions, so approval should be a second judgment. Add a `CODEOWNERS` file naming who owns sensitive paths, such as `.github/workflows/`; GitHub then requests their review on any pull request that changes those files, and a repository admin can make their approval required. [Verify the result](define-and-verify-tasks.md#verify-the-result).

If you must keep records longer, check your organization's records policy; GitHub Enterprise Cloud can stream agent audit-log events to long-term storage.

## Trust: reviewing changes at scale

<div class="app-developing-card">
  <p class="govuk-body-s"><strong>Developing — guidance not yet established</strong></p>
  <p>As agents produce more pull requests, how can automated checks and risk assessments help people decide which changes need human review and which might be safe to merge automatically?</p>
  <p>This is an area for investigation, not yet a recommended workflow. The aim is to support risk-informed decisions with evidence rather than rely on an agent's confidence.</p>
</div>

## Try this first

Check that a reader could answer these questions from your last agent pull request alone:

| Question                            | Where the answer should be                    |
| ----------------------------------- | --------------------------------------------- |
| What was asked?                     | The linked issue                              |
| Who or what made the change?        | Commit authors and `Co-authored-by:` lines    |
| What changed course, and why?       | Pull request comments                         |
| What was checked, and what was not? | A pull request comment summarizing the checks |
| Who approved it?                    | The pull request review                       |

## Example

A fictional timeline that answers every question above:

```text
Issue #41   Add CSV export to the Orders page. Done when: header row; quoted values; 10,000 rows.
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

For more depth, see [furnish repositories with context for agents](repository-context-for-agents.md) for decisions in ADRs, and the [lo-fi software factory case study](lo-fi-software-factory-case-study.md) for review evidence in practice.

## Sources

- [GitHub Docs: Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
- [GitHub Docs: Tracking Copilot's sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/track-copilot-sessions)
- [GitHub Docs: Copilot session data](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data)
- [GitHub Changelog: Actions retention will cover checks, workflow runs, and statuses](https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses)
- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output)
- [GitHub Docs: Creating a commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)
- [GitHub Docs: About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Docs: Agent management for enterprises](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/agent-management)
