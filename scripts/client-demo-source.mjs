import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const site = fileURLToPath(new URL('../', import.meta.url));
export const clientSource = JSON.parse(
  readFileSync(path.join(site, 'src/client-demo/client-source.json'), 'utf8'),
);
export const client = path.resolve(
  site,
  process.env.ZHIYUAN_CLIENT_SOURCE || clientSource.checkout,
);
const git = args => execFileSync('git', args, { cwd: client, encoding: 'utf8' }).trim();
const revision = git(['rev-parse', 'HEAD']);
if (revision !== clientSource.revision) {
  throw new Error(`Client revision ${revision} differs from pinned ${clientSource.revision}`);
}
if (
  git([
    'status',
    '--porcelain',
    '--',
    'src',
    'public',
    'package.json',
    'bun.lock',
    'patches',
    'tsconfig.json',
  ])
) {
  throw new Error(
    'Client build inputs have local changes. Use a clean checkout of the pinned revision.',
  );
}
export const clientPackage = JSON.parse(readFileSync(path.join(client, 'package.json'), 'utf8'));
