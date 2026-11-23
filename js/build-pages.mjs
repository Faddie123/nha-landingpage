import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hasCustomOutput = process.argv[2] !== undefined;
const outputDirectory = resolve(process.argv[2] ?? join(tmpdir(), 'nha-landingpage-preview'));

if (!hasCustomOutput) {
  rmSync(outputDirectory, { recursive: true, force: true });
}
mkdirSync(outputDirectory, { recursive: true });

for (const directory of ['css', 'assets']) {
  cpSync(join(projectRoot, directory), join(outputDirectory, directory), { recursive: true });
}

const scriptsDirectory = join(projectRoot, 'js');
const outputScriptsDirectory = join(outputDirectory, 'js');
mkdirSync(outputScriptsDirectory, { recursive: true });

for (const filename of readdirSync(scriptsDirectory)) {
  if (filename.endsWith('.js')) {
    cpSync(join(scriptsDirectory, filename), join(outputScriptsDirectory, filename));
  }
}

cpSync(join(projectRoot, 'index.html'), join(outputDirectory, 'index.html'));

const sourcePagesDirectory = join(projectRoot, 'pages');
const outputPagesDirectory = join(outputDirectory, 'pages');
cpSync(sourcePagesDirectory, outputPagesDirectory, { recursive: true });
