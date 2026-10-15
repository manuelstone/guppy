#!/usr/bin/env node
// Syncs a project's guppy/STATUS.json to projects/<id>.json in Guppy.
// Runs in each project's sync action (templates/guppy-sync.yml), downloaded from the public Guppy repo
// together with validate-status.mjs and schema/status.schema.json. See docs/sync-setup.md.
//
// CLI: node sync-status.mjs [file] [--dry-run]
//   file       the status file (default: guppy/STATUS.json)
//   --dry-run  validate and compare with Guppy, but do not write; works without a token
// Environment:
//   GITHUB_REPOSITORY  owner/name of the project repo (set by GitHub Actions)
//   DEFAULT_BRANCH     the project's default branch (default: main)
//   GITHUB_SHA         commit being synced, mentioned in the commit message (optional)
//   GUPPY_TOKEN        fine-grained token with Contents: Read and write on Guppy (not needed for --dry-run)

import { validateFile } from './validate-status.mjs';

const GUPPY_REPO = 'manuelstone/guppy';
const GUPPY_BRANCH = 'main';
const API = 'https://api.github.com';
const SETUP_DOC = `https://github.com/${GUPPY_REPO}/blob/main/docs/sync-setup.md`;
const CONTRACT_DOC = `https://github.com/${GUPPY_REPO}/blob/main/docs/status-contract.md`;

class SyncError extends Error {}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const file = args.find((a) => !a.startsWith('--')) ?? 'guppy/STATUS.json';
const repo = process.env.GITHUB_REPOSITORY;
const branch = process.env.DEFAULT_BRANCH || 'main';
const sha = process.env.GITHUB_SHA;
const token = process.env.GUPPY_TOKEN;

function headers() {
  const h = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'guppy-sync',
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

function authError(status) {
  return new SyncError(
    `GitHub answered ${status}. The GUPPY_TOKEN secret is probably expired, revoked or missing the ` +
    `"Contents: Read and write" permission on ${GUPPY_REPO}. See ${SETUP_DOC}`,
  );
}

// Returns { exists, sha, content } for the file currently in Guppy.
async function readRemote(contentsUrl, target) {
  const res = await fetch(`${contentsUrl}?ref=${GUPPY_BRANCH}`, { headers: headers() });
  if (res.status === 404) return { exists: false };
  if (res.status === 401 || res.status === 403) throw authError(res.status);
  if (!res.ok) throw new SyncError(`could not read ${target} from Guppy: HTTP ${res.status} ${await res.text()}`);
  const body = await res.json();
  return { exists: true, sha: body.sha, content: Buffer.from(body.content, 'base64').toString('utf8') };
}

async function main() {
  if (!repo) throw new SyncError('GITHUB_REPOSITORY is not set. It should be "owner/name" of the project repo.');

  const { project, errors } = validateFile(file, { repo, branch });
  if (errors.length) {
    throw new SyncError(`${file} breaks the status contract (see ${CONTRACT_DOC}):\n- ${errors.join('\n- ')}`);
  }

  // Guppy keeps every file in the same format, whatever the project's formatting.
  const content = JSON.stringify(project, null, 2) + '\n';
  const target = `projects/${project.id}.json`;
  const contentsUrl = `${API}/repos/${GUPPY_REPO}/contents/${target}`;

  let remote = await readRemote(contentsUrl, target);
  if (remote.exists && remote.content === content) {
    console.log(`${target} in Guppy is already up to date.`);
    return;
  }

  const action = remote.exists ? 'update' : 'create';
  if (dryRun) {
    console.log(`Dry run: would ${action} ${target} in Guppy.`);
    return;
  }
  if (!token) throw new SyncError(`the GUPPY_TOKEN secret is not set in this repository. See ${SETUP_DOC}`);

  // Retry when another sync changed the file between the read and the write (stale sha).
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(contentsUrl, {
      method: 'PUT',
      headers: { ...headers(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Sync ${project.id} status from ${repo}${sha ? `@${sha.slice(0, 7)}` : ''}`,
        content: Buffer.from(content, 'utf8').toString('base64'),
        branch: GUPPY_BRANCH,
        ...(remote.exists ? { sha: remote.sha } : {}),
      }),
    });
    if (res.ok) {
      console.log(`Done: ${action}d ${target} in Guppy.`);
      return;
    }
    if (res.status === 401 || res.status === 403) throw authError(res.status);
    if (res.status !== 409 && res.status !== 422) {
      throw new SyncError(`could not write ${target}: HTTP ${res.status} ${await res.text()}`);
    }
    console.warn(`Attempt ${attempt}: ${target} changed in Guppy meanwhile (HTTP ${res.status}); retrying.`);
    await new Promise((r) => setTimeout(r, attempt * 2000));
    remote = await readRemote(contentsUrl, target);
    if (remote.exists && remote.content === content) {
      console.log(`${target} in Guppy is already up to date.`);
      return;
    }
  }
  throw new SyncError(`could not write ${target} after 4 attempts.`);
}

// Set the exit code instead of calling process.exit(), so pending network handles close cleanly.
try {
  await main();
} catch (err) {
  console.error(err instanceof SyncError ? `Error: ${err.message}` : err);
  process.exitCode = 1;
}
