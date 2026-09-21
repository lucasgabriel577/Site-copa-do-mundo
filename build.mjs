import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToString } from 'react-dom/server';

await mkdir('.build', { recursive: true });
await build({ entryPoints: ['src/home.jsx'], bundle: true, platform: 'node', minify: true, format: 'cjs', packages: 'external', outfile: '.build/home.cjs', legalComments: 'none' });
const require = createRequire(import.meta.url);
const { HomePage } = require('./.build/home.cjs');
let html = await readFile('index.html', 'utf8');
html = html.replace(/<main[^]*?<\/main>/, '<main id="conteudo" class="home-main">' + renderToString(React.createElement(HomePage)) + '</main>');
if (!html.includes('assets/home.js')) html = html.replace('<script src="script.js"></script>', '<script src="script.js"></script>\n<script src="assets/home.js" defer></script>');
await writeFile('index.html', html);
await build({ entryPoints: ['src/main.jsx'], bundle: true, minify: true, format: 'iife', target: 'es2020', define: { 'process.env.NODE_ENV': '"production"' }, outfile: 'assets/home.js', legalComments: 'none' });
const licenses = await Promise.all(['react', 'react-dom', 'framer-motion', 'motion-dom', 'motion-utils', 'scheduler', 'tslib'].map(async name => name + '\n' + await readFile('node_modules/' + name + (name === 'tslib' ? '/LICENSE.txt' : ['framer-motion', 'motion-dom', 'motion-utils'].includes(name) ? '/LICENSE.md' : '/LICENSE'), 'utf8')));
await writeFile('assets/THIRD_PARTY_LICENSES.txt', licenses.join('\n\n'));
console.log('Página renderizada e Framer Motion compilado em assets/home.js');
