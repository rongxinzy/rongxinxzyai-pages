# Installation and Updates

Download the version for your operating system from the homepage of the official website. Before updating, save any tasks and files you are working on.

## Windows

The Windows installer bundles all offline components, so installation does not download components over the network, which helps on slow connections. The installer UI relies on the system WebView2 and tells you clearly if it is missing.

Official Windows releases are signed with a Certum code-signing certificate. If SmartScreen still shows "Windows protected your PC", check the signature on the Digital Signatures tab of the file properties, then choose "More info" → "Run anyway".

## macOS

Signed builds are notarized by Apple and open normally once Gatekeeper verifies them. If macOS says it cannot verify the developer, open System Settings → Privacy & Security and choose "Open Anyway".

## Troubleshooting

If the app fails to start or the download fails, record your operating system, version, and the exact error message before contacting the project maintainers. You can also check downloaded files against the SHA-256 checksums on the release page.
