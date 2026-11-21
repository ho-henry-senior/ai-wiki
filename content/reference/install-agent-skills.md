---
type: how-to
summary: Find a skill, read its instructions and scripts before you install it, install a pinned version with gh skill, and check that Copilot can see it.
status: developing
lane: guides
checked: 2026-11-21
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills
verification: Copilot details are checked against GitHub Docs, which the daily review rechecks. The gh skill flags are checked by hand against the GitHub CLI manual and are not rechecked automatically.
tags:
  - Copilot
  - Skills
  - Untrusted content and code
---

# Install an existing skill

Someone else's skill is code and instructions you are choosing to run. Read it first, install a version you have read, and check that Copilot picks it up.

## 1. Find a candidate

Start with [skills worth trying](agent-skills-directory.md). To look further, search with the GitHub CLI, or browse a collection such as [github/awesome-copilot](https://github.com/github/awesome-copilot):

```sh
gh skill search terraform
```

`gh skill` needs GitHub CLI 2.90.0 or later, and it is in public preview, so its commands may change.

## 2. Read it before you install it

Open the skill's `SKILL.md` and every file it bundles. `gh skill preview` shows a skill without installing it:

```sh
gh skill preview github/awesome-copilot documentation-writer
```

Check three things:

- **What it tells the agent to do.** A skill can ask the agent to run commands, change files, or act in other systems such as an issue tracker.
- **What its scripts do.** They run with the agent's permissions. If you haven't set limits, those are yours; see [secure a local coding agent](../goals/security/local-agent-security.md).
- **Who publishes it,** and whether that is the repository you meant.

## 3. Install a version you have read

```sh
gh skill install github/awesome-copilot documentation-writer@v1.2.0
```

- **Pin it.** Add `@` and a tag or commit, or use `--pin`. Without one, `gh skill` installs the latest tagged release, or the default branch if there isn't one.
- **Choose where it goes.** By default it installs into the current repository, where Copilot reads `.agents/skills/`. Use `--scope user` for a personal skill in your home directory. The Copilot cloud agent only sees skills committed to the repository.
- **Keep the record.** `gh skill` adds source details to the skill's front matter, which lets `gh skill update` find newer versions later.

You can also copy the skill's folder into `.agents/skills/NAME/` yourself.

## 4. Check that Copilot can see it

| Where       | How                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| Copilot CLI | Run `/skills reload`, then `/skills info NAME`. From a terminal, `copilot skill list` lists the skills found. |
| Copilot app | Use `/skills`; `/skills reload` picks up a skill added during a session.                                      |
| VS Code     | Type `/skills` in the chat input to open the **Configure Skills** menu.                                       |

Then [test whether it helps](test-agent-skills.md) on a real task before you rely on it.

## 5. Update deliberately

`gh skill update` checks installed skills for newer versions. Treat an update as new code: read what changed before you accept it, and test again afterwards.

## Sources

- [GitHub Docs: Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [GitHub Docs: Adding agent skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [GitHub CLI manual: gh skill install](https://cli.github.com/manual/gh_skill_install)
- [GitHub Changelog: Manage agent skills with GitHub CLI](https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/)
- [VS Code docs: Use Agent Skills in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills)
