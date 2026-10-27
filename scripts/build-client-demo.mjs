import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { createRequire } from 'node:module';
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  unlinkSync,
  readdirSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { client, clientPackage, clientSource } from './client-demo-source.mjs';
import {
  clientCapabilityPatches,
  clientCapabilityPlugin,
} from './client-demo-capability-patch.mjs';

const site = fileURLToPath(new URL('../', import.meta.url));
const clientRequire = createRequire(path.join(client, 'package.json'));
if (process.argv.includes('--lint')) {
  execFileSync(
    process.execPath,
    [
      path.join(client, 'node_modules/oxlint/bin/oxlint'),
      'src/client-demo',
      'src/live-demo',
      'src/editorial/Showcase.tsx',
      'scripts/build-client-demo.mjs',
      'scripts/check-demo-interactions.mjs',
      'scripts/check-demo-sidebar.mjs',
      'scripts/client-demo-capability-patch.mjs',
      'scripts/check-demo-model-lifecycle.mjs',
      'scripts/check-demo-resilience.mjs',
      'scripts/client-demo-source.mjs',
      'scripts/measure-demo-resources.mjs',
      'scripts/vitest.demo.config.mjs',
      'scripts/check-demo-boundaries.mjs',
      'scripts/check-demo-entry.mjs',
    ],
    { cwd: site, stdio: 'inherit' },
  );
  process.exit(0);
}
if (process.argv.includes('--test')) {
  execFileSync(
    process.execPath,
    [
      path.join(client, 'node_modules/vitest/vitest.mjs'),
      'run',
      '--config',
      'scripts/vitest.demo.config.mjs',
    ],
    { cwd: site, stdio: 'inherit' },
  );
  process.exit(0);
}
if (process.argv.includes('--check')) {
  const configPath = path.join(site, '.client-demo-types.generated.json');
  const sourcePath = relative => path.join(client, relative).replaceAll('\\', '/');
  const config = {
    extends: sourcePath('tsconfig.json'),
    compilerOptions: {
      paths: {
        '@client/*': [sourcePath('src/renderer/*')],
        '@shared/*': [sourcePath('src/shared/*')],
        '@/*': [sourcePath('src/renderer/*')],
        'vite/client': [sourcePath('node_modules/vite/client.d.ts')],
        react: [sourcePath('node_modules/@types/react')],
        'react/*': [sourcePath('node_modules/@types/react/*')],
        'react-dom/*': [sourcePath('node_modules/@types/react-dom/*')],
        'react-redux': [sourcePath('node_modules/react-redux')],
        vitest: [sourcePath('node_modules/vitest')],
      },
      types: ['node'],
      typeRoots: [sourcePath('node_modules/@types')],
    },
    include: [
      'src/client-demo/**/*.ts',
      'src/client-demo/**/*.tsx',
      sourcePath('src/renderer/types/electron.d.ts'),
      sourcePath('src/renderer/types/window.d.ts'),
      sourcePath('node_modules/vite/client.d.ts'),
    ],
  };
  writeFileSync(configPath, JSON.stringify(config));
  try {
    execFileSync(
      process.execPath,
      [path.join(client, 'node_modules/typescript/bin/tsc'), '--project', configPath, '--noEmit'],
      { cwd: site, stdio: 'inherit' },
    );
  } finally {
    unlinkSync(configPath);
  }
  process.exit(0);
}
// Derive sample content from the gallery, rather than inventing a second catalog.
const { JSDOM } = clientRequire('jsdom');
const catalog = {};
for (const [locale, suffix] of [
  ['zh', ''],
  ['en', '-en'],
]) {
  const modelDoc = new JSDOM(
    readFileSync(path.join(site, `public/product/zhiyuan-model-market${suffix}.html`), 'utf8'),
  ).window.document;
  const skillDoc = new JSDOM(
    readFileSync(path.join(site, `public/product/zhiyuan-skills${suffix}.html`), 'utf8'),
  ).window.document;
  catalog[locale] = {
    models: Array.from(modelDoc.querySelectorAll('.theme-market-card')).map(node => ({
      name: node.querySelector('[data-slot="card-title"],h3')?.textContent.trim() ?? '',
      description: node.querySelector('p')?.textContent.trim() ?? '',
      publisher:
        node.querySelector('[data-slot="card-description"] [title]')?.getAttribute('title') ||
        'Qwen',
      format: node.querySelectorAll('p')[1]?.textContent.trim() ?? '',
      variant: node.querySelector('[data-slot="select-value"]')?.textContent.trim() ?? '',
      file: node.querySelector('input')?.getAttribute('value') ?? undefined,
    })),
    skills: Array.from(skillDoc.querySelectorAll('[data-slot="card"]')).map(node => ({
      name: node.querySelector('p')?.textContent.trim() ?? '',
      description: node.querySelectorAll('p')[1]?.textContent.trim() ?? '',
    })),
  };
}
writeFileSync(
  path.join(site, 'src/client-demo/gallery.json'),
  JSON.stringify(catalog, null, 2) + '\n',
);
if (process.argv.includes('--samples-only')) process.exit(0);
const config = {
  configFile: false,
  root: path.join(site, 'src/client-demo'),
  base: '/client-demo/',
  publicDir: process.argv.includes('--serve') ? path.join(client, 'public') : false,
  plugins: [
    clientCapabilityPlugin,
    react(),
    tailwindcss(),
  ],
  // Like the client Vite config, this constant belongs to the KaTeX ESM bundle.
  define: {
    'process.env.NODE_ENV': '"production"',
    __VERSION__: JSON.stringify(clientRequire('katex/package.json').version),
  },
  resolve: {
    alias: {
      '@wecom/wecom-aibot-sdk': path.join(site, 'src/client-demo/wecom-boundary.ts'),
      '@client': path.join(client, 'src/renderer'),
      '@shared': path.join(client, 'src/shared'),
      '@': path.join(client, 'src/renderer'),
      'react-dom': path.dirname(clientRequire.resolve('react-dom/package.json')),
      react: path.dirname(clientRequire.resolve('react/package.json')),
      'react-redux': path.dirname(clientRequire.resolve('react-redux/package.json')),
    },
    dedupe: ['react', 'react-dom', 'react-redux', 'motion'],
  },
  build: {
    outDir: path.join(site, 'public/client-demo'),
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      input: path.join(site, 'src/client-demo/index.html'),
      output: { entryFileNames: 'client.js', assetFileNames: 'assets/[name]-[hash][extname]' },
    },
  },
  server: { host: '127.0.0.1', port: 5188, fs: { allow: [site, client] } },
};
if (process.argv.includes('--serve')) {
  const server = await createServer(config);
  await server.listen();
  server.printUrls();
} else {
  await build(config);
  const output = path.join(site, 'public/client-demo');
  mkdirSync(output, { recursive: true });
  for (const asset of [
    ...readdirSync(path.join(client, 'public')).filter(name =>
      /\.(svg|png|jpe?g|webp)$/.test(name),
    ),
    'quick-actions.json',
    'quick-actions-i18n.json',
  ])
    copyFileSync(path.join(client, 'public', asset), path.join(output, asset));
  // Copy only previews referenced by the native catalog, preserving relative
  // URLs and native loading="lazy". Missing sources fail the build, not the UI.
  const actions = JSON.parse(readFileSync(path.join(client, 'public/quick-actions.json'), 'utf8'));
  const previews = new Set(
    actions.actions.flatMap(action => action.prompts.map(prompt => prompt.preview).filter(Boolean)),
  );
  mkdirSync(path.join(output, 'case-previews'), { recursive: true });
  for (const preview of previews) {
    if (!/^\.\/case-previews\/[\w-]+\.webp$/.test(preview))
      throw new Error(`Unexpected client case preview path: ${preview}`);
    copyFileSync(path.join(client, 'public', preview), path.join(output, preview));
  }
  // Stable entry URL, independent of the source directory layout.
  writeFileSync(
    path.join(output, 'source.json'),
    JSON.stringify(
      {
        repository: clientSource.repository,
        revision: clientSource.revision,
        sourceTreeHasLocalChanges: false,
        version: clientPackage.version,
        generatedBy: 'scripts/build-client-demo.mjs',
        interface:
          'Client React components with recorded renderer patches; browser-only mock bridge',
        patches: [...clientCapabilityPatches],
      },
      null,
      2,
    ) + '\n',
  );
}
