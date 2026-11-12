import { cpSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = resolve(process.argv[2] ?? join(projectRoot, '.pages-build'));

mkdirSync(outputDirectory, { recursive: true });

for (const directory of ['css', 'images']) {
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

for (const filename of readdirSync(join(projectRoot, 'html'))) {
  if (!filename.endsWith('.html')) continue;

  const source = readFileSync(join(projectRoot, 'html', filename), 'utf8');
  const page = source
    .replaceAll('../css/', 'css/')
    .replaceAll('../js/', 'js/')
    .replaceAll('../images/', 'images/');

  writeFileSync(join(outputDirectory, filename), page);
}
