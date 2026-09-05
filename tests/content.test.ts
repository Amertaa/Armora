import test from 'node:test';
import assert from 'node:assert/strict';
import { translations } from '../src/data/translations.ts';
import { moods, recommendScent, scents } from '../src/data/scents.ts';
import { readFileSync } from 'node:fs';
function shape(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value))
    return value.flatMap((item, index) => shape(item, `${prefix}.${index}`));
  if (value !== null && typeof value === 'object')
    return Object.entries(value).flatMap(([key, item]) =>
      shape(item, `${prefix}.${key}`),
    );
  assert.equal(typeof value, 'string');
  assert.ok((value as string).trim().length > 0);
  return [prefix];
}
test('Indonesian and English cover exactly the same nonempty content keys', () => {
  assert.deepEqual(shape(translations.id), shape(translations.en));
});
test('every mood recommends an existing concept scent with the intended direction', () => {
  assert.deepEqual(
    moods.map((mood) => recommendScent(mood).id),
    ['canopy', 'concrete', 'afterglow', 'canopy'],
  );
  assert.equal(new Set(scents.map((scent) => scent.id)).size, 3);
});
test('all scent stories have both languages and concept messaging is explicit', () => {
  for (const scent of scents) {
    assert.ok(scent.idCopy.detail);
    assert.ok(scent.enCopy.detail);
    assert.equal(scent.idCopy.moods.length, 4);
  }
  for (const copy of Object.values(translations)) {
    assert.match(copy.collection.concept, /CONCEPT/);
    assert.ok(copy.lead.localNote.length > 80);
  }
});
test('brand colors are centralized and reduced motion is supported', () => {
  const styles = readFileSync(
    new URL('../src/styles/global.css', import.meta.url),
    'utf8',
  );
  assert.doesNotMatch(styles, /#[0-9a-fA-F]{6}/);
  assert.match(styles, /prefers-reduced-motion/);
});
