import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const read = path => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('MDX renders its component and Shiki highlights code at build time', async () => {
  const post = await read('welcome-to-the-factory/index.html');
  assert.match(post, /Keep the feedback loop short/);
  assert.match(post, /class="note"/);
  assert.match(post, /class="astro-code[^\"]*github-dark/);
  assert.match(post, /<span style="color:/);
  assert.match(post, /rel="canonical" href="https:\/\/blog.factorize.sh\/welcome-to-the-factory\/"/);
});

test('published posts are discoverable and drafts stay out of every public surface', async () => {
  for (const path of ['index.html', 'rss.xml', 'sitemap-0.xml']) {
    const output = await read(path);
    assert.match(output, /welcome-to-the-factory/);
    assert.doesNotMatch(output, /draft-example|Draft example/);
  }
  await assert.rejects(access(new URL('../dist/draft-example/index.html', import.meta.url)));
});

test('generated local page and asset links resolve', async () => {
  for (const page of ['index.html', 'welcome-to-the-factory/index.html', '404.html']) {
    const html = await read(page);
    for (const [, path] of html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]*)/g)) {
      if (!path) continue;
      const file = path.endsWith('/') ? `${path}index.html` : path;
      await access(new URL(`../dist${file}`, import.meta.url));
    }
  }
});
