import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateLead,
  normalizeLead,
  saveLocalLead,
  clearLocalLead,
  submitLead,
  STORAGE_KEY,
} from '../src/services/leadService.ts';
const valid = {
  name: '  A Visitor  ',
  email: '  Visitor@Example.com ',
  scent: 'canopy',
  message: '  Morning walks.  ',
};

test('valid lead is normalized without changing the chosen scent', () => {
  assert.deepEqual(validateLead(valid), {});
  assert.deepEqual(normalizeLead(valid), {
    name: 'A Visitor',
    email: 'visitor@example.com',
    scent: 'canopy',
    message: 'Morning walks.',
  });
});
test('empty, invalid, and overlong fields give actionable field errors', () => {
  assert.deepEqual(
    Object.keys(
      validateLead({
        name: ' ',
        email: 'invalid@',
        scent: 'unknown',
        message: 'a'.repeat(1001),
      }),
    ),
    ['name', 'email', 'scent', 'message'],
  );
  assert.equal(validateLead({ ...valid, name: 'a'.repeat(81) }).name, 'name');
  assert.equal(
    validateLead({ ...valid, email: 'a b@example.com' }).email,
    'email',
  );
  assert.deepEqual(
    validateLead({ ...valid, scent: 'exploring', message: '' }),
    {},
  );
});
test('local preview saves one record and does not accumulate repeated submissions', () => {
  const saved = new Map<string, string>();
  const storage = {
    setItem: (key: string, value: string) => {
      saved.set(key, value);
    },
  };
  assert.deepEqual(saveLocalLead(valid, storage), { mode: 'local' });
  saveLocalLead({ ...valid, scent: 'afterglow' }, storage);
  assert.equal(saved.size, 1);
  const record = JSON.parse(saved.get(STORAGE_KEY)!);
  assert.equal(record.scent, 'afterglow');
  assert.equal(record.mode, 'local');
  assert.ok(!Number.isNaN(Date.parse(record.savedAt)));
});
test('validation failure never writes a local record', () => {
  let writes = 0;
  assert.throws(
    () =>
      saveLocalLead(
        { ...valid, email: 'invalid' },
        {
          setItem: () => {
            writes++;
          },
        },
      ),
    /invalid-lead/,
  );
  assert.equal(writes, 0);
});
test('storage failure propagates so UI cannot report a false success', () => {
  assert.throws(
    () =>
      saveLocalLead(valid, {
        setItem: () => {
          throw new Error('QuotaExceededError');
        },
      }),
    /QuotaExceededError/,
  );
});
test('deleting local details only removes the ARMORA interest record', () => {
  let removed = '';
  clearLocalLead({
    removeItem: (key) => {
      removed = key;
    },
  });
  assert.equal(removed, STORAGE_KEY);
});
test('remote submission sends normalized JSON and only accepts successful HTTP status', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (url, options) => {
      assert.equal(url, 'https://example.com/lead');
      assert.equal(options?.method, 'POST');
      assert.deepEqual(
        JSON.parse(options?.body as string),
        normalizeLead(valid),
      );
      return new Response(null, { status: 201 });
    };
    assert.deepEqual(await submitLead(valid, 'https://example.com/lead'), {
      mode: 'remote',
    });
    globalThis.fetch = async () => new Response(null, { status: 429 });
    await assert.rejects(
      submitLead(valid, 'https://example.com/lead'),
      /lead-submission-429/,
    );
  } finally {
    globalThis.fetch = original;
  }
});
test('a network failure is reported without silently saving to local storage', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => {
      throw new Error('offline');
    };
    await assert.rejects(
      submitLead(valid, 'https://example.com/lead'),
      /offline/,
    );
  } finally {
    globalThis.fetch = original;
  }
});
