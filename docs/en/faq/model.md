# Model Connection

If a model is unavailable, first check the model configuration, the network connection, or the status of the local model service.

- **Cloud models**: under **Settings → Model → Providers**, edit the provider, check the endpoint, API key, and model names, and click **Test Connection**. After saving, refresh the catalog on the **Models** page.
- **Free model**: requires a network connection and has a daily quota, which resets the next day after it is used up.
- **Local models**: confirm the model has finished loading in **Local Inference**. When used for agent tasks, the context length needs to be at least 32K.

Different models may have different configuration options and resource requirements. Follow the settings and error messages in the app; do not apply another model's parameters directly.
