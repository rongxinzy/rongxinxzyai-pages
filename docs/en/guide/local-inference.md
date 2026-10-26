# Local Inference

Local Inference means running the model directly on your computer instead of sending inference requests to a cloud model service. Seriya supports installing and running local models in GGUF format, and using local models for Chat and agent tasks.

Local Inference is available only in the CPU and CUDA editions. The Windows lite edition does not include the local inference runtime, and the sidebar does not show the **Local Inference** entry. For the differences between editions, see [Installation and Updates](../faq/install.md#which-edition-to-choose).

## When to Use It

Local Inference reduces the need to send sensitive content to cloud model services, giving you more control over the data the model processes and the environment it runs in. Local models are especially suitable for the following scenarios:

- Analyzing unpublished product plans, research materials, and financial data;
- Processing contracts, customer information, or internal company knowledge;
- Conducting code reviews, security analysis, and log troubleshooting;
- Working in environments with unstable networks or without continuous access to cloud services.

Local Inference only means model inference happens on your machine. If a task also uses web search, MCP, email, or other external services, the related data may still leave your computer. Before processing sensitive materials, also check the tools and permission settings the task uses.

## Getting Started

### 1. Select and Install a Model

Go to **Marketplace** under **Local Inference**, select a GGUF model suitable for your device, and install it. Models in the marketplace and their related files are provided by the [ModelScope](https://modelscope.cn/) community.

The marketplace supports filtering by task type (chat, reasoning, code, vision, and more) and by device compatibility. Seriya shows compatibility suggestions based on detected device resources such as memory and GPU, but these suggestions are for reference only. Before installing, you can also check the model publisher, file size, and quantization version. If this is your first time, it is recommended to choose a recommended version or a model with a smaller parameter size. File integrity is verified during installation, and a model becomes usable only after the check passes.

![Seriya Local Inference Model Marketplace](../assets/guide/local-inference/model-marketplace.png)

### 2. Start a Local Model

After installation, switch to the **Local Models** page. Models downloaded from the marketplace are listed here. Click **Load**; once loading finishes, the model can be used for tasks. When you no longer need it, click **Unload** to free memory.

![Seriya local model list](../assets/guide/local-inference/local-models.png)

### 3. Select the Model in a Task

Create a New Task, select the loaded local model in the model selector of the input area, then enter your request and start execution.

When used for agent tasks, a local model needs a context length of at least 32K (32768). When the context is insufficient, the model selector asks you to increase the context length and reload, or switch to another model; models trained with a context window below 32K cannot be used for these tasks.

![Selecting a loaded local model in the task input area](../assets/guide/local-inference/select-local-model.png)

## Speed and Runtime Parameters

The response speed of a local model is affected by factors such as parameter size, quantization version, context length, GPU offloading, CPU thread count, batch size, and the current device load. Longer context usually consumes more memory and may increase processing time. When VRAM is sufficient, increasing GPU offloading appropriately can improve inference speed.

Each model can be configured individually for context length, GPU acceleration layers, threads, batch size, and memory mapping, or you can use **Auto Optimize**. The interface estimates VRAM and memory usage.

When starting out, it is recommended to keep the recommended parameters, confirm the model responds reliably with simple tasks, and then adjust parameters one by one based on speed, memory usage, and task results. If the model is too large or the parameter settings exceed the device's capacity, loading may be slow, operation may be unstable, or the model may fail to start.

For detailed steps on installing and starting models, read [Using Local Models](./model/local.md).
