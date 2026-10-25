/**
 * Download RongxinAI atlases + frames.json, then crop idle sprites.
 * Run: node scripts/extract-desktop-pet-frames.mjs
 */
import { createWriteStream, writeFileSync, mkdirSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const BASE =
  'https://raw.githubusercontent.com/rongxinzy/RongxinAI/main/src/renderer/assets/desktop-pet';

const CHARACTERS = [
  'xiaoyuan',
  'youli',
  'tuantuan',
  'mianmian',
  'zhuli',
  'yunmo',
  'maixiao',
];

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

mkdirSync('/tmp/pet-atlas', { recursive: true });

const framesRes = await fetch(`${BASE}/frames.json`);
const framesText = await framesRes.text();
writeFileSync(path.join(ROOT, '.pet-frames.json'), framesText);

for (const id of CHARACTERS) {
  console.log(`Downloading ${id}…`);
  await download(`${BASE}/${id}-atlas.png`, `/tmp/pet-atlas/${id}-atlas.png`);
}

execSync(`python3 ${path.join(ROOT, 'extract-desktop-pet-frames.py')}`, {
  stdio: 'inherit',
  cwd: ROOT,
});
