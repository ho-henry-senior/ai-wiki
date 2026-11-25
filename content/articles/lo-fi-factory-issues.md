---
type: case-study
lane: case-studies
summary: How an approved technical refactor became a dependency-aware set of agent-ready issues.
tags:
  - Agent roles
status: established
---

# From a refactor idea to actionable issues

The team turned a refactor into eight implementable issues through three separate human decisions: approving the specification, approving the breakdown into tickets, and marking each ticket ready to start. Every issue carried acceptance criteria and verification commands, so the agent implementing it had a bounded change and the agent reviewing it had concrete criteria.

The refactor was bounded but cross-cutting: replacing an older server-side HTTP transport with native Fetch while keeping existing service contracts intact. The technical direction was relatively clear. That made the work suitable for testing whether specialist agents and explicit human decisions could produce implementable tickets.

## Separate discovery from authorisation

The preserved workflow gives the Product agent a discovery role. It uses the `grill-me` skill to question requirements and `to-spec` to prepare a specification for human approval. The Business Analyst then uses `to-tickets` to break the approved specification into issues. A second human approval is required before tickets are published or marked ready.

These are the documented role boundaries. The retrospective confirms that people reviewed the specification and ticket breakdown; it does not provide a complete transcript of every discovery conversation.

## Make each issue verifiable

The actual work was split into eight issues. The first established the shared Fetch client contract, including trusted-origin checks, body encoding, response decoding, abort and timeout behaviour, and offline tests. Subsequent tickets migrated groups of service operations. The final ticket removed the old wrapper and dependency after the other migrations.

The issue descriptions specified acceptance criteria and verification commands. The last issue explicitly depended on the earlier migrations. This prevented the cleanup task from being treated as an independent starting point.

## Why this mattered

The split gave a Developer agent a bounded change to implement and a Reviewer agent concrete criteria to inspect. It also left room for human decisions about scope and ordering. A ticket's existence did not authorise implementation: readiness was a separate workflow state.

The issue records support the existence and structure of this breakdown. They do not, by themselves, measure how much time the role separation saved or establish that the same process would work for ambiguous product decisions.

## What to carry forward

Separate approval of the specification, approval of the work breakdown, and authorisation to start implementation. Give each ticket observable acceptance criteria and record dependencies where the dispatcher can check them mechanically.
