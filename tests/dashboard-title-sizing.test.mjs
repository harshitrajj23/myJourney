// Run: node --test tests/dashboard-title-sizing.test.mjs
// Layout-budget regression checks, not a substitute for real browser glyph measurements.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const root = fileURLToPath(new URL('../', import.meta.url));

function loadPureModule(relativePath) {
  const source = readFileSync(path.join(root, relativePath), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const compiled = { exports: {} };
  new Function('module', 'exports', outputText)(compiled, compiled.exports);
  return compiled.exports;
}

const { titleWordBudget } = loadPureModule('components/dashboard/titleSizing.ts');
const { timelinePhases } = loadPureModule('data/timeline.ts');
const css = readFileSync(path.join(root, 'components/dashboard/JourneyArchive.module.css'), 'utf8');
const clamp = (minimum, value, maximum) => Math.min(maximum, Math.max(minimum, value));

// Mirrors the archive grid, including the 1100px single-column breakpoint.
function headingWidth(viewport, variant) {
  if (viewport <= 820) return Math.min(700, viewport - (viewport <= 500 ? 32 : 40));
  const entry = Math.min(viewport, 1600);
  const padding = viewport <= 1050 ? 24 : clamp(20, viewport * .05, 84);
  const rail = viewport <= 1050 ? 72 : clamp(88, viewport * .1, 148);
  const gap = viewport <= 1050 ? 26 : clamp(26, viewport * .05, 84);
  const content = entry - padding * 2 - rail - gap;
  if (viewport <= 1100 || variant === 'spotlight') return Math.min(700, content);
  const innerGap = variant === 'panorama' ? clamp(28, viewport * .06, 100) : clamp(32, viewport * .05, 92);
  return Math.min(700, (content - innerGap) * (variant === 'panorama' ? .55 : .475));
}

test('heading CSS uses its container, normal word breaks, and no ch-width trap', () => {
  const title = css.match(/\.title\s*\{([^}]+)\}/)[1];
  assert.match(title, /overflow-wrap:\s*normal/);
  assert.match(title, /word-break:\s*normal/);
  assert.match(title, /hyphens:\s*none/);
  assert.doesNotMatch(css, /max-width:\s*\d+ch/);
  assert.match(css, /container-type:\s*inline-size/);
  assert.match(css, /calc\(100cqi \/ var\(--title-word-em, 8\)\)/);
  assert.match(css, /@media \(max-width: 1100px\)/);
});

test('every current title fits its conservative word budget at responsive boundaries', () => {
  const widths = [320, 375, 500, 768, 820, 821, 1024, 1050, 1051, 1100, 1101, 1440, 1920];
  const variants = ['split', 'stack', 'panorama', 'spotlight'];
  assert(timelinePhases.some((phase) => phase.title === 'Nakshatra Hackathon'));
  assert(timelinePhases.some((phase) => phase.title === 'NeuroAdapt'));
  for (const [index, phase] of timelinePhases.entries()) {
    const variant = variants[index % 4];
    const cap = variant === 'panorama' ? 132 : variant === 'spotlight' ? 164 : 112;
    const word = titleWordBudget(phase.title);
    for (const viewport of widths) {
      const available = headingWidth(viewport, variant);
      const fontSize = Math.min(clamp(36, available * .22, cap), available / word);
      const fallback = Math.min(40, 270 / word);
      assert(fontSize >= 24, `${phase.title} should remain readable at ${viewport}px`);
      assert(word * fontSize <= available + .001, `${phase.title} exceeds column at ${viewport}px`);
      assert(word * fallback <= available + .001, `${phase.title} fallback exceeds column at ${viewport}px`);
    }
  }
});

test('sizing handles whitespace and unusually long words without invalid CSS values', () => {
  assert.equal(titleWordBudget(''), 1);
  assert.equal(titleWordBudget('NeuroAdapt'), titleWordBudget('  NeuroAdapt  '));
  assert.equal(titleWordBudget('Nakshatra\nHackathon'), titleWordBudget('Nakshatra Hackathon'));
  assert(titleWordBudget('W'.repeat(100)) > titleWordBudget('WWW'));
});
