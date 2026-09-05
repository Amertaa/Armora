import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  for (const language of ['id', 'en']) {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: { getItem: () => language },
    });
    const html = renderToStaticMarkup(createElement(App));
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(
      new Set(ids).size,
      ids.length,
      'all element IDs should be unique',
    );
    for (const target of [...html.matchAll(/href="#([^"]+)"/g)].map(
      (match) => match[1],
    ))
      assert.ok(ids.includes(target), `Missing navigation target: ${target}`);
    for (const section of [
      'home',
      'concept',
      'collection',
      'case',
      'story',
      'how-it-works',
      'everyday',
      'scent-finder',
      'contact',
    ])
      assert.ok(ids.includes(section), `Missing section ${section}`);
    for (const name of ['name', 'email', 'scent', 'message'])
      assert.match(html, new RegExp(`name="${name}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(
      html,
      language === 'id' ? /Simpan Minat Saya/ : /Save My Interest/,
    );
    assert.ok(!html.includes('href="#"'));
    assert.ok(!html.includes('undefined'));
    assert.ok(
      html.includes('CANOPY') &&
        html.includes('CONCRETE') &&
        html.includes('AFTERGLOW'),
    );
    console.log(
      `${language.toUpperCase()}: full-page server render, navigation targets, form labels, and concept content passed.`,
    );
  }
} finally {
  delete globalThis.localStorage;
  await server.close();
}
