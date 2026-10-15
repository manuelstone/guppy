# Guppy — agent instructions

Guppy is Nilo Vélez's personal project manager. This repository is the **central source** for the overview of all his projects. If you are an agent or a new session, read this whole file before doing anything: it has everything you need to work here.

## Guppy is public

This repository and its site are public, including the full git history. **Everything written here is public**, and so is every project's `guppy/STATUS.json`, which is synced here.

- Never write private information, credentials, keys, tokens, secrets, internal addresses or personal data in this repo or in a `STATUS.json`. Once committed, it stays in the history even if it is deleted later.
- Guppy only holds each project's public summary and current status. The detail stays in each project's `guppy/STATUS.md`, which is never synced here. That is what lets a project live in a private repo while Guppy is public.
- If you are unsure whether something can be public, leave it out and ask Nilo.

## Language

- Talk to Nilo in Spanish (Spain), concise.
- Everything written to this repo (files, commit messages) is in US English.

## What's here

```
AGENTS.md                         ← this file: rules and workflow
CLAUDE.md                         ← points to this file
docs/status-contract.md           ← status data contract: read it before writing any project file
docs/sync-setup.md                ← how a project syncs its status on its own (token, secret, workflow)
schema/                           ← JSON Schemas for the contract
projects/<id>.json                ← public status summary of each project
projects/BACKLOG.md               ← project ideas not yet decided
scripts/validate-status.mjs       ← validates a status file; shared by Guppy and the project sync action
scripts/generate.mjs              ← validates projects/*.json and generates the site indexes
scripts/sync-status.mjs           ← run by each project's sync action to write its status here
site/                             ← public site, deployed to GitHub Pages
.github/workflows/publish.yml     ← runs the generator and deploys site/ on every change
templates/onboarding-message.md   ← message that sets up or migrates a project (same for every project)
templates/guppy-sync.yml          ← sync workflow to install in each project
templates/STATUS.md               ← template for the guppy/STATUS.md that lives in each project
templates/STATUS.json             ← skeleton for the guppy/STATUS.json that lives in each project
skills/registrar-en-guppy/        ← skill that applies the onboarding message from a project's own session
```

Public endpoints: https://manuelstone.github.io/guppy/ (see "Endpoints" in the contract).

## Model

| Where | What it is | Who writes it |
|---|---|---|
| `guppy/STATUS.md` in each project repo | Extended status and work log. Never synced. | The agent working on that project |
| `guppy/STATUS.json` in each project repo | Public summary, as defined in the contract. **Source of truth for Guppy.** | The agent working on that project |
| `projects/<id>.json` here | Copy of the project's `guppy/STATUS.json` | The project's Guppy sync action. By hand only for projects without a repo, and for legacy projects until they are migrated |
| `site/projects.json`, `site/projects.md` here | Generated indexes | The `Publish site` action. **Never edit them by hand.** |

In each project, **everything Guppy-related lives in the `guppy/` directory** at the repo root, so it does not mix with the project's own files. Each project's `CHANGELOG.md`, if it exists, is for users and is **not** used as a work log.

Identifiers and status values are defined in the contract. Statuses: `active`, `blocked`, `inactive`, `planned`, `archived`.

## Migration in progress

Projects are being moved one by one to the format above, with the onboarding message.

Migrated projects (they sync on their own; never edit their `projects/<id>.json` here):

- `nilovelez-flypad-keepalive`

Every other project with a repo is a **legacy project**: it still has a YAML header in Spanish in its `guppy/STATUS.md` and no `guppy/STATUS.json`. For those, follow "Legacy projects" at the end of this file. That section disappears when the last one is migrated.

## Rituals

### When starting a Guppy session

1. Run `git pull`.
2. Read `site/projects.md`. Open a project's `guppy/STATUS.md` (its `status_url`) only when the question requires it.

### When checking status ("what's half done", "what's blocked", "what do I pick up next")

1. Run `git pull` and read `site/projects.md`. For migrated projects, that is already the current status.
2. For legacy projects involved in the question, refresh them first as described in "Legacy projects".
3. Answer from the updated status. If a migrated project looks stale, its `guppy/STATUS.json` was not updated or its sync failed: say so, and point Nilo to its Actions tab. Do not fix it from here.
4. Do not mention `archived` projects unless the user explicitly asks about them.

### When adding a project with a repo

Guppy writes nothing: the project's first sync creates `projects/<id>.json`.

