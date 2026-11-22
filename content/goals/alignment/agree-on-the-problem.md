---
type: how-to
summary: Have the agent question your request, decide the scope together, and agree a specification with acceptance criteria and open questions before anything is built.
status: established
lane: guides
goal: alignment
tags:
  - Specifications
---

# Agree on the problem

A short request leaves the agent guessing, and it can build a convincing solution to the wrong problem. Before it writes code, use it to find out what you actually want.

## Have the agent question you

Give it a brief description of what you want, then ask it to question you before proposing a solution. Have it challenge assumptions, ask about missing behavior and edge cases, and identify choices that only you can make. For example:

> Before writing code, question me about the CSV export I want. Ask about ambiguous behavior, edge cases and constraints. Challenge vague answers. Draft a specification with acceptance criteria, non-goals and unresolved questions. Do not create issues or implement anything until I have reviewed it.

Its questions surface the aspects you hadn't considered, and it asks better ones if it understands your repository; see [Economy](../economy/README.md). Matt Pocock's [`/grill-me` and `/grilling`](../../reference/agent-skills-directory.md#grill-me-and-grilling) skills run a structured version of this interview; they are an example, not a prerequisite.

## Decide the scope

Agents can identify missing requirements, but they can also suggest features, edge cases and complexity the work doesn't need. **Requirements discovery is a negotiation:** the agent helps explore the possibilities, but you decide the scope.

Challenge unnecessary suggestions and agree explicitly what is in and out; an excluded idea may still be worth pursuing later. Excluding work isn't only about saving effort: it leaves more time to refine requirements, work through edge cases and check what matters. Hold to the agreed scope when the agent starts work, too; see [keep it to the task](../traceability/ask-for-small-focused-changes.md#keep-it-to-the-task).

## Agree the specification

Review the draft specification, settle or explicitly defer each open decision, and agree what should be built. The agent may propose answers, but it shouldn't silently turn its guesses into requirements. Record what is out of scope, so excluded work isn't quietly reintroduced later.

Matt Pocock's [`/to-spec`](../../reference/agent-skills-directory.md#to-spec) can turn the discussion into a specification. It publishes the specification without a final review, which differs from this wiki's advice to agree the whole specification first.

Once the specification is agreed, [turn it into issues](turn-specification-into-issues.md).
