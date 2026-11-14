# Design goals

## Purpose

Build an organized, well-indexed wiki of practical AI usage. Help people use AI effectively in software work, and help agents produce better work by giving them the right tools, instructions, and project context.

The wiki is expected to evolve as AI capabilities and conventions change. Its structure should make it easy to add, revise, and connect knowledge without requiring every topic to live in a single large document.

## Audience and authorship

The primary audience is people building with AI agents, especially in software repositories. The initial practical focus is GitHub Copilot.

The wiki is primarily maintained by one contributor with AI assistance. Favor an organization and writing approach that are easy for a single person to maintain and for an agent to navigate and extend. Keep the material useful to other contributors without making multi-author collaboration a design constraint.

## Goals

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

Use small, focused files for concepts and reusable guidance. Use larger articles to connect and explain multiple concepts. Link related material rather than duplicating it, and keep indexes up to date so readers and agents can find the right level of detail.

Keep reusable explanations in `concepts/`, narrative articles and applied references in `pages/`, and provenance in `sources/`. Concepts can be useful foundations for short slides, but preserve necessary examples and caveats rather than imposing a slide-sized limit.

The topic map is allowed to change as the wiki grows; it is a navigation aid, not a rigid taxonomy.
