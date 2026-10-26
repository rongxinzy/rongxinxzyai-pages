# Coding Workspace

**Coding** in the Work mode sidebar runs coding tasks in code folders.

## Adding a Workspace

1. Open **Coding** and click **Add workspace**.
2. Enter a workspace name, add one or more source folders, and choose the primary folder.
3. Select the default agent and save.

Seriya only mounts existing folders and never moves or renames files on disk. **Remove workspace** deletes only the coding records in Seriya, not the files on disk.

## Coding Tasks and Sessions

Create a coding task in a workspace, then create a session inside the task and tell the agent what to build. A new session is created only after the first message is sent successfully, and it is permanently bound to the selected agent and working directory; switching agents creates a new session.

## Agents

- **Built-in coding agent**: uses the app's built-in coding capabilities and the current model configuration; you can switch models in the session.
- **Local agents**: after installing Codex or Claude Code, they can be found by scanning, and agents that support ACP can also be added manually. External agents require a connection check and explicit trust before first use.

When an external agent requests authorization, you can allow it once, allow it for the session, or reject it.

## Reviewing Changes

The session side panel provides Changes, Files, Terminal, and Artifacts panels, where you can review changes, commit and push, create a Pull Request, and switch branches.
