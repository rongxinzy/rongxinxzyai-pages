# Creating and Running Tasks

The clearer the task description you give ZhiYuan, the more usable the result usually is. It is recommended to state the goal, background materials, output format, and constraints.

A good task usually includes:

1. **What to accomplish**: a clear goal.
2. **What to base it on**: provide files, links, or necessary background.
3. **What the result should look like**: specify the format, language, and audience.
4. **What constraints apply**: specify the scope, deadline, or things that must not be done.

## Permission Modes

In Work mode, the task input area has a permission mode menu with two modes:

- **Ask before sensitive actions**: requests your approval before sensitive actions run, displaying the tool name and parameters, and you choose **Approve** or **Deny**. Commands that could cause data loss or change system state carry a risk warning. This is the default mode.
- **Allow all**: runs without authorization, including irreversible operations such as deleting files and running commands.

When working on important files or in an unfamiliar directory, keep **Ask before sensitive actions** selected.

## Execution Process

After a task starts, ZhiYuan executes it step by step and shows the reasoning process, tool calls, and results in the conversation. At the top of the session, you can switch between **Conversation** and **Trace**; **Trace** lists the steps of the current run.

## Commands in the Input Area

Type `/` at the beginning of the input box to use commands:

- `/skill`: activates a Skill for this input.
- `/compact`: compacts the current session context, useful for long sessions.

## Sharing and Export

The task's **Share** menu exports the session as an image (PNG), Markdown, or JSON.
