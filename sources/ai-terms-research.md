---
lane: reference
order: 4
---

# General AI terms: source-backed vocabulary candidates

Research note for a standalone, broadly applicable AI glossary. It is deliberately **not** limited to terms already used in this wiki's pages. Reviewed 2026-11-14. Vendor documentation (OpenAI, Anthropic) changes quickly, so re-check those links before relying on product-specific details; standards, regulations, and papers are more stable. Proposed definitions are concise paraphrases for the glossary, not quotations, and the cited sources support the points listed under each term.

## How to use this note

- Each entry gives a proposed definition, a boundary note where the term is commonly conflated, and primary sources.
- Where a point rests on common field usage rather than a located primary source, it is marked **(general usage)** so a maintainer can decide whether to keep it.
- Suggested glossary order is the grouping below; the glossary itself is alphabetical.

## A. Core concepts

### 1. AI system

A machine-based system that, for explicit or implicit objectives, infers from its input how to generate outputs (predictions, content, recommendations, decisions) that can influence physical or virtual environments, with varying levels of autonomy.

- **Boundary:** an AI _system_ is the deployed whole (model plus interface, data, and surrounding software). A _model_ is one component.
- Sources: [EU AI Act, Article 3(1)](https://artificialintelligenceact.eu/article/3/); [OECD, update to the AI-system definition](https://oecd.ai/en/wonk/ai-system-definition-update) (the EU text follows the revised OECD wording).

### 2. Model (AI model)

The learned component, defined by parameters (weights) fitted to data, that maps inputs to outputs. It is not usable by itself as a product; it is integrated into systems.

- **Boundary:** model ≠ system ≠ agent (see 1 and 19). The EU Act itself distinguishes "AI model" from "AI system" and refers to models being "integrated into a variety of downstream systems".
- Sources: [EU AI Act, Article 3](https://artificialintelligenceact.eu/article/3/) (definitions of general-purpose AI model/system). The "parameters/weights" wording is **(general usage)**.

### 3. Machine learning, training, and inference

- **Training:** fitting a model's parameters to data. **Inference:** running an already-trained model on new input to produce output; parameters do not change.
- **Pre-training** learns broad capabilities from large unlabeled data; later adaptation (see 7) specializes it.
- **Boundary:** "learning" in a chat does not update weights; in-context behavior (see 9) is inference-time only.
- Sources: pre-train-then-adapt pattern in [BERT (arXiv 1810.04805)](https://arxiv.org/abs/1810.04805) and [LoRA (arXiv 2106.09685)](https://arxiv.org/abs/2106.09685); self-supervised training at scale referenced in the [EU AI Act GPAI model definition](https://artificialintelligenceact.eu/article/3/). The explicit training/inference split is **(general usage)**; no single primary definition was located.

### 4. Foundation model / general-purpose AI model

A model trained on broad data at scale that adapts to many downstream tasks. "Foundation model" is the research term; "general-purpose AI model" is the EU legal term (displays significant generality, performs a wide range of distinct tasks, integrable into many downstream systems).

- **Boundary:** the two terms overlap heavily but are not formally identical; the legal term carries regulatory consequences.
- Sources: [Bommasani et al., On the Opportunities and Risks of Foundation Models (arXiv 2108.07258)](https://arxiv.org/abs/2108.07258); [EU AI Act, Article 3](https://artificialintelligenceact.eu/article/3/).

### 5. Large language model (LLM) and Transformer

An LLM is a large neural language model, typically a Transformer pre-trained on massive text, that generates text one token at a time. The Transformer is the attention-based architecture introduced in 2017 that most current LLMs build on.

- **Boundary:** LLM names a model type; "generative AI" is a broader category that also covers image, audio, and video generation.
- Sources: [Attention Is All You Need (arXiv 1706.03762)](https://arxiv.org/abs/1706.03762); [Language Models are Few-Shot Learners (arXiv 2005.14165)](https://arxiv.org/abs/2005.14165).

## B. Training and adaptation

### 6. Alignment and RLHF

Alignment: making model behavior match user intent and human values (helpful, honest, harmless). RLHF (reinforcement learning from human feedback) is one technique: fine-tune using human demonstrations and preference rankings. InstructGPT showed that a much smaller RLHF-tuned model could be preferred over a much larger untuned one.

- **Boundary:** RLHF is a method; alignment is the goal; "safety" (see 23) is broader than either.
- Source: [Training language models to follow instructions with human feedback (arXiv 2203.02155)](https://arxiv.org/abs/2203.02155).

### 7. Fine-tuning (and parameter-efficient methods such as LoRA)

Further training a pre-trained model on a narrower dataset to change its behavior or specialize it. Full fine-tuning updates all parameters; LoRA freezes the original weights and trains small injected low-rank matrices, greatly reducing trainable parameters and storage.

- **Boundary:** fine-tuning changes the model's weights; RAG (see 13) and prompting do not. Fine-tuning is generally better for changing style, format, or behavior than for reliably adding fresh facts **(general usage; confirm against vendor guidance when used)**.
- Sources: [LoRA (arXiv 2106.09685)](https://arxiv.org/abs/2106.09685); [BERT](https://arxiv.org/abs/1810.04805); vendor overview of supervised fine-tuning and direct preference optimization in the [OpenAI fine-tuning guide](https://developers.openai.com/api/docs/guides/fine-tuning).

## C. Inputs, context, and representations

### 8. Token

The unit of text a model processes: a chunk of characters, often a word piece. Tokenization splits text into tokens; usage limits and billing are measured in tokens. Rough English rule of thumb from OpenAI: about 4 characters or 0.75 words per token. Counts vary by tokenizer, so tokens are model-specific.

- **Boundary:** token ≠ word ≠ character. Images and tool definitions also consume tokens in some APIs.
- Sources: [OpenAI, key concepts: tokens](https://developers.openai.com/api/docs/concepts); [Anthropic, context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (system prompt, messages, tool results, images, tool definitions all count).

### 9. Prompt and in-context learning

A prompt is the input given to a model. In-context (few-shot) learning is a model performing a task from instructions or examples placed in the prompt, without weight updates. A _system prompt_ carries standing instructions; a _user prompt_ carries the request.

- **Boundary:** in-context learning is not training or fine-tuning; it disappears when the context does.
- Sources: [GPT-3 paper (arXiv 2005.14165)](https://arxiv.org/abs/2005.14165) (few-shot performance from instructions or a few examples, without task-specific fine-tuning datasets).

### 10. Context window (and context rot)

All the text (tokens) a model can reference when generating a response, including the response itself; a working memory distinct from the training data. Bigger is not automatically better: accuracy and recall can degrade as tokens grow ("context rot"), so curating context matters. Long-running work uses strategies such as compaction.

- **Boundary:** context window ≠ training data ≠ persistent memory.
- Sources: [Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows); [Anthropic, Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (linked from that page; not separately reviewed).

### 11. Embedding

A vector (list of floating-point numbers) representing text (or other data) so that distance between vectors measures relatedness. Used for search, clustering, recommendation, anomaly detection, and classification.

- **Boundary:** an embedding model is separate from a generative model; an embedding is not a summary and is not human-readable. Embeddings from different models are not interchangeable **(general usage)**.
- Sources: [OpenAI, Vector embeddings](https://developers.openai.com/api/docs/guides/embeddings); CLIP as a multimodal example: [arXiv 2103.00020](https://arxiv.org/abs/2103.00020).

### 12. Semantic search and vector store

Semantic search uses embeddings to surface results by meaning, including results with few or no shared keywords. A vector store (vector database) indexes embeddings for similarity lookup.

- **Boundary:** keyword search matches terms; semantic search matches meaning. Many systems combine both **(general usage)**.
- Source: [OpenAI, Retrieval guide](https://developers.openai.com/api/docs/guides/retrieval).

### 13. Retrieval-augmented generation (RAG)

Generation conditioned on passages retrieved from an external knowledge source at query time. The original paper combines a parametric model with non-parametric memory to improve knowledge-intensive tasks and provenance and to allow knowledge updates without retraining.

- **Boundary:** RAG changes the _input_, not the model; it is not fine-tuning. Retrieval quality limits answer quality, and retrieved text can carry prompt injection (see 22).
- Sources: [Lewis et al. (arXiv 2005.11401)](https://arxiv.org/abs/2005.11401); [OpenAI, Retrieval](https://developers.openai.com/api/docs/guides/retrieval).

### 14. Multimodal model

A model that accepts or produces more than one modality (for example text, images, audio). Vision means analyzing image inputs; image generation is a separate capability.

- **Boundary:** "multimodal input" and "multimodal output" are different; check which a model supports.
- Sources: [OpenAI, Images and vision](https://developers.openai.com/api/docs/guides/images-vision) (vision as image input analysis, separate from image generation); [CLIP (arXiv 2103.00020)](https://arxiv.org/abs/2103.00020) for joint image-text learning.

## D. Behavior and output

### 15. Hallucination (confabulation)

Generated content that is unfaithful to a provided source or not grounded in fact, delivered fluently. The NLG survey distinguishes intrinsic (contradicts the source) from extrinsic (unverifiable from the source) hallucination.

- **Boundary:** not the same as a bug or a deliberate lie; the model has no intent. Grounding (RAG, citations) reduces but does not eliminate it.
- Source: [Survey of Hallucination in Natural Language Generation (arXiv 2202.03629)](https://arxiv.org/abs/2202.03629). NIST's generative AI profile (AI 600-1) uses "confabulation" for related risk; its text could not be extracted in this session, so that wording is unverified (see Gaps).

### 16. Reasoning model and chain of thought

Chain-of-thought prompting elicits intermediate reasoning steps to improve multi-step tasks. Vendor "reasoning models" generate internal reasoning tokens before answering, which helps planning, tool use, and multi-step work.

- **Boundary:** visible reasoning text is not guaranteed to be a faithful account of the model's computation **(general usage)**; reasoning tokens are typically billed and count toward limits.
- Sources: [Chain-of-Thought Prompting (arXiv 2201.11903)](https://arxiv.org/abs/2201.11903); [OpenAI, Reasoning models](https://developers.openai.com/api/docs/guides/reasoning); [Anthropic context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (extended thinking counts toward the window).

### 17. Structured output

Constraining model output to a supplied JSON Schema so it can be parsed reliably. Schema adherence applies to completed, non-refusal output; applications must still handle refusals, incomplete responses, and business-rule validation.

- **Boundary:** valid structure ≠ correct content.
- Source: [OpenAI, Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs).

## E. Tools and agents

### 18. Tool calling (function calling) and MCP

Tool calling: the application declares tools (for example with JSON Schema); the model may respond with a _tool call_ (name plus arguments); the application executes it and returns the result. The model requests; the application acts. Model Context Protocol (MCP) is an open JSON-RPC protocol standardizing how host applications connect to servers exposing tools, resources, and prompts.

- **Boundary:** tool calling is a model capability/API pattern; MCP is an interoperability protocol layered over it. In MCP, "tools" are one of three server features alongside resources and prompts.
- Sources: [OpenAI, Function calling](https://developers.openai.com/api/docs/guides/function-calling) ("function calling" also known as "tool calling"); [MCP specification 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18).

### 19. Agent, agentic system, and workflow

Anthropic's architectural distinction: **workflows** orchestrate LLMs and tools through predefined code paths; **agents** are systems where LLMs dynamically direct their own process and tool usage; **agentic system** covers both. The ReAct pattern interleaves reasoning traces with actions. Agents trade latency and cost for flexibility; the simplest adequate design is recommended.

- **Boundary:** "agent" is used inconsistently across vendors. Prefer stating who controls the control flow. An agent is not just a chatbot, and a model with tools is not necessarily an agent.
- Sources: [Anthropic, Building effective agents](https://www.anthropic.com/research/building-effective-agents) (note: the post states parts of the tooling landscape have changed since December 2024); [ReAct (arXiv 2210.03629)](https://arxiv.org/abs/2210.03629).

## F. Evaluation, safety, and risk

### 20. Evaluation (evals) and benchmark

Evals test model or application outputs against criteria you specify (style, content, correctness); essential when upgrading or trying models. A benchmark is a shared, fixed evaluation set for comparing models.

- **Boundary:** benchmark scores on public sets do not substitute for evals on your own task and data **(general usage)**. Note: OpenAI's Evals platform is being deprecated (read-only 2026-10-31, shutdown 2026-11-30 per its page); the concept is vendor-independent.
- Source: [OpenAI, Working with evals](https://developers.openai.com/api/docs/guides/evals).

### 21. Red teaming

Adversarially testing a system across a wide range of inputs, including those from someone trying to break it, to find failures before users do.

- Source: [OpenAI, Safety best practices (adversarial testing)](https://developers.openai.com/api/docs/guides/safety-best-practices).

### 22. Prompt injection

Input that alters an LLM's behavior in unintended ways. _Direct_: from the user's own prompt. _Indirect_: from external content the model ingests (websites, files). Severity depends on the agency (tools and permissions) given to the model. OWASP notes RAG and fine-tuning do not fully remove the vulnerability.

- **Boundary:** distinct from "jailbreaking" (getting a model to ignore its safety training), though they overlap **(general usage)**.
- Source: [OWASP LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).

### 23. Guardrails, moderation, and AI safety

Guardrails are controls around a model or system that constrain inputs, outputs, or actions (content moderation, schemas, permissions, human approval). Moderation classifies content for harmful categories; OpenAI offers a free moderation endpoint and notes you can build your own filtering. Safety is the broader discipline; risk is the combination of probability and severity of harm.

- **Boundary:** guardrails are system-level controls, not a property of the model alone; alignment (see 6) is model-level.
- Sources: [OpenAI, Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices); [EU AI Act, Article 3(2) (definition of risk)](https://artificialintelligenceact.eu/article/3/); [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework). "Guardrails" has no single standard definition; the above definition is **(general usage)**.

## Commonly conflated pairs (for glossary "not to be confused with" notes)

| Pair                                        | Distinction                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| Model vs. AI system                         | Component vs. deployed whole (1, 2)                                       |
| Training vs. inference                      | Weights change vs. weights fixed (3)                                      |
| Fine-tuning vs. RAG vs. prompting           | Changes weights vs. adds retrieved input vs. adds instructions (7, 9, 13) |
| Context window vs. memory vs. training data | Per-request working set vs. persisted state vs. learned parameters (10)   |
| Tool calling vs. MCP                        | Model/API capability vs. connection protocol (18)                         |
| Workflow vs. agent                          | Predefined code path vs. model-directed control flow (19)                 |
| Eval vs. benchmark                          | Task-specific tests vs. shared standard set (20)                          |
| Alignment vs. guardrails                    | Model behavior vs. system controls (6, 23)                                |
| LLM vs. generative AI vs. foundation model  | Model type vs. output category vs. broad-adaptable model class (4, 5)     |

## Possible additions if the glossary grows

Mixture of experts, distillation/quantization, temperature and sampling, supervised vs. unsupervised vs. reinforcement learning, overfitting, bias/fairness, explainability, synthetic data, diffusion model, agent memory, human-in-the-loop, jailbreak, model card. Not researched here.

## Gaps and uncertainties

- NIST AI 600-1 (Generative AI Profile) PDF could not be text-extracted, so its definitions (confabulation, generative AI, etc.) are not quoted; verify directly before citing.
- No single primary definition was located for training vs. inference, guardrails, or benchmark; these are marked as general usage.
- OECD and EU wording for "AI system" were verified; OECD page text was truncated after the definition rationale, and the EU Act page was used for the exact current text.
- Vendor pages (OpenAI, Anthropic) reference model names and deprecation dates that will go stale; the glossary should keep definitions vendor-neutral and link vendor docs only as evidence.
- Anthropic's "Effective context engineering" article was linked but not read in full.
