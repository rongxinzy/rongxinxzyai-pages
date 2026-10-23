import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { client } from './client-demo-source.mjs';

// Keep this preview-specific loading choice explicit and the client checkout clean.
const file = 'src/renderer/components/cowork/CoworkView.tsx';
const filename = path.join(client, file).replaceAll('\\', '/');
const original = readFileSync(filename, 'utf8').replaceAll('\r\n', '\n');
const replacements = [
  [
    "import { LogoLoadingState } from '../LogoLoadingState';",
    "import { CoworkSessionColdStartSkeleton } from './CoworkSessionLoadingState';",
  ],
  [
    `        <PageHeader />
        <div className="flex-1 flex items-center justify-center">
          <LogoLoadingState label={i18nService.t('coworkWorkspaceLoading')} />
        </div>`,
    '        <CoworkSessionColdStartSkeleton />',
  ],
];
let patched = original;
for (const [before, after] of replacements) {
  if (patched.split(before).length !== 2) {
    throw new Error(`Loading skeleton patch no longer matches ${file}; review the client source`);
  }
  patched = patched.replace(before, after);
}
export const clientLoadingPatches = [
  {
    id: 'workbench-native-loading-skeleton-v1',
    file,
    description:
      'Use the native session skeleton after particle boot instead of a second logo loader',
    sha256: createHash('sha256').update(patched).digest('hex'),
  },
];
export const clientLoadingPlugin = {
  name: 'client-workbench-loading-skeleton',
  enforce: 'pre',
  load(id) {
    if (id.split('?')[0].replaceAll('\\', '/') === filename) return patched;
  },
};
