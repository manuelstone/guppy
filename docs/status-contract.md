# Status contract

This document defines the data format Guppy uses to publish the status of Nilo's projects. It is the contract between three parties:

- **Project agents**, who write the status of their own project.
- **Guppy**, which collects those statuses and publishes the indexes.
- **Clients**: Guppy agents, web pages, dashboards or anything else that reads the indexes.

The machine-readable version of this contract is in [`schema/`](../schema/). If this document and the schemas disagree, fix whichever is wrong; they must always say the same thing.

> **Migration note.** This contract is being rolled out in milestones. Until the rollout is complete, the workflow in [AGENTS.md](../AGENTS.md) still uses the legacy format (project cards in `projects/<id>.md` and a YAML header in `guppy/STATUS.md`).

## Architecture

```
Project repo                          Guppy repo
────────────                          ──────────
guppy/STATUS.md   (detail + log)
guppy/STATUS.json (summary) ──sync──▶ projects/<id>.json ──generate──▶ index.json
                                      (one per project)                index.md
```

- **In each project**, `guppy/STATUS.md` holds the extended status and the work log, written for the agent working on that project. `guppy/STATUS.json` holds the summary defined below. It is the only file that is synced to Guppy.
- **A GitHub Action in each project** copies `guppy/STATUS.json` to `projects/<id>.json` in Guppy whenever it changes.
- **A GitHub Action in Guppy** regenerates `index.json` and `index.md` whenever anything in `projects/` changes, whether it came from a project sync or from a manual edit.
- **Projects without a repo** have an orphan `projects/<id>.json` that is edited by hand in Guppy. The generator treats it like any other.

Nothing runs on a schedule: every update cascades from a change. If the sync fails, each project keeps its own status up to date and nothing is lost.

## Project status: `STATUS.json`

Lives at `guppy/STATUS.json` in each project repo, and as `projects/<id>.json` in Guppy. All fields are required. Fields with no value are `null`, never omitted. No other fields are allowed.

```json
{
  "id": "nilovelez-pdf-diva",
  "title": "PDF Diva",
  "description": "Free desktop app that gives any PDF a PowerPoint-style presenter view.",
  "status": "active",
  "status_text": "Working on the social media marketing strategy. Version 1.5.0 has been submitted to the Microsoft Store for certification.",
  "last_update": "2026-10-12 18:42:07 +0200",
  "last_update_unix": 1791823327,
  "url": "https://github.com/nilovelez/pdf-diva",
  "status_url": "https://raw.githubusercontent.com/nilovelez/pdf-diva/main/guppy/STATUS.md",
  "icon": null
}
```

