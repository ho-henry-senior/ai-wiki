# Design goals

## Purpose

Build an organized, well-indexed wiki of practical AI usage. Help people use AI effectively in software work, and help agents produce better work by giving them the right tools, instructions, and project context.

The wiki is expected to evolve as AI capabilities and conventions change. Its structure should make it easy to add, revise, and connect knowledge without requiring every topic to live in a single large document.

## Audience and authorship

The primary audience is people building with AI agents, especially in software repositories. The initial practical focus is GitHub Copilot.

The wiki is primarily maintained by one contributor with AI assistance. Favor an organization and writing approach that are easy for a single person to maintain and for an agent to navigate and extend. Keep the material useful to other contributors without making multi-author collaboration a design constraint.

## Goals

Help readers improve these outcomes in AI-assisted work:

- **Alignment:** Get results that match the intended outcome. Clarify intent, provide relevant repository context and tools, and use specifications and verification to reduce misunderstandings. This practical, task-level use complements the broader AI meaning in the [glossary](pages/glossary.md#alignment).
- **Economy:** Achieve useful results with less time and fewer tokens, without sacrificing quality or security. Reduce rework, delegate repeatable tasks to deterministic tools, and make their interfaces clear.
- **Traceability:** Understand what was requested, what changed, and the evidence and decisions behind it. Use appropriate specifications, tickets, PRs, reviews, and verification records to support human oversight; an agent's explanation is not necessarily a complete account of its reasoning.
- **Security:** Protect sensitive information and limit unsafe actions in AI-assisted work. Identify risks, configure enforceable controls, and review integrations and generated changes.

These goals overlap: for example, a clear specification can improve alignment, reduce rework, and support traceability. Organize navigation around reader outcomes without forcing a topic into only one goal.

Lead readers toward practical changes with a clear likely benefit and modest effort. Explain how to try and verify them, while linking to deeper concepts when they become relevant. Effort and benefit depend on context; essential security controls are not optional simply because they take more work.

To support those outcomes:

- **Make guidance practical.** Include workflows, examples, concepts, and explanations that help readers apply AI to real work.
- **Improve agent work in repositories.** Document ways to make repositories easier for agents to use, including tools, machine-readable instructions, and indexed project documentation that helps agents load only the context they need.
- **Support spec-driven development.** Explore how agents can help build and refine specifications, turn them into tasks, and align implementation with requirements.
- **Cover security best practices.** Develop practical guidance for using agents and AI-enabled development tools securely.
- **Make knowledge easy to navigate and reuse.** Keep focused concepts in small files, then use broader articles to synthesize and link related concepts. Maintain indexes and links as the primary discovery mechanism.
- **Keep the wiki useful as the field changes.** Revise guidance as tools and practices evolve, and distinguish durable principles from details that depend on a particular tool or version.
- **Build shared vocabulary.** Include a glossary for terms used across the wiki.

## Scope

Prefer agent-agnostic practices and emerging conventions where they apply. Copilot is the current primary use case, so Copilot-specific capabilities and guidance are in scope when they add practical value.

Guidance specific to other agent products or harnesses, such as Codex, Claude, or Cursor, is out of scope. Broad concepts and standards that apply across tools remain in scope.

## Organization

For each outcome, identify the core advice readers can act on. Use it to decide what the wiki needs to explain, prioritize, and link together, and revisit it as practices and evidence change. Review the wiki against that advice to find gaps and unsupported recommendations.

Organize navigation from the homepage through outcome overviews to practical guidance and deeper explanations. A page may support more than one outcome; link to shared material rather than duplicating it.

Provide content for these reader needs:

- **Outcome overview:** What advice helps me achieve this goal?
- **Guide:** How do I approach a task?
- **Pattern:** What reusable approach could I adopt?
- **Concept:** What idea or distinction do I need to understand?
- **Explanatory article:** How do related ideas fit together, and why do they matter?
- **Reference or checklist:** What details should I look up or check?
- **Case study:** What happened when someone applied an approach?

These are purposes, not rigid templates: a page may serve more than one need. An overview can also bring together patterns for a topic. Exploratory material can consider a possible approach without presenting it as an established practice or case study. Distinguish observed results from proposed or illustrative examples.

Use small, focused files for concepts and reusable guidance. Use larger articles to connect and explain multiple concepts. Link related material rather than duplicating it, and keep indexes up to date so readers and agents can find the right level of detail.

Keep reusable explanations in `concepts/`, narrative articles and applied references in `pages/`, provenance in `sources/`, and short standalone summaries in `slides/`. Slides link to their canonical concepts; preserve necessary examples and caveats in those concepts rather than imposing a slide-sized limit.

The topic map is allowed to change as the wiki grows; it is a navigation aid, not a rigid taxonomy.
