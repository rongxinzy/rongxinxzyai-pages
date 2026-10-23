import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { client } from './client-demo-source.mjs';

const sources = new Map();
export const clientCapabilityPatches = [];
function patch(file, id, description, transform) {
  const filename = path.join(client, file).replaceAll('\\', '/');
  const original = readFileSync(filename, 'utf8').replaceAll('\r\n', '\n');
  const patched = transform(original);
  sources.set(filename, patched);
  clientCapabilityPatches.push({
    id,
    file,
    description,
    sha256: createHash('sha256').update(patched).digest('hex'),
  });
}
function replaceOnce(source, before, after) {
  if (source.split(before).length !== 2)
    throw new Error('Demo capability patch no longer matches the pinned client; review its UI');
  return source.replace(before, after);
}
patch(
  'src/renderer/components/LoginButton.tsx',
  'preview-account-menu-v1',
  'Omit account logout from the fixed browser sample identity',
  source =>
    replaceOnce(
      replaceOnce(
        source,
        '          {hasAuthenticatedAccount ? (\n            <Button',
        '          {false ? (\n            <Button',
      ),
      ') : !isEnterpriseManaged ? (',
      ') : false ? (',
    ),
);

patch(
  'src/renderer/components/im/IMSettings.tsx',
  'preview-wecom-cancellation-v1',
  'Treat browser-only authorization refusal as cancellation without credentials or a rejection',
  source =>
    replaceOnce(
      source,
      "        source: 'zhiyuan-ai',\n      });\n      if (!isMountedRef.current) return;",
      "        source: 'zhiyuan-ai',\n      });\n      if (!isMountedRef.current) return;\n      if (!bot) {\n        setWecomQuickSetupStatus('idle');\n        return;\n      }",
    ),
);

patch(
  'src/renderer/services/i18n/translations.ts',
  'preview-schedule-actions-translation-v1',
  'Supply the missing automation actions label in both native locales',
  source =>
    replaceOnce(
      replaceOnce(
        source,
        '    ...zhTranslations,',
        "    ...zhTranslations,\n    scheduledTasksActions: '任务操作',",
      ),
      '    ...enTranslations,',
      "    ...enTranslations,\n    scheduledTasksActions: 'Task actions',",
    ),
);

patch(
  'src/renderer/components/window/WindowTitleBar.tsx',
  'preview-window-controls-v1',
  'Omit operating-system window controls inside the embedded webpage',
  source => {
    replaceOnce(source, 'export default WindowTitleBar;', '');
    // There is no browser replacement for native window controls.
    return `type Props = { isOverlayActive?: boolean; inline?: boolean; className?: string };
export default function WindowTitleBar(_props: Props) { return null; }
`;
  },
);

patch(
  'src/renderer/components/settings/general/GeneralSettingsPanel.tsx',
  'preview-general-settings-v1',
  'Omit OS startup, sleep, proxy, database backup and desktop-pet controls',
  source => {
    let result = replaceOnce(source, '      <DesktopPetSettingsSection />\n', '');
    for (const key of ['autoLaunch', 'preventSleep', 'useSystemProxy', 'sqliteAutoBackupEnabled']) {
      const start = `          <SettingsToggleRow\n            label={i18nService.t('${key}')}`;
      if (result.split(start).length !== 2)
        throw new Error(`Demo capability patch no longer matches ${key}`);
      const from = result.indexOf(start);
      const ending = '          />\n';
      const to = result.indexOf(ending, from);
      if (to < 0) throw new Error(`Demo capability patch cannot find the end of ${key}`);
      result = result.slice(0, from) + result.slice(to + ending.length);
    }
    return result;
  },
);

patch(
  'src/renderer/components/localInference/components/LocalInferenceSettingsMenu.tsx',
  'preview-inference-settings-v1',
  'Retain memory settings; omit native runtime, network and filesystem menus',
  source => {
    let result = source;
    for (const handler of [
      'onOpenRuntimeSettings',
      'onOpenAccessSettings',
      'onOpenLibrarySettings',
    ]) {
      const start = `        <DropdownMenuItem\n          onClick={${handler}}`;
      if (result.split(start).length !== 2)
        throw new Error(`Demo capability patch no longer matches ${handler}`);
      const from = result.indexOf(start);
      const ending = '        </DropdownMenuItem>\n';
      const to = result.indexOf(ending, from);
      if (to < 0) throw new Error(`Demo capability patch cannot find the end of ${handler}`);
      result = result.slice(0, from) + result.slice(to + ending.length);
    }
    return result;
  },
);

export const clientCapabilityPlugin = {
  name: 'client-browser-capability-boundary',
  enforce: 'pre',
  load(id) {
    return sources.get(id.split('?')[0].replaceAll('\\', '/'));
  },
};
