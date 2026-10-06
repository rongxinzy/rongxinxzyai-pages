# Development Overview

The ZhiYuan agent is a desktop application built with Electron and React. `/docs/` is the documentation site, generated from Markdown at build time by the website project.

The developer documentation covers only the basics needed to develop and extend ZhiYuan. For user-facing usage instructions, start from [Getting Started](../guide/index.md).

## Local Development

```bash
npm install
npm run dev
```

The documentation starts together with the main site and is available at `/docs/`.

## Build

```bash
npm run build
```

This command builds the main site first, then generates the documentation pages and outputs them to `dist/docs`; they are published together with the main site.

## Contributing Documentation

Documentation content lives in `docs/`. After adding a page, register it in the sidebar configuration in `src/docs/nav.ts`.
