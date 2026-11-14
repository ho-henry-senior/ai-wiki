---
name: wiki-review
description: Review this wiki's information architecture, design-goal alignment, reusable concepts, navigation, and stale claims. Use for whole-wiki, goal-alignment, information-architecture, or concept-extraction reviews.
---

# Review the wiki

Review the knowledge structure and its evidence, not just Markdown formatting. Preserve useful narrative articles while making reusable explanations independently discoverable.

## 1. Establish scope and coverage

Read [the design goals](../../../DESIGN-GOALS.md), [agent instructions](../../../AGENTS.md), [article conventions](../../../pages/README.md), [concept conventions](../../../concepts/README.md), and [source conventions](../../../sources/README.md). Inspect the worktree and preserve unrelated changes.

For a whole-wiki review, inventory and read every authored article, concept, and slide, the glossary, indexes, and source records. Check slides against their canonical concepts. Include repository instructions and review tooling when checking navigation and verification coverage. Read raw archives only when needed to resolve a claim; leave them unchanged.

For a scoped review, identify the requested subset and its directly related material. Record what was read and what remains unchecked in session notes; do not describe a partial review as whole-wiki coverage.

For deeper corpus-inventory or terminology methods, consult the optional [candidate-skills research](../../../sources/wiki-information-architecture-skills.md). These external skills are not prerequisites for a review.

**Complete when:** every in-scope file has a recorded disposition, and exclusions are explicit.

## 2. Identify findings and extraction candidates

For each in-scope goal and core-advice point, trace the reader's path from the homepage through the relevant principle to techniques and practical examples, including how to try and verify them. For a whole-wiki review, cover all four goals. Record the paths and evidence; distinguish absent guidance from guidance that is hard to discover. A path may span several pages or remain within one page. Treat thin coverage as a gap to report, not a reason to invent a separate page.

Evaluate the material against:

- **Scope:** practical AI usage, portable conventions, and useful Copilot-specific guidance. Identify other products' setup instructions that drift beyond the design goals.
- **Goal alignment:** compare the in-scope guidance and navigation with the design goals. Identify goals without a useful starting path and content that does not support the stated audience or scope.
- **Practical priority:** check that starting points favor changes with clear likely benefit and modest effort, explain how to try and verify them, and preserve necessary security safeguards. Assess effort in context rather than treating every reader's first step as the same.
- **Reuse:** find explanations answering one standalone question or used across topics. Distinguish genuine reuse from sections that simply happen to be long.
- **Canonical ownership:** locate competing explanations, inconsistent definitions, and opportunities to replace duplication with summaries and links.
- **Composition:** articles should still explain a problem and connect ideas, rather than become lists of concept links.
- **Discovery:** check reader paths, the [sitemap](../../../pages/sitemap.md), topic and directory indexes, glossary links, incoming references, and orphaned material. For each in-scope goal, assess whether its overview links relevant principles, techniques, and examples for its core advice; identify missing or misleading relationships. Update the curated overview links rather than editing the generated sitemap. Retain direct paths to practical guidance and make advanced concepts discoverable without making them prerequisites.
- **Terminology:** compare terms and definitions with the glossary and their context; verify apparent inconsistencies in the source before proposing a change.
- **Slides:** check that summaries retain essential qualifications and link to their canonical concepts.
- **Freshness:** inspect changing claims, versions, dates, source quality, and whether recommendations are supported by evidence.

For each proposed extraction, name the question or distinction, its current location, and the articles or reference uses that justify it. Keep examples and essential caveats with the explanation. Keep catalogs, checklists, and concrete workflow examples intact when splitting would reduce usefulness.

**Complete when:** every in-scope core-advice point has a traced path or a recorded gap, each finding has a location and reason, and each proposed concept has a clear canonical home and plausible use.

## 3. Check evidence proportionally

Follow [the freshness guidance](../../../pages/README.md#keeping-content-current). Verify potentially stale claims affected by proposed changes against current primary sources; note exactly which claims were checked. Preserve sources when moving material.

Separate verified claims, proposals, and unresolved questions. Record inaccessible or inconclusive sources as limitations. A structural review is not an exhaustive external fact-check, and a passing link checker does not verify external facts.

**Complete when:** changing claims used in edits have current evidence or an explicit uncertainty, and unverified areas are named.

## 4. Report, then apply approved changes

Present concise findings and the extraction plan. A review-only request ends with findings; obtain approval before modifying content. If implementation is already requested, proceed within the agreed scope and raise material scope changes for approval.

When extracting concepts:

- Put the full focused explanation in `concepts/`, following its conventions; retain its example, caveats, and sources.
- Replace the article's detailed explanation with a contextual summary and link. Keep it readable without requiring every linked page to be opened.
- Preserve existing paths and heading anchors where practical. Update all affected incoming links if a target must change.
- Update concept and article indexes, relevant topic-map entries, and glossary links. Keep glossary definitions short and maintain its wider AI scope.
- Change policies or authoring instructions only where the review has established a repeatable rule.

**Complete when:** extracted concepts have incoming references and index entries, affected slides agree with their canonical concepts, articles still tell a coherent story, and no explanation or important qualification has been silently lost.

## 5. Verify and hand off

Use the repository task interface to format changed Markdown, regenerate the sitemap with `just sitemap` when affected, and run `just verify`. Check that new directories and hidden skill Markdown are included. Inspect the diff for accidental rewrites, broken navigation, and lost sources; leave raw archives and unrelated changes intact.

Report the review scope, meaningful changes or findings, checks run, and unresolved freshness or coverage gaps. Keep reports in the conversation unless a persistent report was requested.

**Complete when:** verification passes or failures are explicitly reported, review coverage is accounted for, and no temporary fixtures remain.
