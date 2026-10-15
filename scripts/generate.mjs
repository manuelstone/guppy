#!/usr/bin/env node
// Builds site/projects.json and site/projects.md from projects/*.json.
// See docs/status-contract.md. No dependencies: run with `node scripts/generate.mjs`.
// Exits with code 1 and lists every problem if any project file breaks the contract.

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { validateFile } from './validate-status.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = join(root, 'projects');
const siteDir = join(root, 'site');

const STATUS_ORDER = ['blocked', 'active', 'planned', 'inactive', 'archived'];
const STATUS_HEADINGS = {
  blocked: 'Blocked',
  active: 'Active',
  planned: 'Planned',
  inactive: 'Inactive',
  archived: 'Archived',
};

function formatUtc(unix) {
  return new Date(unix * 1000).toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' +0000');
}

function loadProjects() {
  const problems = [];
  const projects = [];
  const files = readdirSync(projectsDir).filter((f) => f.endsWith('.json')).sort();
  for (const file of files) {
    const { project, errors } = validateFile(join(projectsDir, file));
    if (errors.length === 0 && `${project.id}.json` !== file) {
      errors.push(`id: "${project.id}" does not match the file name`);
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