| Field | Type | Content |
|---|---|---|
| `id` | string | Project identifier. See [Identifier](#identifier). |
| `title` | string | Display name, for example `PDF Diva`. |
| `description` | string | What the project is, in one sentence. See [Writing `description`](#writing-description). |
| `status` | string | One of the [status values](#status-values). |
| `status_text` | string | Where the project stands now. See [Writing `status_text`](#writing-status_text). |
| `last_update` | string | When the status last changed, human-readable: `YYYY-MM-DD HH:MM:SS ±HHMM`. |
| `last_update_unix` | integer | The same instant as a Unix timestamp, in seconds. |
| `url` | string | Main link for the project: its repo, or its website if it has no repo. |
| `status_url` | string or `null` | Raw URL of the project's `guppy/STATUS.md`, or `null` if it has none. |
| `icon` | string or `null` | URL of a square icon (PNG or SVG). Reserved for future use; `null` for now. |

### Identifier

`<github-user>-<repo-slug>`, lowercase, ASCII only, words separated by hyphens. Example: `nilovelez-pdf-diva`. Projects without a repo use `nilovelez-<descriptive-slug>`.

The identifier is also the file name in Guppy (`projects/<id>.json`). For projects with a repo, the sync action checks that `id` and `url` match the actual repository, so a renamed or transferred repo is detected automatically.

### Status values

| Value | Meaning |
|---|---|
| `active` | Being worked on. |
| `blocked` | Cannot move forward until something outside the project happens. `status_text` says what and who it is waiting for. |
| `inactive` | Stopped by choice, with no blocker. |
| `planned` | Decided, but work has not started. |
| `archived` | Closed. No more work is expected. |

The list is closed. Adding a value is a contract change.

### Updating `last_update`

`last_update` and `last_update_unix` record when the **status** last changed (`status` or `status_text`), not when the file was committed or synced. Sessions that do not change the status do not touch them.

Both fields must describe the same instant. Take the timestamp once and format it, instead of reading the clock twice:

```bash
# GNU date (Linux, Git Bash on Windows)
ts=$(date +%s); date -d "@$ts" '+%Y-%m-%d %H:%M:%S %z'; echo "$ts"

# BSD date (macOS)
ts=$(date +%s); date -r "$ts" '+%Y-%m-%d %H:%M:%S %z'; echo "$ts"
```

```powershell
$now = [DateTimeOffset]::Now
$now.ToString('yyyy-MM-dd HH:mm:ss ') + $now.ToString('zzz').Replace(':', '')
$now.ToUnixTimeSeconds()
```

The Guppy generator checks that both fields match and reports any mismatch. When they disagree, `last_update_unix` is the one that counts.

### Writing `description`

- One sentence that says what the project is and who it is for.
- It describes the project, not its status. It rarely changes.
- Plain text, under 200 characters.

Example: "Free desktop app that gives any PDF a PowerPoint-style presenter view."

### Writing `status_text`

`status_text` must be short enough to read at a glance and complete enough that an agent can understand it and rewrite it without any other context.

- **One or two sentences, under 200 characters.** Plain text: no Markdown, links or line breaks.
- **Say where the project stands and what comes next.** If `blocked`, start with what it is waiting for and from whom.
- **Make it self-contained.** No references to conversations, and no relative dates ("yesterday", "last week"). Name versions, platforms and third parties: "the WordPress.org plugin directory", not "the directory".
- **Rewrite it in full every time.** Do not append to it. The history belongs in the log in `guppy/STATUS.md`.
- **Leave the detail out.** Anything that does not fit goes in `guppy/STATUS.md`.

Examples:

- `blocked`: "Waiting for approval from the WordPress.org plugin directory to publish version 1.0."
- `active`: "Working on the social media marketing strategy. Version 1.5.0 has been submitted to the Microsoft Store for certification."
- `archived`: "Version 1.0.0 is published. No further work is planned."

## Indexes

Guppy publishes two indexes generated from `projects/*.json`. Nobody edits them by hand.

### `index.json`

```json
{
  "generated": "2026-10-15 10:00:00 +0000",
  "generated_unix": 1792058400,
  "projects": [
    { "id": "nilovelez-pdf-diva", "...": "every field of STATUS.json" }
  ]
}
```

- `generated` and `generated_unix` follow the same convention as `last_update`.
- `projects` contains one entry per file in `projects/`, each with exactly the fields of `STATUS.json`, sorted by `id` so that diffs stay small. Clients sort and group as they need.

### `index.md`

The same data in a Markdown document for humans and agents. Projects are grouped by status in this order: `blocked`, `active`, `planned`, `inactive`, `archived`. Within each group, the most recently updated come first. Each project shows its title (linked to `url`), its `status_text` and its `last_update`.

## Endpoints

Both indexes live at the root of the Guppy repo and are meant to be read like an API, over raw URLs:

- `https://raw.githubusercontent.com/manuelstone/guppy/main/index.json`
- `https://raw.githubusercontent.com/manuelstone/guppy/main/index.md`

`raw.githubusercontent.com` caches responses for a few minutes. Clients that need a fresh copy add a `nocache` query parameter with the current Unix timestamp, for example `index.json?nocache=1792058400`.

## Changing the contract

Any change to fields, types or status values is made in this document and in `schema/` in the same commit, and announced to Nilo, because every project and client depends on it.
