#!/usr/bin/env node
// Validates a project status file against the status contract (docs/status-contract.md).
// Used by scripts/generate.mjs here and, downloaded from the public repo, by each project's sync action.
// It expects schema/status.schema.json one level up from this script, as in the Guppy repo.
//
// CLI: node validate-status.mjs <file> [--repo <owner/name>] [--branch <name>]
//   --repo    also check that id, url and status_url match that GitHub repository
//   --branch  the repository's default branch, used to check status_url (default: main)
// Exits with code 1 and lists every problem if the file breaks the contract.

import { readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(readFileSync(join(scriptDir, '..', 'schema', 'status.schema.json'), 'utf8'));

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
checkKeywords(schema, 'status.schema.json');

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

// "2026-10-12 18:42:07 +0200" -> Unix seconds
export function parseLastUpdate(text) {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) ([+-])(\d{2})(\d{2})$/.exec(text);
  if (!m) return null;
  const [, y, mo, d, h, mi, s, sign, oh, om] = m;
  const utc = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s) / 1000;
  const offset = (sign === '+' ? 1 : -1) * (+oh * 3600 + +om * 60);
  return utc - offset;
}

// Checks the schema and that both dates describe the same instant. Returns a list of problems.
export function validateStatus(project) {
  if (typeOf(project) !== 'object') return ['file must contain a JSON object'];
  const errors = [];
  for (const key of schema.required) {
    if (!(key in project)) errors.push(`${key}: missing`);
  }
  for (const key of Object.keys(project)) {
    if (!(key in schema.properties)) errors.push(`${key}: unknown field`);
  }
  for (const [key, rules] of Object.entries(schema.properties)) {
    if (key in project) validateValue(project[key], rules, key, errors);
  }
  if (errors.length === 0 && parseLastUpdate(project.last_update) !== project.last_update_unix) {
    errors.push('last_update and last_update_unix describe different instants');
  }
  return errors;
}

// "nilovelez/PDF_Diva" -> "nilovelez-pdf-diva"
export function idForRepo(repo) {
  return repo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Checks that id, url and status_url point to the given repository. Returns a list of problems.
export function checkRepo(project, repo, branch = 'main') {
  const errors = [];
  const expectedId = idForRepo(repo);
  const expectedUrl = `https://github.com/${repo}`;
  const expectedStatusUrl = `https://raw.githubusercontent.com/${repo}/${branch}/guppy/STATUS.md`;
  if (project.id !== expectedId) errors.push(`id: expected "${expectedId}" for ${repo}, got "${project.id}"`);
  if (String(project.url).toLowerCase() !== expectedUrl.toLowerCase()) {
    errors.push(`url: expected "${expectedUrl}", got "${project.url}"`);
  }
  if (project.status_url !== null && String(project.status_url).toLowerCase() !== expectedStatusUrl.toLowerCase()) {
    errors.push(`status_url: expected "${expectedStatusUrl}" or null, got "${project.status_url}"`);
  }
  return errors;
}

// Reads, parses and validates a file. Returns { project, errors }.
export function validateFile(path, { repo, branch } = {}) {
  let project;
  try {
    project = JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    return { project: null, errors: [`invalid JSON or unreadable file (${err.message})`] };
  }
  const errors = validateStatus(project);
  if (errors.length === 0 && repo) errors.push(...checkRepo(project, repo, branch));
  return { project, errors };
}

function parseArgs(argv) {
  const args = { file: null, repo: null, branch: 'main' };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--repo') args.repo = argv[++i];
    else if (argv[i] === '--branch') args.branch = argv[++i];
    else args.file = argv[i];
  }
  return args;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { file, repo, branch } = parseArgs(process.argv.slice(2));
  if (!file) {
    console.error('Usage: node validate-status.mjs <file> [--repo <owner/name>] [--branch <name>]');
    process.exit(2);
  }
  const { errors } = validateFile(file, { repo, branch });
  if (errors.length) {
    console.error(`${file} breaks the status contract:`);
    for (const e of errors) console.error(`- ${e}`);
    process.exit(1);
  }
  console.log(`${file} follows the status contract.`);
}
