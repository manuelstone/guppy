# Guppy — agent instructions

Guppy is Nilo Vélez's personal project manager. This repository is the **central source** for the overview of all his projects. If you are an agent or a new session, read this whole file before doing anything: it has everything you need to work here.

## Language

- Talk to Nilo in Spanish (Spain), concise.
- Everything written to this repo (files, commit messages) is in US English.

## What's here

```
AGENTS.md                         ← this file: rules and workflow
CLAUDE.md                         ← points to this file
docs/status-contract.md           ← status data contract (being rolled out; see below)
schema/                           ← JSON Schemas for the contract
projects/index.md                 ← overview: one line per project
projects/<id>.md                  ← card for each project
projects/BACKLOG.md               ← project ideas not yet decided
templates/project-card.md         ← template for new cards
templates/STATUS.md               ← template for the guppy/STATUS.md that lives in each project
templates/onboarding-message.md   ← onboarding message for each project's session
skills/registrar-en-guppy/        ← skill to register a project from its own session
```

## Migration in progress

Guppy is moving to the data contract in [docs/status-contract.md](docs/status-contract.md): each project publishes a `guppy/STATUS.json`, a GitHub Action syncs it to `projects/<id>.json`, and another one generates `index.json` and `index.md`. Until that rollout is finished, **the workflow below is still the one in force**. The data formats it uses (card front matter and the YAML header of `guppy/STATUS.md`) keep their legacy Spanish keys and values on purpose: existing projects use them. Do not mix the two formats.

## Model

There are two levels of information, and each has an owner:

| Where | What it is | Who writes it |
|---|---|---|
| `guppy/STATUS.md` in each project repo | Operational status and work log. **Source of truth for the status.** | The agent working on that project, at the end of each session |
| `projects/<id>.md` here | Card: what it is about, dependencies, relationships with other projects, notes, pointer to STATUS.md and a copy of the status | The Guppy agent |
| `projects/index.md` here | One line per project for quick lookups | The Guppy agent |

In each project, **everything Guppy-related lives in the `guppy/` directory** at the repo root, so it does not mix with the project's own files. Today it contains `guppy/STATUS.md`; any new Guppy file in a project also goes there.

Each project's `CHANGELOG.md`, if it exists, is for users and is **not** used as a work log.

### Project identifier

`<github-user>-<repo-slug>`, lowercase, no accents or spaces. Example: `nilovelez-pdf-diva`. For projects without a repo, `nilovelez-<descriptive-slug>`.

### Possible statuses (legacy values)

- `activo` — being worked on
- `bloqueado` — cannot move forward until something happens (say what and who)
- `en-pausa` — stopped by choice, with no blocker
- `pendiente` — noted down, not started
- `terminado` — closed; the card is kept

## Rituals

### When starting a Guppy session

1. Run `git pull`.
2. Read `projects/index.md`. Open cards only when the question requires it.

### When checking status ("what's half done", "what's blocked", "what do I pick up next")

1. For each project involved, first check that its repo has not been renamed or transferred: open the repo page (the card's `repo` field) and compare the `user/name` it shows with the card's. GitHub silently redirects old addresses, so the fact that STATUS.md reads fine does not prove the card's URL is still right. If it has changed, rename the card to the new identifier, update `id`, `repo`, `status_url` and its line in `index.md`, note it in the card's history and tell the user.
2. Read its `guppy/STATUS.md` over HTTP from the card's raw URL (`status_url`, on `raw.githubusercontent.com`), always adding the `nocache` parameter with the Unix time of the read (`date +%s`), for example `.../guppy/STATUS.md?nocache=1791478800`. That way each read uses a unique URL and cannot return a cached version, an old 404 or a stale status. Use that parameter name and not `t`: with `?t=`, a cached 404 for the parameterless URL kept coming back (checked 2026-10-08). **Do not clone the project repo**: it does not scale with many projects and only that file is needed.
3. If the status has changed, update the card's header and its line in `index.md`, with `actualizado:` set to today's date.
4. Answer from the updated status. If you cannot read a STATUS.md, say so and use the saved status, giving its date.
5. Do not mention `terminado` projects unless the user explicitly asks about them. Keep reading their STATUS.md anyway: if one is no longer finished (it has been reopened), that does get reported.

### When adding a project

There are two ways:

- **From a Guppy session**: follow the steps below and give the user the onboarding message.
- **From the project's own session in local Claude Code, with the `registrar-en-guppy` skill**, which lives in `skills/registrar-en-guppy/` in this repo. It is installed on each machine with `npx skills add manuelstone/guppy -g -a claude-code` and updated with `npx skills update -g`. If you change the skill, commit it here and remind Nilo to update it on his machines. The skill clones Guppy into a folder outside the project, applies `templates/onboarding-message.md` in the project and then follows these same steps here, with two differences: step 1 uses the `guppy/STATUS.md` it has just created locally (no need to read it over HTTP) and step 4 does not apply. The skill has no rules of its own: it reads everything from this file and from `templates/`, so any workflow change is made here.

In both cases: if a card already exists for that repo, do not create another; update it. If the project was in `BACKLOG.md` (even under another name), remove its row and note it in the card's history.

1. If the project has a repo, try to read its `guppy/STATUS.md` from the raw URL, with the Unix time parameter described in "When checking status". If you cannot read it (a 404, an error or a block), tell the user exactly that: that you could not read the file and why. Do not conclude or write that it does not exist. The user may not yet have asked the project agent to create it (that is what the message in step 4 is for), but only the user can confirm that. Until you have read it, the card's status comes from what was read in the repo or from what the user says, and the card says so in its notes.
2. Create `projects/<id>.md` from `templates/project-card.md`.
3. Add its line to `index.md`.
4. If the project has a repo, give the user the message in `templates/onboarding-message.md`, ready to paste into a session of that project. It is self-contained: the project agent does not need access to Guppy.

### When adding an idea to the backlog

1. Add a row at the top of the table in `projects/BACKLOG.md` (most recent first): idea name, one-sentence summary and today's date. Use the user's words; do not expand the idea.
2. The backlog is only for new, undecided projects. Improvements to an existing project go to that project's own backlog, not here; if the user asks to note one down, tell them.

### When taking an idea out of the backlog to work on it

1. Remove its row from `BACKLOG.md`.
2. Follow the "When adding a project" ritual, with status `pendiente` or `activo` as the user says. That way each thing lives in only one place.

### When ending a session that changed something

Commit and push with a clear message (`status: pdf-diva blocked waiting for Mac test`). **What isn't committed didn't happen.**

## Rules

- Do not make up status: if you have not read it in a STATUS.md or the user has not told you, do not write it.
- Failing to read a file does not mean it does not exist. If a read fails, report the failure as it is.
- Do not edit other projects' repos from here unless explicitly asked.
- The card is context and memory; the real status is in the project's STATUS.md.
