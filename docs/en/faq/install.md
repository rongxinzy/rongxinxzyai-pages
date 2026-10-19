# Installation and Updates

Download the version for your operating system from the homepage of the official website. Before updating, save any tasks and files you are working on.

## Which edition to choose

| Edition | Platforms | Best for |
| --- | --- | --- |
| Lite | Windows only | Cloud models only, no local inference; smallest installer |
| CPU | Windows, Linux, macOS (Apple Silicon and Intel) | Running GGUF models locally. Windows/Linux bundle CPU and Vulkan inference; macOS uses Metal |
| CUDA | Windows, Linux | PCs with an NVIDIA RTX 40-series GPU; bundles CUDA inference and falls back to the CPU when the GPU is unavailable |

macOS and Linux have no lite edition. Every edition bundles its components offline, so installation downloads nothing extra.

The homepage download section offers all three Windows installers (lite, CPU and CUDA); switch editions on the Windows card. macOS and Linux get the CPU edition there, and the Linux CUDA edition is available under “Release notes”. The CUDA edition is for PCs with an RTX 40-series GPU and falls back to the CPU when the GPU is unavailable. Per-edition installers are available starting with the first release built with edition support; earlier releases have a single installer per platform.

## Windows

Every Windows edition bundles all offline components, so installation does not download components over the network, which helps on slow connections. The installer UI relies on the system WebView2 and tells you clearly if it is missing.

Official Windows releases are signed with a Certum code-signing certificate. If SmartScreen still shows "Windows protected your PC", check the signature on the Digital Signatures tab of the file properties, then choose "More info" → "Run anyway".

## macOS

Signed builds are notarized by Apple and open normally once Gatekeeper verifies them. If macOS says it cannot verify the developer, open System Settings → Privacy & Security and choose "Open Anyway".

## Troubleshooting

If the app fails to start or the download fails, record your operating system, version, and the exact error message before contacting the project maintainers. You can also check downloaded files against the SHA-256 checksums on the release page.
