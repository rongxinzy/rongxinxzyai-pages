# Messaging Channels and Email

After configuring messaging channels, you can assign tasks to Seriya from the instant messaging tools you already use, and task results are replied to the same conversation.

## Supported Platforms

The Chinese UI supports WeChat, DingTalk, Feishu, WeCom, and QQ. Telegram and Discord are additionally available when the app language is English.

| Platform | How to connect |
| --- | --- |
| WeChat | Scan the QR code to sign in and bind; only one account is supported |
| DingTalk | Client ID (AppKey) and Client Secret (AppSecret); the bot can be configured by scanning a QR code |
| Feishu | App ID and App Secret; the service domain can be Feishu or Lark, and the bot can be created by scanning a QR code |
| WeCom | Bot ID and Secret; the bot can be created by scanning a QR code |
| QQ | AppID and AppSecret from the QQ open platform |
| Telegram | Bot Token obtained from @BotFather |
| Discord | Bot Token obtained from the Discord Developer Portal |

Except for WeChat, each platform supports multiple instances.

## Configuration Steps

1. Open **Settings → IM Bot** and select a platform on the left.
2. Add an instance, fill in the credentials, and enable the platform.
3. In **Connectivity Diagnostics**, click **Test Connectivity**. Results are Ready, Attention Needed, or Unavailable, with suggested fixes.
4. Send a test message to the bot. In group chats, the bot usually needs to be @-mentioned.

Advanced Settings can configure direct-message and group policies, allowed users, the history message limit, the media size limit, the project, and the system prompt.

Conversations created through messaging channels are read-only in Seriya; continue on the corresponding platform. The run record of each channel message can be viewed in **Activity**.

## Email

**Settings → Email** configures the email Skill so that Seriya can read and send email.

1. Select an email provider: Gmail, Outlook, 163 Mail, 126 Mail, QQ Mail, or Custom.
2. Enter the email address and password. Most providers require an app-specific password or an authorization code.
3. Common providers fill in the IMAP and SMTP servers automatically; a custom provider must be entered manually.
4. Click **Test Connectivity** to confirm the configuration works.

Channels and email send task content to the corresponding third-party service. Read that service's privacy policy before enabling it.
