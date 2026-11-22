---
name: wiki-review
description: Review this wiki's pages, structure, navigation or dated claims using the repository's review method. Use for whole-wiki, single-page, information-architecture, or freshness reviews.
---

# Review the wiki

This skill runs the review method in [Reviewing the wiki](../../../maintainers/PAGE-REVIEWS.md), which owns how reviews work and records their decisions. Read it first, with [the design goals](../../../maintainers/DESIGN-GOALS.md), [the information architecture](../../../maintainers/INFORMATION-ARCHITECTURE.md), [the writing standard](../../../maintainers/STYLE.md), [who owns what](../../../maintainers/MAINTAINING.md#who-owns-what), and [keeping content current](../../../maintainers/MAINTAINING.md#keeping-content-current).

A run started by a workflow follows that workflow's own limits where they are narrower than these steps.

## 1. Settle the scope

Choose a page or group, the whole site, or freshness, as the method describes. Inspect the worktree and preserve unrelated changes.

**Complete when:** the scope is stated, and anything excluded is named.

## 2. Read before judging

Read every page in scope as published, not only its Markdown. For the whole site, that includes Goals, Guides, Articles and Reference pages, the homepage, indexes, glossary and source records. Keep each page's disposition in session notes, not in new repository files. Read raw archives in `data/` only to resolve a claim, and leave them unchanged.

**Complete when:** every page in scope has a disposition, and anything unread is named.

## 3. Check evidence proportionally

Verify the changing claims that a proposed change relies on against current primary sources, and say exactly which were checked. Record inaccessible or inconclusive sources as limitations. An editorial or structural review is not a fact-check, and a passing link check does not verify external facts.

**Complete when:** each changing claim used in an edit has current evidence or a stated uncertainty.

## 4. Report

Give each finding a location and a reason, and propose decisions from the method: keep, refine, merge, remove, defer, or rarely extract. Prefer making a point once, in its owner, over adding a page; page count is not a target. Flag a recommendation whose reason a reader could not work out from the page, but don't ask for justification the page already makes clear.

A review-only request ends here. Get approval before changing content.

## 5. Apply approved changes

Work in small pull requests. Keep sources, examples and essential caveats when moving material. Preserve paths and heading anchors where practical, and update every incoming link, the affected indexes, the ownership table, and the decision record in [Reviewing the wiki](../../../maintainers/PAGE-REVIEWS.md#decisions).

## 6. Verify and hand off

Format changed Markdown, run `just verify`, and inspect the diff for accidental rewrites, broken navigation and lost sources. Report the scope, the changes or findings, the checks run, and any gaps in coverage or freshness that remain.

**Complete when:** verification passes, or its failures are reported.
