// Run: node --test tests/particle-morph.test.mjs
// Deterministic motion tests; actual GPU rendering still needs a browser check.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../components/dashboard/particleMorph.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});
const compiled = { exports: {} };
new Function('module', 'exports', outputText)(compiled, compiled.exports);
const { createParticleForms, updateParticlePositions } = compiled.exports;

function frame(forms, time = 0, scroll = 0, x = 0, y = 0) {
  const positions = new Float32Array(forms.sphere.length);
  updateParticlePositions(positions, forms, time, scroll, x, y);
  return positions;
}

function maxDelta(a, b) {
  let maximum = 0;
  for (let index = 0; index < a.length; index++) maximum = Math.max(maximum, Math.abs(a[index] - b[index]));
  return maximum;
}

test('target shapes are deterministic, distinct, and valid for desktop particle counts', () => {
  for (const count of [1, 2, 3, 1400, 2400]) {
    const forms = createParticleForms(count);
    assert.deepEqual(forms, createParticleForms(count));
    for (const target of Object.values(forms)) {
      assert.equal(target.length, count * 3);
      assert(target.every(Number.isFinite));
    }
    assert(maxDelta(forms.sphere, forms.helix) > .5);
    assert(maxDelta(forms.helix, forms.wave) > .5);
  }
});

test('the animation reaches all three shapes, and scroll changes morphology', () => {
  const forms = createParticleForms(2400);
  assert(maxDelta(frame(forms, 0), forms.sphere) < .04);
  assert(maxDelta(frame(forms, 6), forms.helix) < .04);
  assert(maxDelta(frame(forms, 12), forms.wave) < .15);
  assert(maxDelta(frame(forms, 0), frame(forms, 6)) > 1);
  assert(maxDelta(frame(forms, 6), frame(forms, 12)) > 1);
  assert(maxDelta(frame(forms, 0, .5), frame(forms, 0)) > 1);
});

test('morph leg boundaries and the cycle wrap remain continuous', () => {
  const forms = createParticleForms(1400);
  for (const time of [0, 6, 12, 18, 24, 36]) {
    assert(maxDelta(frame(forms, time - .0001), frame(forms, time + .0001)) < .001);
  }
});

test('pointer deforms the cloud locally without changing target buffers', () => {
  const forms = createParticleForms(2400);
  const originals = createParticleForms(2400);
  const neutral = frame(forms, 4);
  const interactive = frame(forms, 4, 0, .8, -.6);
  assert(maxDelta(neutral, interactive) > .01);
  assert(maxDelta(neutral, interactive) <= .201);
  assert.deepEqual(forms, originals);
  assert.deepEqual(frame(forms, 4), neutral);
});

test('all sampled frames stay finite and inside the camera radius', () => {
  const forms = createParticleForms(2400);
  const output = new Float32Array(forms.sphere.length);
  for (let sample = 0; sample <= 180; sample++) {
    const time = sample / 10;
    updateParticlePositions(output, forms, time, (sample % 11) / 10, Math.sin(time), Math.cos(time));
    for (let i = 0; i < output.length; i += 3) {
      const radius = Math.hypot(output[i], output[i + 1], output[i + 2]);
      assert(Number.isFinite(radius) && radius < 3.3, `Out of bounds at frame ${sample}, particle ${i / 3}`);
    }
  }
});

test('invalid counts/buffers fail clearly; non-finite controls stay safe', () => {
  for (const count of [0, -1, 1.5, NaN, Infinity]) assert.throws(() => createParticleForms(count), RangeError);
  const forms = createParticleForms(16);
  assert.throws(() => updateParticlePositions(new Float32Array(3), forms, 0, 0, 0, 0), RangeError);
  assert.deepEqual(frame(forms, NaN, Infinity, NaN, -Infinity), frame(forms));
  assert.deepEqual(frame(forms, 1, -10), frame(forms, 1, 0));
  assert.deepEqual(frame(forms, 1, 10), frame(forms, 1, 1));
});
