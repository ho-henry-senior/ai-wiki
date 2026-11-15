# Design goals

## Purpose

Build an organized, well-indexed wiki of practical AI usage. Help people use AI effectively in software work, and help agents produce better work by giving them the right tools, instructions, and project context.

The wiki is expected to evolve as AI capabilities and conventions change. Its structure should make it easy to add, revise, and connect knowledge without requiring every topic to live in a single large document.

## Audience and authorship

The primary audience is experienced software developers who use GitHub Copilot as their main agent. It includes public-sector teams, who must often show evidence and keep audit trails for their work.

The wiki is primarily maintained by one contributor with AI assistance. Favor an organization and writing approach that are easy for a single person to maintain and for an agent to navigate and extend. Keep the material useful to other contributors without making multi-author collaboration a design constraint.

## Goals

Help readers improve these outcomes in AI-assisted work:

- **Alignment:** Get results that match what you intended. Define the work, give Copilot the context and checks it needs, steer it while it works, and verify the result. This task-level meaning complements the broader AI meaning in the [glossary](pages/glossary.md#alignment).
- **Economy:** Achieve useful results with less time and fewer tokens, without sacrificing quality or security. Reduce rework, delegate repeatable tasks to deterministic tools, and make their interfaces clear.
- **Traceability:** Leave a record someone else can follow later: what was asked, what the agent did, who directed and approved it, and the evidence behind the result. Record agent authorship honestly and keep corrections visible, for example by steering through issue and PR comments rather than private chat. An agent's explanation of its work is not a complete account of its reasoning. For public-sector work, this record is often an obligation, not just good practice. Alignment owns defining, steering, and verifying the work; Traceability owns the record of it.
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

Write for Copilot first. Name the Copilot file, setting, or command that puts advice into practice, and state what Copilot does, with the date that behavior was checked. Say which Copilot surface a statement applies to (chat, CLI, cloud agent, or code review) when behavior differs. Add a portability note only where it matters, such as when a convention like `AGENTS.md` is shared with other tools.

Guidance specific to other agent products or harnesses, such as Codex, Claude, or Cursor, is out of scope. Broad concepts and standards that apply across tools remain in scope.

## Organization

For each outcome, identify the core advice readers can act on. Use it to decide what the wiki needs to explain, prioritize, and link together, and revisit it as practices and evidence change. Review the wiki against that advice to find gaps and unsupported recommendations.

Make the primary reader journey: homepage, outcome overview, then actions with practical examples. Lead with the action and follow it with why it helps and how to verify it; link to the underlying principle for depth. A journey may span several pages or remain within one page; retain direct paths to practical guidance for readers who already understand the principle. A page may support more than one outcome; link to shared material rather than duplicating it.

Make navigation and the sitemap reflect the goals and their priorities, not just the directory layout. Give prominence to actions with clear likely benefit and proportionate effort, while keeping essential safeguards visible even when they take more work. Connect guidance to its principles, supporting evidence, and limitations. Label case studies, illustrative approaches, and subjective perspectives so readers can distinguish context from advice; make optional context discoverable without presenting it as a required step. Keep the full inventory available alongside curated paths.

Provide content for these reader needs:

- **Outcome overview:** What advice helps me achieve this goal?
- **Guide:** How do I approach a task?
- **Pattern:** What reusable approach could I adopt?
- **Concept:** What idea or distinction do I need to understand?
- **Explanatory article:** How do related ideas fit together, and why do they matter?
- **Reference or checklist:** What details should I look up or check?
- **Case study:** What happened when someone applied an approach?

These are purposes, not rigid templates: a page may serve more than one need. An overview can also bring together patterns for a topic. Exploratory material can consider a possible approach without presenting it as an established practice or case study. Distinguish observed results from proposed or illustrative examples.

Make significant content gaps visible. Completeness is distinct from correctness and freshness; a complete page is not necessarily accurate or current.

Use small, focused files for concepts and reusable guidance. Use larger articles to connect and explain multiple concepts. Link related material rather than duplicating it, but state each section's action in full: a link adds depth and never replaces the advice. Keep indexes up to date so readers and agents can find the right level of detail.

Write every page to [the writing standard](STYLE.md).

Keep reusable explanations in `concepts/`, narrative articles and applied references in `pages/`, provenance in `sources/`, and short standalone summaries in `slides/`. Slides link to their canonical concepts; preserve necessary examples and caveats in those concepts rather than imposing a slide-sized limit.

The topic map is allowed to change as the wiki grows; it is a navigation aid, not a rigid taxonomy.
