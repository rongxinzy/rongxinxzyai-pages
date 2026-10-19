# Using Cloud Models (DeepSeek as an Example)

ZhiYuan can connect to cloud models to process tasks. Cloud models are managed on the **Providers** page under **Settings → Model**. When adding a provider, the **Preset** list offers OpenAI (Official), Anthropic Native, Google Gemini, DeepSeek, Moonshot AI (Kimi), Alibaba Cloud Model Studio (Qwen), Zhipu BigModel (GLM), MiniMax, Volcengine Ark (Doubao), Baidu Qianfan (ERNIE), StepFun, Xiaomi MiMo, xAI Grok, OpenRouter, Ollama Local, and Custom OpenAI-Compatible. Picking a preset fills in the endpoint and common models. Supported protocol types are OpenAI Chat Completions, Anthropic Messages, and OpenAI Responses.

Three subscription presets are also available: **MiniMax M Plan (subscription)**, **Xiaomi MiMo Token Plan (subscription)**, and **StepFun Step Plan (subscription)**, for users who subscribe to those coding plans. Plan endpoints differ from pay-as-you-go: MiniMax needs the M Plan subscription key, Xiaomi needs a Token Plan key starting with `tp-`/`ttp-`, and StepFun needs an active Step Plan on the account. For regular pay-as-you-go API keys, use the standard presets above; do not mix them.

For services outside the presets, choose **Custom OpenAI-Compatible** and enter the endpoint, API Key, and model names provided by the service.

## Adding DeepSeek

1. Create an API Key on the [DeepSeek Open Platform](https://platform.deepseek.com/api_keys). The API Key is usually only shown in full at creation time; copy and store it immediately.
2. Open **Settings → Model** in ZhiYuan, switch to the **Providers** page, and click **Add Provider**.
3. Select DeepSeek in **Preset**; the provider name, protocol type, endpoint, and model list are filled in automatically.
4. Paste the API Key into **API Key**, click **Test Connection** to confirm it works, and save.

![Adding a DeepSeek provider in Settings](../../assets/guide/model/provider-settings.png)

**Fallback Model IDs** can hold alternative models used when the primary model is rate-limited.

## Setting the Default Model

After saving the provider, switch to the **Models** page under **Settings → Model**, refresh the catalog, and select the model to use in **Default model**. New sessions use the default model, and you can switch temporarily in the model selector of the task input area.

After configuration, confirm the model responds normally with a simple task before moving on to complex tasks.