1. If the project is in `BACKLOG.md` (even under another name), remove its row, then commit and push.
2. Give Nilo the onboarding message (`templates/onboarding-message.md`, from the line down), exactly as it is, ready to paste into a session of that project. Alternatively, he can run the `registrar-en-guppy` skill in that session.
3. The message asks Nilo to add the `GUPPY_TOKEN` secret to the project repo; remind him if he does not have the token at hand (see `docs/sync-setup.md`).
4. When Nilo says it is done, check that the project appears in `site/projects.md` after a `git pull`, and add it to the migrated list above.

### When migrating a legacy project

The same as adding a project with a repo: give Nilo the onboarding message (it detects the legacy format and migrates it) and, when it is done, move the project to the migrated list above.

### When adding or updating a project without a repo

1. Create or edit `projects/<id>.json` by hand, following the contract. `url` is its website (ask Nilo if it has none) and `status_url` is `null`.
2. Run `node scripts/generate.mjs` to validate it, then commit and push. The action redeploys the site.

### When adding an idea to the backlog

1. Add a row at the top of the table in `projects/BACKLOG.md` (most recent first): idea name, one-sentence summary and today's date. Use the user's words; do not expand the idea.
2. The backlog is only for new, undecided projects. Improvements to an existing project go to that project's own backlog, not here; if the user asks to note one down, tell them.

### When taking an idea out of the backlog to work on it

Follow "When adding a project with a repo" (or "without a repo"), with status `planned` or `active` as the user says. That way each thing lives in only one place.

### When ending a session that changed something

Commit and push with a clear message (`Add nilovelez-quevedo to the migrated projects`). **What isn't committed didn't happen.**

## The `registrar-en-guppy` skill

It lives in `skills/registrar-en-guppy/`, is installed on each machine with `npx skills add manuelstone/guppy -g -a claude-code` and updated with `npx skills update -g`. It downloads the onboarding message from this repo and applies it in the project; it never writes to Guppy. It has no rules of its own, so any workflow change is made in the onboarding message. If you change the skill, commit it here and remind Nilo to update it on his machines.

## Rules

- Do not make up status: if you have not read it in a STATUS file or the user has not told you, do not write it.
- Failing to read a file does not mean it does not exist. If a read fails, report the failure as it is.
- Do not edit other projects' repos from here unless explicitly asked.
- Never edit the `projects/<id>.json` of a migrated project: the project owns it, and the next sync would bring the two out of step. The change goes in the project's `guppy/STATUS.json`.
- Never edit `site/projects.json` or `site/projects.md` by hand: change `projects/*.json` and let the generator do the rest.
- `scripts/validate-status.mjs`, `scripts/sync-status.mjs`, `schema/status.schema.json` and the `templates/` files are downloaded from `main` by every project. A breaking change there breaks every project at once: test locally (see "Checking a file locally" in `docs/sync-setup.md`) before pushing, and keep those paths stable.
- If the `Publish site` action fails, the site keeps its previous version. Read the error, fix the project file it names and push again.

## Legacy projects

Until a project is migrated, its `guppy/STATUS.md` has a YAML header in Spanish (`estado`, `siguiente_paso`, `bloqueo`, `actualizado`) and Guppy keeps its `projects/<id>.json` by hand. To refresh one:

1. Check that its repo has not been renamed or transferred: open the repo page (the `url` field) and compare the `user/name` it shows with the one in `url`. GitHub silently redirects old addresses. If it has changed, rename the file to the new identifier, update `id`, `url` and `status_url`, and tell the user.
2. Read its `guppy/STATUS.md` from the raw URL (`status_url`), always adding `?nocache=<unix time>` (`date +%s`). Use that parameter name and not `t`: with `?t=`, a cached 404 kept coming back (checked 2026-10-08). **Do not clone the project repo.**
3. If the status has changed, update `projects/<id>.json` following the contract:
   - `status`: `activo` → `active`, `bloqueado` → `blocked`, `en-pausa` → `inactive`, `pendiente` → `planned`, `terminado` → `archived`.
   - `status_text`: rewrite it from `siguiente_paso`, `bloqueo` and the status section, in English, following "Writing `status_text`" in the contract. Only public information.
   - `last_update` and `last_update_unix`: the date of the last commit that touched `guppy/STATUS.md`, from `https://api.github.com/repos/<user>/<repo>/commits?path=guppy/STATUS.md&sha=<branch>&per_page=1`, in Nilo's local time.
4. Run `node scripts/generate.mjs`, then commit and push.
5. If you cannot read a STATUS.md, say so and use the saved status, giving its `last_update`.
