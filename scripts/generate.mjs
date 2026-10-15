#!/usr/bin/env node
// Builds site/projects.json and site/projects.md from projects/*.json.
// See docs/status-contract.md. No dependencies: run with `node scripts/generate.mjs`.
// Exits with code 1 and lists every problem if any project file breaks the contract.

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = join(root, 'projects');
const siteDir = join(root, 'site');
const schema = JSON.parse(readFileSync(join(root, 'schema', 'status.schema.json'), 'utf8'));

const STATUS_ORDER = ['blocked', 'active', 'planned', 'inactive', 'archived'];
const STATUS_HEADINGS = {
  blocked: 'Blocked',
  active: 'Active',
  planned: 'Planned',
  inactive: 'Inactive',
  archived: 'Archived',
};

// Minimal validator for the subset of JSON Schema that status.schema.json uses.
// It refuses unknown keywords, so extending the schema cannot silently skip checks.
const KNOWN_KEYWORDS = new Set([
  '$schema', '$id', 'title', 'description', 'type', 'additionalProperties', 'required',
  'properties', 'enum', 'pattern', 'minLength', 'maxLength', 'minimum',
]);

function checkKeywords(node, path) {
  for (const key of Object.keys(node)) {
    if (!KNOWN_KEYWORDS.has(key)) throw new Error(`Unsupported schema keyword "${key}" at ${path}`);
  }
  for (const [name, sub] of Object.entries(node.properties ?? {})) checkKeywords(sub, `${path}.${name}`);
}

function typeOf(value) {
  if (value === null) return 'null';
  if (Number.isInteger(value)) return 'integer';
  return typeof value === 'object' ? (Array.isArray(value) ? 'array' : 'object') : typeof value;
}

function validateValue(value, rules, field, errors) {
  const types = [rules.type].flat();
  const actual = typeOf(value);
  if (!types.includes(actual)) {
    errors.push(`${field}: expected ${types.join(' or ')}, got ${actual}`);
    return;
  }
  if (actual === 'null') return;
  if (rules.enum && !rules.enum.includes(value)) errors.push(`${field}: must be one of ${rules.enum.join(', ')}`);
  if (typeof value === 'string') {
    if (rules.minLength !== undefined && value.length < rules.minLength) errors.push(`${field}: shorter than ${rules.minLength} characters`);
    if (rules.maxLength !== undefined && value.length > rules.maxLength) errors.push(`${field}: longer than ${rules.maxLength} characters (${value.length})`);
    if (rules.pattern && !new RegExp(rules.pattern, 'u').test(value)) errors.push(`${field}: does not match ${rules.pattern}`);
  }
  if (rules.minimum !== undefined && value < rules.minimum) errors.push(`${field}: less than ${rules.minimum}`);
}

function validateProject(project) {
  const errors = [];
  if (typeOf(project) !== 'object') return ['file must contain a JSON object'];
  for (const key of schema.required) {
    if (!(key in project)) errors.push(`${key}: missing`);
  }
  for (const key of Object.keys(project)) {
    if (!(key in schema.properties)) errors.push(`${key}: unknown field`);
  }
  for (const [key, rules] of Object.entries(schema.properties)) {
    if (key in project) validateValue(project[key], rules, key, errors);
  }
  return errors;
}

// "2026-10-12 18:42:07 +0200" -> Unix seconds
function parseLastUpdate(text) {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) ([+-])(\d{2})(\d{2})$/.exec(text);
  if (!m) return null;
  const [, y, mo, d, h, mi, s, sign, oh, om] = m;
  const utc = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s) / 1000;
  const offset = (sign === '+' ? 1 : -1) * (+oh * 3600 + +om * 60);
  return utc - offset;
}

function formatUtc(unix) {
  return new Date(unix * 1000).toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' +0000');
}

function loadProjects() {
  const problems = [];
  const projects = [];
  const files = readdirSync(projectsDir).filter((f) => f.endsWith('.json')).sort();
  for (const file of files) {
    let project;
    try {
      project = JSON.parse(readFileSync(join(projectsDir, file), 'utf8'));
    } catch (err) {
      problems.push(`${file}: invalid JSON (${err.message})`);
      continue;
    }
    const errors = validateProject(project);
    if (errors.length === 0) {
      if (`${project.id}.json` !== file) errors.push(`id: "${project.id}" does not match the file name`);
      if (parseLastUpdate(project.last_update) !== project.last_update_unix) {
        errors.push(`last_update and last_update_unix describe different instants`);
      }
    }
    if (errors.length) problems.push(...errors.map((e) => `${file}: ${e}`));
    else projects.push(project);
  }
  projects.sort((a, b) => a.id.localeCompare(b.id));
  return { projects, problems };
}

function renderMarkdown({ generated, projects }) {
  const lines = [
    '# Projects',
    '',
    `Status of Nilo Vélez's projects, generated from \`projects/*.json\` in [Guppy](https://github.com/manuelstone/guppy) on ${generated}. Do not edit by hand. Also available as [projects.json](projects.json).`,
  ];
  for (const status of STATUS_ORDER) {
    const group = projects
      .filter((p) => p.status === status)
      .sort((a, b) => b.last_update_unix - a.last_update_unix);
    if (group.length === 0) continue;
    lines.push('', `## ${STATUS_HEADINGS[status]}`);
    for (const p of group) {
      lines.push('', `### [${p.title}](${p.url})`, '', p.status_text, '', `Updated: ${p.last_update}`);
    }
  }
  return lines.join('\n') + '\n';
}

checkKeywords(schema, 'status.schema.json');
const { projects, problems } = loadProjects();
if (problems.length) {
  console.error('Project files break the status contract:');
  for (const p of problems) console.error(`- ${p}`);
  process.exit(1);
}

// Keep the previous timestamp when the data has not changed, so reruns produce no diff.
const jsonPath = join(siteDir, 'projects.json');
const previous = existsSync(jsonPath) ? JSON.parse(readFileSync(jsonPath, 'utf8')) : null;
let generated_unix = Math.floor(Date.now() / 1000);
if (previous && isDeepStrictEqual(previous.projects, projects)) generated_unix = previous.generated_unix;
const index = { generated: formatUtc(generated_unix), generated_unix, projects };

writeFileSync(jsonPath, JSON.stringify(index, null, 2) + '\n');
writeFileSync(join(siteDir, 'projects.md'), renderMarkdown(index));
console.log(`Generated site/projects.json and site/projects.md with ${projects.length} projects.`);
