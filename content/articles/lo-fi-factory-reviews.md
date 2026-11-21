---
type: case-study
lane: case-studies
summary: Concrete examples of review findings, fixes and human decisions in the agent-assisted refactor.
tags:
  - Agent roles
---

# Agent reviews and human decisions

The refactor produced pull requests with tests, verification reports and review comments. The strongest evidence is not that reviews occurred, but that different review passes found different problems and people used the findings to decide what to change.

The examples below are paraphrased and deliberately omit repository, issue, PR and commit identifiers.

## A passing test suite missed an abort case

An early change established the shared Fetch client contract. The implementation report recorded passing focused and broader tests. A subsequent agent review nevertheless reproduced a discrepancy: when a caller cancelled while a response body was still being read, the error was classified as a network failure rather than a caller abort.

That distinction mattered because the ticket explicitly required network failures, caller cancellation and configured timeouts to be distinguishable. Passing tests were useful evidence, but they had not exercised this particular sequence. The preserved review comment establishes the finding; it is not, by itself, proof of when or how the defect was fixed.

## A maintainability concern prompted follow-up

In a later service migration, a reviewer noticed two equivalent response-normalisation helpers in different modules. The reviewer treated this as a judgement-call duplication concern, not a confirmed functional defect.

A person asked a coding assistant whether consolidation was worthwhile and then whether a subsequent change had addressed the concern. The recorded response identified a shared helper introduced by the follow-up change. This is a concrete example of review informing human-directed improvement without every observation becoming a mandatory blocker.

## A second review found what the first missed

During final cleanup of the legacy transport, an initial agent review reported no actionable defects. A separate code review subsequently flagged a regression: removing a legacy response-unwrapping guard could change the error payload returned to callers, including a check-in progress path.

A follow-up discussion reported a corrective change and regression cases. The assistant responding to that discussion also stated that it had not rerun the tests locally. This illustrates why an affirmative review is not a universal correctness certificate, and why reported fixes and independently verified results must be distinguished.

## Checks and remaining risk

The PR records include focused tests, linting, formatting, security scans and dependency checks. Some reported pre-existing dependency vulnerabilities, session-cookie findings or Dockerfile concerns. Some branches had no CI checks reported, and the exercise did not run every live integration or end-to-end scenario.

The Reviewer published findings; a human still decided whether to accept, amend or merge the work. A review-complete workflow label was not an approval decision.
