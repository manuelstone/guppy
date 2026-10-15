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
schema/                           ← JSON Schemas for the contract
projects/<id>.json                ← public status summary of each project
projects/BACKLOG.md               ← project ideas not yet decided
scripts/generate.mjs              ← validates projects/*.json and generates the site indexes
site/                             ← public site, deployed to GitHub Pages
.github/workflows/publish.yml     ← runs the generator and deploys site/ on every change
templates/STATUS.md               ← template for the guppy/STATUS.md that lives in each project
templates/onboarding-message.md   ← onboarding message for each project's session
skills/registrar-en-guppy/        ← skill to register a project from its own session
```

Public endpoints: https://manuelstone.github.io/guppy/ (see "Endpoints" in the contract).

## Migration in progress

Guppy is moving to the data contract in [docs/status-contract.md](docs/status-contract.md). **The Guppy side is in place**: each project has a `projects/<id>.json` and the `Publish site` action generates `site/projects.json` and `site/projects.md` and deploys them.

**The project side is not yet**: projects still keep the legacy `guppy/STATUS.md`, with a YAML header in Spanish (`estado`, `siguiente_paso`, `bloqueo`, `actualizado`), and they have no `guppy/STATUS.json` or sync action. Until each project is migrated, the Guppy agent keeps its `projects/<id>.json` up to date by hand, following the rituals below. Do not ask project agents to use the new format yet.

Projects that already sync automatically: none yet.

## Model

| Where | What it is | Who writes it |
|---|---|---|
| `guppy/STATUS.md` in each project repo | Operational status and work log. **Source of truth for the status.** Legacy format for now. | The agent working on that project, at the end of each session |
| `projects/<id>.json` here | Public summary, as defined in the contract | The Guppy agent, by hand, until the project syncs automatically |
| `site/projects.json`, `site/projects.md` here | Generated indexes | The `Publish site` action. **Never edit them by hand.** |

In each project, **everything Guppy-related lives in the `guppy/` directory** at the repo root, so it does not mix with the project's own files.

Each project's `CHANGELOG.md`, if it exists, is for users and is **not** used as a work log.

### Project identifier

`<github-user>-<repo-slug>`, lowercase, no accents or spaces. Example: `nilovelez-pdf-diva`. For projects without a repo, `nilovelez-<descriptive-slug>`.

### Statuses

The contract values, and the legacy values projects still use:

| Contract | Legacy | Meaning |
|---|---|---|
| `active` | `activo` | Being worked on |
| `blocked` | `bloqueado` | Cannot move forward until something outside the project happens |
| `inactive` | `en-pausa` | Stopped by choice, with no blocker |
| `planned` | `pendiente` | Decided, but work has not started |
| `archived` | `terminado` | Closed; no more work expected |

## Rituals

### When starting a Guppy session

1. Run `git pull`.
2. Read `site/projects.md`. Open a project's `STATUS.md` only when the question requires it.

### When checking status ("what's half done", "what's blocked", "what do I pick up next")

For each project involved that does not sync automatically yet:

1. Check that its repo has not been renamed or transferred: open the repo page (the `url` field) and compare the `user/name` it shows with the one in `url`. GitHub silently redirects old addresses, so the fact that STATUS.md reads fine does not prove the URL is still right. If it has changed, rename the file to the new identifier, update `id`, `url` and `status_url`, and tell the user.
2. Read its `guppy/STATUS.md` over HTTP from the raw URL (`status_url`), always adding the `nocache` parameter with the Unix time of the read (`date +%s`), for example `.../guppy/STATUS.md?nocache=1791478800`. That way each read uses a unique URL and cannot return a cached version, an old 404 or a stale status. Use that parameter name and not `t`: with `?t=`, a cached 404 for the parameterless URL kept coming back (checked 2026-10-08). **Do not clone the project repo**: it does not scale with many projects and only that file is needed.
3. If the status has changed, update `projects/<id>.json` following the contract:
   - `status`: the contract value for the legacy `estado`.
   - `status_text`: rewrite it from `siguiente_paso`, `bloqueo` and the status section, in English, following "Writing `status_text`" in the contract. Only public information.
   - `last_update` and `last_update_unix`: the date of the last commit that touched `guppy/STATUS.md`, from `https://api.github.com/repos/<user>/<repo>/commits?path=guppy/STATUS.md&sha=<branch>&per_page=1`, in Nilo's local time.
4. Run `node scripts/generate.mjs` to validate the files and regenerate the indexes, then commit and push. The action redeploys the site.
5. Answer from the updated status. If you cannot read a STATUS.md, say so and use the saved status, giving its `last_update`.
6. Do not mention `archived` projects unless the user explicitly asks about them. Keep reading their STATUS.md anyway: if one has been reopened, that does get reported.

### When adding a project

There are two ways:

- **From a Guppy session**: follow the steps below and give the user the onboarding message.
- **From the project's own session in local Claude Code, with the `registrar-en-guppy` skill**, which lives in `skills/registrar-en-guppy/` in this repo. It is installed on each machine with `npx skills add manuelstone/guppy -g -a claude-code` and updated with `npx skills update -g`. If you change the skill, commit it here and remind Nilo to update it on his machines. The skill clones Guppy into a folder outside the project, applies `templates/onboarding-message.md` in the project and then follows these same steps here, with two differences: step 1 uses the `guppy/STATUS.md` it has just created locally (no need to read it over HTTP) and step 4 does not apply. The skill has no rules of its own: it reads everything from this file and from `templates/`, so any workflow change is made here.

In both cases: if `projects/<id>.json` already exists for that repo, do not create another; update it. If the project was in `BACKLOG.md` (even under another name), remove its row.

1. If the project has a repo, try to read its `guppy/STATUS.md` from the raw URL, with the Unix time parameter described in "When checking status". If you cannot read it (a 404, an error or a block), tell the user exactly that: that you could not read the file and why. Do not conclude or write that it does not exist. The user may not yet have asked the project agent to create it (that is what the message in step 4 is for), but only the user can confirm that. Until you have read it, the status comes from what was read in the repo or from what the user says.
2. Create `projects/<id>.json` following the contract. `title` and `description` come from the repo (README, CLAUDE.md) or from the user; the status fields, as in "When checking status". Anything that does not fit in the contract fields (dependencies, notes, plans) belongs in the project's `guppy/STATUS.md`, not here.
3. Run `node scripts/generate.mjs`, then commit and push.
4. If the project has a repo, give the user the message in `templates/onboarding-message.md`, ready to paste into a session of that project. It is self-contained: the project agent does not need access to Guppy.

### When adding an idea to the backlog

1. Add a row at the top of the table in `projects/BACKLOG.md` (most recent first): idea name, one-sentence summary and today's date. Use the user's words; do not expand the idea.
2. The backlog is only for new, undecided projects. Improvements to an existing project go to that project's own backlog, not here; if the user asks to note one down, tell them.

### When taking an idea out of the backlog to work on it

1. Remove its row from `BACKLOG.md`.
2. Follow the "When adding a project" ritual, with status `planned` or `active` as the user says. That way each thing lives in only one place.

### When ending a session that changed something

Commit and push with a clear message (`Update pdf-diva status: blocked waiting for Mac test`). **What isn't committed didn't happen.**

## Rules

- Do not make up status: if you have not read it in a STATUS.md or the user has not told you, do not write it.
- Failing to read a file does not mean it does not exist. If a read fails, report the failure as it is.
- Do not edit other projects' repos from here unless explicitly asked.
- Never edit `site/projects.json` or `site/projects.md` by hand: change `projects/*.json` and let the generator do the rest.
- If the `Publish site` action fails, the site keeps its previous version. Read the error, fix the project file it names and push again.
