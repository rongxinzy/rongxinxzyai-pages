# FAQ

This page collects common questions that may come up while using Seriya. The content will be expanded over time based on actual feedback.

When troubleshooting, first confirm: whether the model is available, whether the files the task needs have been provided, and whether the Skill fits the current task.

## Common Situations

- **Free model quota used up**: the free model has a daily quota, which resets the next day. You can also [add a cloud model](../guide/model/cloud.md) or [use a local model](../guide/model/local.md).
- **Local model cannot be used for tasks**: local models used for agent tasks need at least 32K of context. Increase the context length in **Local Inference** and reload.
- **No Local Inference in the sidebar**: the installed edition is the Windows lite edition. For local inference, switch to the CPU or CUDA edition; see [Installation and Updates](./install.md#which-edition-to-choose).
- **The IM bot receives no messages**: run the connectivity diagnostics under **Settings → IM Bot**. In group chats, the bot usually needs to be @-mentioned.
- **The app keeps running after the window is closed**: Seriya minimizes to the system tray. Choose **Quit** from the tray menu to exit completely.

## Reporting Issues

Click **Export Logs** under **Settings → About** and submit the log archive together with reproduction steps to [GitHub Issues](https://github.com/rongxinzy/RongxinAI/issues).
