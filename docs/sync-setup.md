# Sync setup

How to make a project publish its status to Guppy on its own. Once set up, every push that changes `guppy/STATUS.json` on the project's default branch reaches the public site in a minute or two, with no agent involved.

The data format is defined in [status-contract.md](status-contract.md). This document covers the plumbing.

## How it works

```
project push ──▶ Guppy sync (project action) ──▶ projects/<id>.json in Guppy ──▶ Publish site (Guppy action) ──▶ GitHub Pages
```

1. The project's **Guppy sync** action ([`templates/guppy-sync.yml`](../templates/guppy-sync.yml)) runs on every push to the default branch that touches `guppy/STATUS.json`, and on demand.
2. It downloads [`scripts/sync-status.mjs`](../scripts/sync-status.mjs), [`scripts/validate-status.mjs`](../scripts/validate-status.mjs) and [`schema/status.schema.json`](../schema/status.schema.json) from Guppy, so every project runs the same, current version.
3. The script validates the file against the contract and checks that `id`, `url` and `status_url` match the repository. If anything is wrong, it fails before touching Guppy.
4. If the file differs from the one in Guppy, it writes it to `projects/<id>.json` through the GitHub API, using the `GUPPY_TOKEN` secret. If nothing changed, it does nothing.
5. That commit triggers Guppy's **Publish site** action, which regenerates the indexes and deploys the site.

## The token

One fine-grained personal access token, owned by `manuelstone` (the owner of Guppy), shared by all projects. It can only write the contents of the Guppy repo: it cannot touch the projects, and it cannot change Guppy's workflows.

To create it, signed in as `manuelstone`:

1. Go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Token name**: `guppy-sync`.
3. **Expiration**: pick one and note the date. GitHub emails a reminder before it expires.
4. **Resource owner**: `manuelstone`.
5. **Repository access**: **Only select repositories** → `manuelstone/guppy`.
6. **Permissions → Repository permissions → Contents**: **Read and write**. (Metadata: Read-only is added automatically.) Nothing else.
7. **Generate token** and copy it. GitHub only shows it once; keep it in a password manager, because every new project needs it.

## Setting up a project

These steps are for a project that already has a valid `guppy/STATUS.json`.

1. **Add the secret**, signed in as an account with admin rights on the project repo:
   - On the web: project repo → **Settings → Secrets and variables → Actions → New repository secret**. Name: `GUPPY_TOKEN`. Secret: the token.
   - Or with the GitHub CLI: `gh secret set GUPPY_TOKEN --repo <owner>/<repo>` (it asks for the value).
2. **Add the workflow**: copy [`templates/guppy-sync.yml`](../templates/guppy-sync.yml) to `.github/workflows/guppy-sync.yml` in the project, unchanged.
3. **Commit and push** to the default branch.
4. **Check it**: the project's **Actions** tab shows a **Guppy sync** run. In Guppy, a `Sync <id> status from …` commit (only if the file changed) and a **Publish site** run follow, and the project appears on https://manuelstone.github.io/guppy/projects.md.

To run it by hand: project repo → **Actions → Guppy sync → Run workflow**, or `gh workflow run guppy-sync.yml --repo <owner>/<repo>`.

## Checking a file locally

From a Guppy checkout, without a token and without writing anything:

```bash
# Contract only
node scripts/validate-status.mjs path/to/STATUS.json --repo <owner>/<repo> --branch <default-branch>

# Contract, plus a comparison with the file currently in Guppy
GITHUB_REPOSITORY=<owner>/<repo> DEFAULT_BRANCH=<default-branch> node scripts/sync-status.mjs path/to/STATUS.json --dry-run
```

## Renewing the token

1. Signed in as `manuelstone`, open the token and click **Regenerate token**. It keeps its settings and gets a new value.
2. Update the `GUPPY_TOKEN` secret in every project that syncs. The list is in [AGENTS.md](../AGENTS.md) ("Projects that already sync automatically"). With the GitHub CLI:

```bash
read -rs TOKEN
for repo in nilovelez/flypad-keepalive; do   # one entry per syncing project
  printf '%s' "$TOKEN" | gh secret set GUPPY_TOKEN --repo "$repo"
done
```

## Failure notifications

GitHub emails the account that started a failed run:

- **Guppy sync** fails → the account that pushed to the project.
- **Publish site** fails → `manuelstone`, because the sync commits with its token.

Set each account to **Settings → Notifications → System → Actions → Only notify for failed workflows**.

## Troubleshooting

| Error in the Guppy sync log | Cause and fix |
|---|---|
| `breaks the status contract` | The file does not follow the contract. The log lists each problem; fix the file and push again. |
| `id: expected "…"` or `url: expected "…"` | The repo was renamed or transferred, or the file was copied from another project. Update `id`, `url` and `status_url`. The old `projects/<id>.json` stays in Guppy until someone deletes it there. |
| `the GUPPY_TOKEN secret is not set` | Add the secret (see "Setting up a project"). |
| `GitHub answered 401` or `403` | The token expired, was revoked or lacks the Contents permission. Renew it. |
| `Download Guppy sync scripts` fails | GitHub was unreachable, or the scripts moved in Guppy. Re-run the workflow; if it keeps failing, check the paths in the template. |
| The run is skipped | The push was not to the default branch. Only the default branch publishes status. |
