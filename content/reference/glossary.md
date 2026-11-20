---
type: reference
---

# AI glossary

The [source research note](../sources/ai-terms-research.md) records supporting sources, commonly confused terms, and areas where definitions are unsettled.

## A

### AI system

A machine-based system that infers outputs from inputs to achieve explicit or implicit objectives, with varying degrees of autonomy. A deployed AI system includes more than its model: it also includes the surrounding software, data, and interface. See the [OECD's AI system definition](https://oecd.ai/en/wonk/ai-system-definition-update).

### AI Credit

Copilot's billing unit, worth one US cent. Copilot prices each request's input, cached input, and output tokens at the model's rate and converts the total into AI Credits. See [choose a model and control cost](../goals/economy/choose-a-model-and-control-cost.md).

### Alignment

How well an AI system's behavior reflects human intentions and values. In this wiki, alignment also describes how well an agent's work matches the intended outcome of a specific task. Reinforcement learning from human feedback (RLHF) is one technique used toward the broader goal; it is not the same as system-level safety controls. See [OpenAI's approach to alignment research](https://openai.com/index/our-approach-to-alignment-research/).

### Agent

An AI system that uses a model to pursue a task, often by selecting actions, using tools, and responding to results. The term is used inconsistently; state how much control the model has over the task's steps. See [Building effective agents](https://www.anthropic.com/research/building-effective-agents) and [the tool-call loop](../concepts/tool-call-loop.md).

### Agent harness

The software around a model that supplies context and tools, handles tool requests, and manages the interaction loop. It is distinct from the model and from the overall agent system, although usage varies. See [the tool-call loop](../concepts/tool-call-loop.md) and [inside a coding agent](../articles/inside-coding-agent.md).

### AGENTS.md

A Markdown file of instructions for coding agents, placed at the root of a repository. It is a shared convention: Copilot's agent features, Codex, Cursor, and Claude Code (when there is no `CLAUDE.md`) read it. See [write repository instructions in AGENTS.md](../goals/alignment/repository-instructions.md).

### Agentic system

A system organized to let a model take multiple steps toward a goal, possibly using tools. This term may include both predefined workflows and agents that choose their own next actions; distinguish the two when the control flow matters.

## B

### Benchmark

A shared evaluation dataset or task used to compare systems under specified conditions. A benchmark score is not a substitute for testing on the tasks and data that matter in a particular application.

## C

### Chain of thought

Intermediate reasoning steps produced or elicited while solving a task. A displayed reasoning trace should not automatically be treated as a complete or faithful account of how a model arrived at its answer.

### Compaction

Summarizing older parts of a long conversation so it fits the context window. It can lose detail and does not delete the saved history. Copilot CLI compacts automatically, or on request with `/compact`. See [session history versus active context](../concepts/session-history-vs-context.md).

### Context window

The amount of input and generated output a model can consider in a single interaction. It is not the same as persistent memory or training data, and a larger context window does not guarantee that all included information will be used well. See [session history versus active context](../concepts/session-history-vs-context.md).

### Custom agent

In Copilot, a named role defined in `.github/agents/NAME.agent.md`, with its own instructions and an optional `tools` list that limits what it can do. See [skills, profiles, and tools](../concepts/skills-profiles-and-tools.md).

## E

### Embedding

A numerical representation of data, such as text, where relationships between vectors can be used for tasks like semantic search, clustering, or recommendation. Embeddings are produced by models and are not summaries or human-readable descriptions. See [vector stores](../concepts/vector-stores.md) and [vector embeddings](https://developers.openai.com/api/docs/guides/embeddings).

### Evaluation (eval)

A repeatable assessment of how well a model or agent performs defined tasks against expected outcomes or grading criteria. For a coding agent, an eval can compare task success, reliability or cost before and after a change to its model or instructions. Unlike verifying one code change, an eval measures performance across a set of tasks or runs. Its conclusions are limited by how representative the tasks and criteria are. See [Anthropic's explanation of agent evals](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) and [OpenAI's evaluation guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices).

## F

### Fine-tuning

Further training of a pre-trained model to adjust its behavior or specialize it for a task. Unlike prompting or retrieval-augmented generation, fine-tuning changes the model's learned parameters. Parameter-efficient methods such as [LoRA](https://arxiv.org/abs/2106.09685) update a smaller set of parameters.

### Foundation model

A model trained on broad data at scale that can be adapted to many downstream tasks. The term is used broadly in research; related terms in regulation, such as “general-purpose AI model,” can have specific legal meanings. See [On the Opportunities and Risks of Foundation Models](https://arxiv.org/abs/2108.07258).

## G

### Generative AI

AI systems that use models to generate content, such as text, images, audio, video, or code. Generative AI is a broad category; a large language model is one kind of generative model.

### Guardrails

Controls around an AI system that constrain inputs, outputs, or actions—for example, content filters, tool permissions, output schemas, or human approval steps. “Guardrails” has no single standard definition, and no single control guarantees safety. See [instructions versus enforced controls](../concepts/instructions-vs-controls.md).

## H

### Hallucination

Generated content that is false, unsupported, or inconsistent with a provided source, while presented plausibly. The term describes an output problem, not intentional deception. Grounding and citations can help but do not eliminate it. See this [survey of hallucination in natural language generation](https://arxiv.org/abs/2202.03629).

### Hill climbing

A local search approach that repeatedly moves from a candidate to a better nearby alternative according to an evaluation. It can stop at a local optimum even when a better result exists elsewhere. Iterating with an agent until tests pass works like this, so it is only as good as the tests; see [Verify the result](../goals/alignment/define-and-verify-tasks.md#verify-the-result).

## I

### In-context learning

A model's ability to perform a task based on instructions or examples included in its prompt, without updating its learned parameters. The effect is limited to the information available in that interaction.

### Inference

Running a trained model on input to produce an output. In ordinary use, inference does not update the model's learned parameters; that differs from training or fine-tuning.

## L

### Large language model (LLM)

A model trained on language data to process and generate text, typically by predicting tokens. An LLM is one kind of model and is not synonymous with generative AI, which also includes models for other modalities.

## M

### Machine learning

A field of AI in which systems learn patterns or behavior from data rather than relying only on rules explicitly written by a programmer. Training is the process of fitting a model; inference is using the trained model.

### Model

A learned computational component that maps input to output based on parameters fitted during training. A model is not the same as the complete AI system in which it is used.

### Model Context Protocol (MCP)

An open protocol for connecting AI applications to external servers that provide capabilities such as tools, resources, and prompts. MCP standardizes communication between applications and servers; it is not itself a model or an agent. See the [MCP specification](https://modelcontextprotocol.io/specification/latest) and [local versus remote servers](../concepts/local-and-remote-mcp.md).

### Multimodal model

A model that can process or generate more than one type of data, such as text, images, or audio. Input and output modalities are distinct capabilities and should be checked separately.

## P

### Prompt

The input provided to a model, including the request and any instructions, examples, or context. A prompt may be assembled from multiple sources, not just a user's latest message.

### Prompt caching

Reusing input that a provider has stored from a recent request, so it is processed and charged at a lower rate. Changing the model, tools, or settings mid-session, or a pause long enough for the cache to expire, means the next request pays the full rate. See [choose a model and control cost](../goals/economy/choose-a-model-and-control-cost.md#keep-the-cache).

### Prompt injection

An attack in which untrusted input—directly from a user or indirectly from content the model reads—tries to alter the model's behavior or override intended instructions. The risk depends in part on what tools and permissions the system gives the model. See [OWASP's LLM Prompt Injection guidance](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).

## R

### Reasoning model

A model marketed or designed for stronger multi-step problem solving, often using additional computation before producing a response. The term does not describe one universal architecture or guarantee that a correct answer will result.

### Red teaming

Adversarial testing in which people deliberately probe a system to discover weaknesses, unsafe behavior, or ways it can be misused before deployment.

### Retrieval-augmented generation (RAG)

A technique that retrieves external information and includes it in the model's input to inform a generated response. RAG can provide up-to-date or domain-specific context without changing model weights, but answer quality depends on retrieval and interpretation. See [RAG](../concepts/retrieval-augmented-generation.md) and the original [RAG paper](https://arxiv.org/abs/2005.11401).

## S

### Sandbox

An enforced limit on what an agent's commands can read, change, or contact, applied by the operating system or platform rather than by instructions. Copilot's local sandbox is turned on with `/sandbox enable`. See [secure a local coding agent](../goals/security/local-agent-security.md).

### Skill

A reusable package of task-specific instructions and optional supporting resources, in a `SKILL.md` file. In agents that support skills, the name and description help the agent choose one, and the instructions load when needed. See [skills, profiles, and tools](../concepts/skills-profiles-and-tools.md) for how their purposes differ.

### Stochastic

Involving randomness or probability. A stochastic search uses randomness in its choices; that is separate from variability in the evaluation itself. See [hill climbing](#hill-climbing).

### Structured output

Model output constrained to follow a format, such as a JSON schema. Valid structure does not guarantee correct content; applications still need to handle refusals, incomplete responses, and domain-specific validation.

## T

### Token

A unit of text processed by a model, often a word or part of a word. Tokenization varies by model, so a token is not the same as a word or a fixed number of characters. Tokens are commonly used to measure input and output limits, and to charge for use; see [choose a model and control cost](../goals/economy/choose-a-model-and-control-cost.md).

### Tool calling

A pattern in which a model returns a request to invoke an application-provided tool; the surrounding application executes it and supplies the result back to the model. The model's request is not the same as the tool action itself. See [the tool-call loop](../concepts/tool-call-loop.md).

### Training

The process of fitting a model's parameters using data. Pre-training builds broad capabilities; fine-tuning further adapts a pre-trained model. A conversation with a model does not ordinarily train or update it.

### Transformer

A neural-network architecture based on attention mechanisms, introduced in the 2017 paper [Attention Is All You Need](https://arxiv.org/abs/1706.03762). Transformers are widely used in current language models, but the term describes an architecture, not a product or a guarantee of capability.

## V

### Vector store

A system that stores and indexes vector representations, often to retrieve items with similar embeddings. Vector stores are commonly used for semantic search and as part of RAG systems. See [vector stores](../concepts/vector-stores.md).

## W

### Workflow (AI workflow)

A sequence of steps that combines models, tools, and application logic. In a predefined workflow, code determines the sequence; in an agent, the model has more control over which step or action comes next. This distinction is useful, though “agent” is not used consistently across the field.
