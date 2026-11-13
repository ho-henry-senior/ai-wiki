---
type: reference
summary: Compare reusable skills with agent profiles as complementary, overlapping ways to shape agent capability and behavior.
---

# Skills and agent profiles

Skills and agent profiles can both influence how an agent works, but they serve different purposes. Their names and implementation vary by harness, so treat this as a portable working distinction rather than a universal specification.

| | Skill | Agent profile |
| --- | --- | --- |
| Main purpose | Add reusable, task-specific knowledge, instructions, examples, or procedures | Shape an agent's broader role, operating behavior, and scope |
| Typical question | “What capability or guidance should be available for this kind of task?” | “What is this agent expected and authorized to do?” |
| Reuse | A skill can be applied where the relevant task arises | A profile configures an agent for a broader role or mode of work |

They are complementary: an agent working in a particular role may use one or more skills relevant to its task. There can be overlap, and a harness may implement similar behavior through built-in features, profiles, or skills.

When documenting a particular harness, state what its implementation actually supports. Keep the underlying purpose distinct from harness-specific names, formats, and loading behavior.

For explicit role responsibilities and limits, see [Define agent role responsibilities and boundaries](agent-role-boundaries.md).
