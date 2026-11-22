---
type: how-to
summary: Decide how closely to review a change by asking what it reaches, what was checked, how hard it is to undo and how you'd notice a problem, as prompts for judgement rather than a score.
status: developing
lane: guides
goal: traceability
tags:
  - Pull requests and review
  - Security
---

# Decide where to look

Not every change needs the same depth of review. These questions help you decide where to spend your attention. They are prompts for judgement, not a score: no total tells you a change is safe to approve.

## Questions to ask

| Question                                  | Look harder when                                                                                   |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Does it do what was asked, and only that? | The diff has changes the request didn't ask for, or doesn't match the pull request's description   |
| How far does it reach?                    | It touches shared code, an interface others use, or another system                                 |
| What was actually checked?                | Only unit tests cover behaviour people use, only the agent ran the checks, or nothing exercised it |
| How hard is it to undo?                   | It migrates or deletes data, changes a published interface, or changes infrastructure              |
| How would you notice a problem?           | A failure would be silent, or nothing monitors that path                                           |
| Did it change sensitive files?            | It changes workflows, access rules, authentication, secrets handling or dependencies               |
| Did it change tests?                      | Assertions were removed or loosened, tests were skipped, or snapshots were regenerated             |
| How familiar is it?                       | It introduces a new pattern, or is in code nobody on the team knows well                           |
| How big is it?                            | It's too big to hold in your head; ask for it to be [split](ask-for-work-you-can-approve.md)       |

The first five come from a talk on the code-review bottleneck; see [the notes on it](../../sources/warp-code-review-bottleneck.md). Size isn't the same as risk: a one-line change to an access rule can need more attention than a large, well-tested refactor.

## Three examples

- **A documentation correction** fixes wording in a README. It reaches nothing else, is easy to undo, and a problem would be obvious. Read it and check it is true; that is usually enough.
- **A dependency update** raises a library's version, and the lock file changes in many places. It reaches everything that uses the library, and its effects can be subtle even though the code change is easy to undo. Read the library's changelog, check that the lock file changes only the packages you expect, confirm the package is the one you meant (see [invented dependencies](../../concepts/hallucinated-dependencies.md)), and rely on integration tests more than unit tests.
- **An authentication change** shortens the session timeout. The diff is small, but it affects every user, a mistake could fail silently, and it is in sensitive code. Read every line, check that tests cover both expiry and rejection, and have the code's owner review it; a `CODEOWNERS` file can request their review automatically, as [Trust & Traceability](README.md#independent-change-approval) describes.

## When you can't answer a question

If the change and its evidence don't let you answer one of these questions, that is a finding in itself. Ask for what's missing before you approve: the evidence, a check you can run, or a smaller change.
