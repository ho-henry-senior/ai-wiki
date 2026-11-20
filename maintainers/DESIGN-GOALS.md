# Design goals

## Purpose

Build an organized, well-indexed wiki of practical AI usage. Help people use AI effectively in software work, and help agents produce better work by giving them the right tools, instructions, and project context.

The wiki is expected to evolve as AI capabilities and conventions change. Its structure should make it easy to add, revise, and connect knowledge without requiring every topic to live in a single large document.

## Audience and authorship

The primary audience is experienced software developers. Most use GitHub Copilot as their main agent; some also use other agents, such as Claude Code. The audience includes public-sector teams, who must often show evidence and keep audit trails for their work.

The wiki is primarily maintained by one contributor with AI assistance. Favor an organization and writing approach that are easy for a single person to maintain and for an agent to navigate and extend. Keep the material useful to other contributors without making multi-author collaboration a design constraint.

## Goals

Help readers improve these outcomes in AI-assisted work:

- **Alignment:** Start with a grilling, not a prompt. Have the agent question the request, answer or rule out each point it raises, and let the answers become the specification the work is built from. Then steer implementation and verify results against the agreement. This task-level meaning complements the broader AI meaning in the [glossary](../content/reference/glossary.md#alignment).
- **Economy:** Stop the agent discovering what you could tell it. Give the repository the information an agent would otherwise infer from code and history, and give it cheap deterministic tools behind a discoverable command interface, so it does not spend tokens and time experimenting. Achieve useful results with less time and fewer tokens, without sacrificing quality or security.
- **Security:** Control what an agent can reach and do: its permissions, sandbox, tools, provisioning, and exposure of sensitive data. Identify risks, configure controls enforced independently of the model, and review integrations before enabling them.
- **Traceability & Trust:** Leave a record someone else can follow later, and accept changes on evidence. The record covers what was asked, what the agent did, who directed and approved it, and the evidence behind the result: record agent authorship honestly and keep corrections visible, for example by steering through issue and PR comments rather than private chat. An agent's explanation of its work is a claim, not a complete account of its reasoning. For public-sector work, this record is often an obligation, not just good practice. Trust is the decision to accept a change: where human review is spent, and, as agent pull requests multiply, which changes need a person at all. An agent declaring a change low-risk is never enough to accept it.

Alignment owns whether the work matches what was agreed: defining, steering, and verifying it. Traceability & Trust owns the record of the work and the decision to accept it. Security owns what the agent can reach and do.

Present the goals in this order, alphabetically, so the order does not imply a ranking; the homepage's first steps say what to do first. Organise the wiki around the advice we want readers to act on, not around the content we happen to have. Write each goal's core advice from the practices that made a difference, then link to the articles that support it. Give each goal overview a few core points; the number follows the advice, not a target. Each should be understandable on its own, explain the principle behind it, and offer a practical starting action. A useful prompt is whether a reader could make a start this week with the page alone; it is a prompt, not a rule, and some important controls take longer. Material that describes a whole process or policy belongs in a guide, as options, linked from "Explore further".

These goals overlap: for example, a clear specification can improve alignment, reduce rework, and support traceability. Organize navigation around reader outcomes without forcing a topic into only one goal.

Lead readers toward practical changes with a clear likely benefit and modest effort. Explain how to try and verify them, while linking to deeper concepts when they become relevant. Effort and benefit depend on context; essential security controls are not optional simply because they take more work.

To support those outcomes:

- **Make guidance practical.** Include workflows, examples, concepts, and explanations that help readers apply AI to real work.
- **Improve agent work in repositories.** Document ways to make repositories easier for agents to use, including tools, machine-readable instructions, and indexed project documentation that helps agents load only the context they need.
- **Support spec-driven development.** Show how agents can challenge initial requests, surface unresolved decisions and draft specifications that humans review before agents turn agreed requirements into tasks and implement them.
- **Cover security best practices.** Develop practical guidance for using agents and AI-enabled development tools securely.
- **Make knowledge easy to navigate and reuse.** Keep focused concepts in small files, then use broader articles to synthesize and link related concepts. Maintain indexes and links as the primary discovery mechanism.
- **Keep the wiki useful as the field changes.** Revise guidance as tools and practices evolve, and distinguish durable principles from details that depend on a particular tool or version.
- **Build shared vocabulary.** Include a glossary for terms used across the wiki.

## Scope

Be agent-agnostic by default, with detailed Copilot and GitHub guidance. Prefer conventions shared across agents, such as `AGENTS.md` and Agent Skills in `.agents/skills/`, over tool-specific files. Agent tools are converging on these conventions, so treat a tool that does not yet support one as a dated exception: say so, and give the workaround.

Then show how to put each practice into effect with Copilot and GitHub. Name the file, setting, or command, and state what Copilot does, with the date that behavior was checked. Say which Copilot surface a statement applies to (chat, CLI, cloud agent, or code review) when behavior differs.

Which features other agents support, such as Codex, Claude Code, Cursor, or Gemini CLI, is in scope: support tables help readers who use more than one agent. Step-by-step setup for those products is out of scope. Where no shared convention exists, give the Copilot-specific detail.

## Organization

Aim for a smaller, more focused collection in which every page earns its place. Consider what readers already know, and ask what would actually be lost if a page disappeared.

For each outcome, identify the core advice readers can act on. Use it to decide what the wiki needs to explain, prioritize, and link together, and revisit it as practices and evidence change. Review the wiki against that advice to find gaps and unsupported recommendations.

Make the primary reader journey: homepage, outcome overview, then actions with practical examples. Give each action with why it matters and how to verify it, and explain the underlying principle well enough for readers to apply it to cases the page does not cover. A journey may span several pages or remain within one page; retain direct paths to practical guidance for readers who already understand the principle. A page may support more than one outcome; link to shared material rather than duplicating it.

Make navigation reflect the goals and their priorities, not just the directory layout. Give prominence to actions with clear likely benefit and proportionate effort, while keeping essential safeguards visible even when they take more work. Connect guidance to its principles, supporting evidence, and limitations. Label case studies, illustrative approaches, and subjective perspectives so readers can distinguish context from advice; make optional context discoverable without presenting it as a required step. Keep the full inventory available alongside curated paths.

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

Keep reusable explanations in `concepts/`, narrative articles and applied references in `content/`, provenance in `sources/`, and short standalone summaries in `slides/`. Slides link to their canonical concepts; preserve necessary examples and caveats in those concepts rather than imposing a slide-sized limit.

The topic map is allowed to change as the wiki grows; it is a navigation aid, not a rigid taxonomy.

Tags are a second way in, across the goals: one flat list covering parts of Copilot and, when they are worth it, topics. Keep the list short, and add a tag only when it groups pages that a reader would otherwise have to find one by one. Navigation stays organized by goal; tags do not replace it.
