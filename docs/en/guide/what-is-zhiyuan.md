# What Is ZhiYuan

The ZhiYuan agent is an open-source, local-first desktop AI agent developed by Beijing Rongxin Zhiyuan. It runs on your computer and connects files, the terminal, the browser, models, Skills, and tools to help you push a goal through to a deliverable result.

ZhiYuan is not a chat tool that only answers questions, nor does it simply forward questions to a model. It can understand tasks, break them into steps, call tools, process materials, and show progress during execution. When it encounters sensitive or high-risk operations, it asks for your confirmation first.

## What ZhiYuan Can Do

ZhiYuan is suited to work that requires multiple steps, materials, or real operations, for example:

- Researching materials, organizing information, and writing reports.
- Reading, generating, and processing documents, spreadsheets, and presentations.
- Completing tasks that require web operations in the browser.
- Using the terminal for file handling and development-related work.
- Running Skills in areas such as writing, research, office work, marketing, data, and Coding.
- Connecting MCP tools and other services to extend the range of executable work.
- Creating recurring tasks such as scheduled briefings, follow-ups, and reports.

You can look up usage by task type in the [Capabilities Guide](../capabilities/index.md).

## What Local-First Means

ZhiYuan stores conversations, configuration, and task metadata locally, and provides local model options. You can also install and run GGUF models to bring model inference into your own working environment.

Whether to use cloud models and which materials are sent to external services depend on your model and tool configuration. Before processing sensitive materials, confirm the data scope and how it is used.

## How ZhiYuan Completes a Task

A task usually goes through the following process:

1. You describe the goal on the Work Page and provide the necessary materials and context.
2. ZhiYuan selects models, Skills, and tools based on the task.
3. ZhiYuan executes the task step by step, continuously showing progress and tool status.
4. When an operation requires your decision, ZhiYuan pauses and waits for confirmation.
5. After the task completes, the result stays on the Work Page and can also be delivered through configured messaging or email channels.

## Basic Concepts

- **Work Page**: the main working area that holds tasks, materials, context, and results.
- **Model**: the model responsible for understanding tasks and generating results. You can configure cloud models or local models.
- **Skills**: reusable capabilities for specific types of work. ZhiYuan provides more than 40 built-in Skills and also supports creating custom Skills.
- **Tools**: capabilities that help ZhiYuan search, process files, operate the browser, or complete other work.
- **MCP**: an extension mechanism for connecting external tool services or internal services.

## Where to Start

If this is your first time using ZhiYuan, it is recommended to complete the [Quick Start](./quick-start.md) first, configure a model, [create your first Work Page](./first-work-page.md), and then start with a small, clearly scoped task.
