import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { client } from './client-demo-source.mjs';

export default {
  root: fileURLToPath(new URL('../', import.meta.url)),
  resolve: {
    alias: {
      '@client': path.join(client, 'src/renderer'),
      '@shared': path.join(client, 'src/shared'),
      vitest: path.join(client, 'node_modules/vitest'),
    },
  },
  test: { include: ['src/client-demo/**/*.test.ts'], environment: 'node', maxWorkers: 2 },
};
