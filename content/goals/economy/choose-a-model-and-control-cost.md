---
type: explanation
summary: Understand model capabilities and navigate practical guidance on choosing, evaluating and controlling model costs.
status: developing
lane: guides
goal: economy
tags:
  - Copilot
  - Economy
  - Context and tokens
---

# Choose a model and control cost

Models differ in how well they investigate a problem, follow constraints and implement a change. A convincing result is not necessarily a correct one, and a low token price does not establish low delivery cost.

If you have no evidence from your own repository yet, start with Copilot Auto or a mid-tier model for a typical implementation task. Use a stronger model for unresolved design decisions and try a lighter model for specified mechanical work. Check the result against independent acceptance criteria before making that choice routine.

## What differs between models?

A model choice trades off several things:

- **Reasoning and reliability.** Hard debugging, architectural decisions and ambiguous requirements can justify a stronger model. A straightforward, specified edit may not need that capability.
- **Speed.** A fast response matters for interactive iteration; a slower, more capable model may still finish an entire difficult task sooner.
- **Context.** Models differ in how much code, history and tool output they can work with. A larger window does not guarantee that the model will use every detail well.
- **Tools and inputs.** Models differ in support for images, tools and configurable reasoning. Availability also depends on your Copilot plan and surface.
- **Price.** Fresh input, cached input, cache writes and output may have different rates. Long-context pricing may apply beyond a threshold.

OpenAI, Anthropic, Google and other providers offer overlapping models. The provider name alone is not a reliable quality ranking. GitHub's [model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) describes strengths by task, and its [supported models](https://docs.github.com/en/copilot/reference/ai-models/supported-models) page shows availability and capabilities.

## Explore the guide

- [Choosing a model](choose-a-model.md) — practical failure modes, hidden omissions and when cheaper models make sense.
- [Evaluating your model choice](evaluate-model-choice.md) — compare models on real repository tasks using independent checks.
- [Understanding and controlling costs](model-costs.md) — Copilot pricing, automatic selection, caching and session limits.
