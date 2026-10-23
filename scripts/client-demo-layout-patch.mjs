import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { client } from './client-demo-source.mjs';

// Keep the pinned checkout clean. Apply this one explicit source correction
// before JSX compilation; reject source drift rather than silently skipping it.
const file = 'src/renderer/components/agentSidebar/AgentTaskRow.tsx';
const filename = path.join(client, file).replaceAll('\\', '/');
const original = readFileSync(filename, 'utf8').replaceAll('\r\n', '\n');
const oldTime = `          {showRelativeTime && (
            <span
              className="theme-sidebar-caption theme-sidebar-time pointer-events-none absolute inset-y-0 right-[52px] flex items-center whitespace-nowrap"
              title={relativeTime.full}
            >
              {relativeTime.compact}
            </span>
          )}
`;
const title = '          <OverflowingSessionTitle title={task.title} />\n';
const newTime = `          {!isBatchMode && showRelativeTime && (
            <span
              className="theme-sidebar-caption theme-sidebar-time pointer-events-none ml-2 shrink-0 whitespace-nowrap"
              title={relativeTime.full}
            >
              {relativeTime.compact}
            </span>
          )}
`;
for (const fragment of [oldTime, title]) {
  if (original.split(fragment).length !== 2) {
    throw new Error(`Sidebar layout patch no longer matches ${file}; review the client source`);
  }
}
const patched = original.replace(oldTime, '').replace(title, title + newTime);
export const clientLayoutPatches = [
  {
    id: 'sidebar-timestamp-flow-v1',
    file,
    description: 'Reserve timestamp width in the title flex row before the existing action slot',
    sha256: createHash('sha256').update(patched).digest('hex'),
  },
];
export const clientSidebarLayoutPlugin = {
  name: 'client-sidebar-timestamp-layout',
  enforce: 'pre',
  load(id) {
    if (id.split('?')[0].replaceAll('\\', '/') === filename) return patched;
  },
};
