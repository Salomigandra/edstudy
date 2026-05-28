/**
 * Generates seed.sql from data/pathways.js
 * Run: node scripts/generate-seed.mjs
 * Then paste seed.sql into Supabase Dashboard → SQL Editor → Run
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// pathways.js uses ESM 'export' syntax but package.json has no "type":"module",
// so Node treats it as CJS. We strip 'export' keywords to load it directly.
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathwaysCode = readFileSync(join(__dirname, '../data/pathways.js'), 'utf-8')
  .replace(/^export /gm, '');

const { STREAMS } = new Function(`${pathwaysCode}; return { STREAMS };`)();

// ── Helpers ──────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[₹+/]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function s(str) {
  // SQL string literal — handles null and escapes single quotes
  if (str == null) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function arr(items) {
  // SQL text array literal
  if (!items || !items.length) return 'NULL';
  const escaped = items.map(i => `"${String(i).replace(/"/g, '\\"')}"`);
  return `ARRAY[${items.map(i => s(i)).join(', ')}]`;
}

// ── Build SQL ────────────────────────────────────────────

const lines = [];

const push = (...strs) => strs.forEach(str => lines.push(str));

push(
  '-- ============================================================',
  '-- India Education Pathways — Seed Data (Auto-generated)',
  '-- Source: data/pathways.js',
  '-- Run in: Supabase Dashboard → SQL Editor → Run',
  '-- ============================================================',
  ''
);

// ── 1. Education Stages ───────────────────────────────────

push(
  '-- 1. Education Stages',
  `INSERT INTO education_stages (slug, label, sort_order) VALUES`,
  `  ('after_10th', 'After Class 10',       1),`,
  `  ('after_12th', 'After Class 12',       2),`,
  `  ('after_ug',   'After Graduation',     3),`,
  `  ('vocational', 'Vocational / Skill',   4)`,
  `ON CONFLICT (slug) DO NOTHING;`,
  ''
);

// ── 2. Streams ────────────────────────────────────────────

push('-- 2. Streams (from pathways.js + after-10th intermediate streams)', '');

const stageByPathwaysKey = { '10th': 'after_10th', '12th': 'after_12th' };

for (const [i, stream] of STREAMS.entries()) {
  const stageSlug = stageByPathwaysKey[stream.stage];
  push(
    `INSERT INTO streams (slug, name, icon, color, color_light, color_bg, color_text, stage_id, sort_order)`,
    `SELECT ${s(stream.id)}, ${s(stream.name)}, ${s(stream.icon)},`,
    `       ${s(stream.color)}, ${s(stream.colorLight)}, ${s(stream.colorBg)}, ${s(stream.colorText)},`,
    `       id, ${i + 1}`,
    `FROM education_stages WHERE slug = '${stageSlug}'`,
    `ON CONFLICT (slug) DO NOTHING;`,
    ''
  );
}

// After-10th intermediate streams (MPC, BiPC, etc.)
// These are the subjects chosen in Class 11 — no courses seeded yet (added in next sprint)
const intermediateStreams = [
  { slug: 'mpc',          name: 'MPC',              alt_name: 'MPC / PCM',      icon: '📐', color: '#1D4ED8', cl: '#3B82F6', cb: '#EFF6FF', ct: '#1D4ED8', boards: ['BIEAP', 'TSBIE', 'CBSE'], so: 7  },
  { slug: 'bipc',         name: 'BiPC',             alt_name: 'BiPC / PCB',     icon: '🧬', color: '#047857', cl: '#10B981', cb: '#ECFDF5', ct: '#047857', boards: ['BIEAP', 'TSBIE', 'CBSE'], so: 8  },
  { slug: 'pcmb',         name: 'PCMB',             alt_name: 'PCMB (All 4)',   icon: '⚗️', color: '#7C3AED', cl: '#8B5CF6', cb: '#F5F3FF', ct: '#7C3AED', boards: ['CBSE'],                   so: 9  },
  { slug: 'commerce_11',  name: 'Commerce',         alt_name: null,             icon: '💰', color: '#B45309', cl: '#F59E0B', cb: '#FFFBEB', ct: '#B45309', boards: null,                       so: 10 },
  { slug: 'humanities_11',name: 'Humanities / Arts', alt_name: null,            icon: '📚', color: '#6D28D9', cl: '#8B5CF6', cb: '#F5F3FF', ct: '#6D28D9', boards: null,                       so: 11 },
  { slug: 'mec',          name: 'MEC',              alt_name: null,             icon: '📊', color: '#0891B2', cl: '#22D3EE', cb: '#ECFEFF', ct: '#0891B2', boards: ['BIEAP', 'TSBIE'],          so: 12 },
  { slug: 'cec',          name: 'CEC',              alt_name: null,             icon: '💼', color: '#B45309', cl: '#F59E0B', cb: '#FFFBEB', ct: '#B45309', boards: ['BIEAP', 'TSBIE'],          so: 13 },
  { slug: 'hec',          name: 'HEC',              alt_name: null,             icon: '🏫', color: '#15803D', cl: '#22C55E', cb: '#F0FDF4', ct: '#15803D', boards: ['BIEAP', 'TSBIE'],          so: 14 },
];

for (const st of intermediateStreams) {
  const boardsSql = st.boards ? arr(st.boards) : 'NULL';
  push(
    `INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)`,
    `SELECT ${s(st.slug)}, ${s(st.name)}, ${s(st.alt_name)}, ${s(st.icon)},`,
    `       ${s(st.color)}, ${s(st.cl)}, ${s(st.cb)}, ${s(st.ct)},`,
    `       id, ${boardsSql}, ${st.so}`,
    `FROM education_stages WHERE slug = 'after_10th'`,
    `ON CONFLICT (slug) DO NOTHING;`,
    ''
  );
}

// ── 3. Courses, Salary Ranges, Specializations, Career Roles ───

push('-- 3. Courses + Salary Ranges + Specializations + Career Roles', '');

const salaryLabels = ['Fresher', 'Junior / 1–3 yrs', 'Mid / 3–7 yrs', 'Senior / Lead'];

for (const stream of STREAMS) {
  push(`-- Stream: ${stream.name} (${stream.stage}th)`, '');

  for (const [ci, course] of stream.courses.entries()) {
    const courseSlug = slugify(`${stream.id}-${course.name}`);

    // ── Course INSERT ──────────────────────────────────
    push(
      `INSERT INTO courses`,
      `  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,`,
      `   description, fit_for, compare_with, pg_options, is_active, sort_order)`,
      `SELECT`,
      `  ${s(courseSlug)},`,
      `  ${s(course.name)},`,
      `  ${s(course.icon)},`,
      `  id,`,
      `  ${s(course.dur)},`,
      `  ${s(course.salary)},`,
      `  ${s(course.exam)},`,
      `  ${s(course.colleges)},`,
      `  ${s(course.desc)},`,
      `  ${s(course.fit)},`,
      `  ${arr(course.compare)},`,
      `  ${arr(course.pg)},`,
      `  true,`,
      `  ${ci + 1}`,
      `FROM streams WHERE slug = '${stream.id}'`,
      `ON CONFLICT (slug) DO NOTHING;`,
      ''
    );

    // ── Salary Ranges ──────────────────────────────────
    if (course.salaryStages?.length) {
      const valueRows = course.salaryStages
        .map((range, i) => `  (${s(salaryLabels[i])}, ${s(range)}, ${i + 1})`)
        .join(',\n');

      push(
        `INSERT INTO salary_ranges (course_id, label, range_text, sort_order)`,
        `SELECT c.id, v.label, v.range_text, v.sort_order`,
        `FROM courses c`,
        `CROSS JOIN (VALUES`,
        valueRows,
        `) AS v(label, range_text, sort_order)`,
        `WHERE c.slug = '${courseSlug}'`,
        `ON CONFLICT (course_id, sort_order) DO NOTHING;`,
        ''
      );
    }

    // ── Specializations + Career Roles ─────────────────
    for (const [si, spec] of (course.specs || []).entries()) {
      push(
        `INSERT INTO specializations (course_id, name, salary_range, sort_order)`,
        `SELECT id, ${s(spec.n)}, ${s(spec.s)}, ${si + 1}`,
        `FROM courses WHERE slug = '${courseSlug}'`,
        `ON CONFLICT (course_id, name) DO NOTHING;`,
        ''
      );

      if (spec.careers?.length) {
        for (const [ri, career] of spec.careers.entries()) {
          push(
            `INSERT INTO career_roles (specialization_id, name, sort_order)`,
            `SELECT sp.id, ${s(career)}, ${ri + 1}`,
            `FROM specializations sp`,
            `JOIN courses c ON c.id = sp.course_id`,
            `WHERE c.slug = '${courseSlug}'`,
            `  AND sp.name = ${s(spec.n)}`,
            `ON CONFLICT (specialization_id, name) DO NOTHING;`
          );
        }
        push('');
      }
    }
  }
}

// ── Write output ─────────────────────────────────────────

const sql = lines.join('\n');
writeFileSync('./seed.sql', sql);

const courseCount = STREAMS.reduce((n, s) => n + s.courses.length, 0);
const specCount   = STREAMS.reduce((n, s) => n + s.courses.reduce((m, c) => m + (c.specs?.length || 0), 0), 0);
const careerCount = STREAMS.reduce((n, s) => n + s.courses.reduce((m, c) =>
  m + (c.specs || []).reduce((k, sp) => k + (sp.careers?.length || 0), 0), 0), 0);

console.log('');
console.log('✅  seed.sql generated!');
console.log(`    ${STREAMS.length} streams · ${courseCount} courses · ${specCount} specializations · ${careerCount} career roles`);
console.log('');
console.log('Next step:');
console.log('  1. Open Supabase Dashboard → SQL Editor');
console.log('  2. Paste + run schema.sql  (creates all tables)');
console.log('  3. Paste + run seed.sql    (loads all data)');
console.log('');
