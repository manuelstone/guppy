# Project onboarding message

The message below sets a project up to publish its status to Guppy. It is the same for every project: give it to Nilo exactly as it is, ready to paste into a session of that project, or apply it directly when you are that session (the `registrar-en-guppy` skill does this). It is self-contained: the project agent only needs to read Guppy's public URLs, never to write to Guppy.

Everything below the line is the message.

---

This project publishes its status to Guppy, my project manager (https://github.com/manuelstone/guppy). Set it up following these steps in order. Talk to me in Spanish; everything you write to the repo is in US English.

Guppy is public: `guppy/STATUS.json` ends up on a public website. Never put private information, credentials, keys, tokens, secrets, internal addresses or personal data in it.

**1. Read the rules.** Read the whole status contract: https://raw.githubusercontent.com/manuelstone/guppy/main/docs/status-contract.md. It defines `guppy/STATUS.json`, the status values and how to write `description` and `status_text`.

**2. Identify the project.**

- Repo: `<owner>/<repo>`, from `git remote get-url origin`. If the project has no GitHub repo, stop and tell me.
- Default branch: `git symbolic-ref --short refs/remotes/origin/HEAD` (drop the `origin/` prefix). If that fails, ask me.
- Identifier: the repo full name in lowercase, with every run of characters other than `a-z` and `0-9` replaced by one hyphen. `nilovelez/pdf-diva` → `nilovelez-pdf-diva`.
- Current status in Guppy: download `https://raw.githubusercontent.com/manuelstone/guppy/main/projects/<id>.json?nocache=<unix time>`. If it exists, it is the starting point for step 5. If it returns 404, this is a new project. If the download fails for any other reason, tell me what happened and stop.

**3. Instructions for future sessions.** Add this section to the project's `CLAUDE.md` (or `AGENTS.md`, whichever it uses; create `CLAUDE.md` if there is none). If there is already a section about Guppy or about the project status, replace it with this one, so the status rules live in one place. If the project's own rules say `guppy/` is written in a language other than English, change that rule: `guppy/` is in English.

```markdown
## Project status (Guppy)

This project publishes its status to Guppy, Nilo's project manager (https://github.com/manuelstone/guppy). Everything Guppy-related lives in `guppy/`, written in English:

- `guppy/STATUS.md`: extended status and work log, for agents working on this project. It is never synced anywhere.
- `guppy/STATUS.json`: public summary, following the status contract (https://github.com/manuelstone/guppy/blob/main/docs/status-contract.md). `.github/workflows/guppy-sync.yml` copies it to Guppy every time it changes on the default branch, and from there it goes to a public website. Never put private information, credentials or secrets in it.

At the end of any session that changes the project status:

1. Update the Status section of `guppy/STATUS.md` and add a brief entry at the top of its Log.
2. Update `guppy/STATUS.json`: `status`, `status_text`, and `last_update` with `last_update_unix`. Take both dates from a single timestamp: `ts=$(date +%s); date -d "@$ts" '+%Y-%m-%d %H:%M:%S %z'; echo "$ts"` (GNU date; the contract has the macOS and PowerShell versions). If the status did not change, do not touch the dates.
3. Commit both files with the rest of the session's changes and push to the default branch.

Statuses: `active` (being worked on), `blocked` (waiting for something outside the project), `inactive` (stopped by choice), `planned` (decided, not started), `archived` (closed).

`status_text`: one or two sentences, under 200 characters, plain text. Say where the project stands and what comes next; if blocked, start with what it is waiting for and from whom. Self-contained: no relative dates, name versions and third parties. Rewrite it in full each time; the history goes in the Log.

Do not use CHANGELOG.md for this: it is for users. Do not edit `guppy-sync.yml`. If the Guppy sync action fails, read its log in the Actions tab and tell Nilo.
```

**4. `guppy/STATUS.md`.**

- If it does not exist, create it from https://raw.githubusercontent.com/manuelstone/guppy/main/templates/STATUS.md, with the project's real status, and a first Log entry: `<today>: guppy/STATUS.md created.`
- If it already exists, keep it and make sure its Status section describes the real, current status.

**5. `guppy/STATUS.json`.** Create it following the contract. The skeleton is at https://raw.githubusercontent.com/manuelstone/guppy/main/templates/STATUS.json.

- If Guppy already has a file for this project (step 2), start from it and keep `title`, `description` and `icon` unless I say otherwise. If `guppy/STATUS.md` describes a newer situation than its `status` and `status_text`, update them and take new dates as described in the section above; otherwise keep the dates.
- If it is a new project, write `title` and `description` from the README (ask me if they are not clear), `status` and `status_text` from the real status, and the dates from a single timestamp taken now.
- `url` is `https://github.com/<owner>/<repo>`, `status_url` is `https://raw.githubusercontent.com/<owner>/<repo>/<default-branch>/guppy/STATUS.md`. `icon` is a public URL of the project's icon, ideally a square 128×128 PNG (for a WordPress plugin published on WordPress.org, `https://ps.w.org/<plugin-slug>/assets/icon-128x128.png`); if there is none, ask me, and use `null` if I have none either.

Validate it. This needs Node.js 18 or later:

```bash
d=$(mktemp -d); mkdir -p "$d/scripts" "$d/schema"
curl -fsSL https://raw.githubusercontent.com/manuelstone/guppy/main/scripts/validate-status.mjs -o "$d/scripts/validate-status.mjs"
curl -fsSL https://raw.githubusercontent.com/manuelstone/guppy/main/schema/status.schema.json -o "$d/schema/status.schema.json"
node "$d/scripts/validate-status.mjs" guppy/STATUS.json --repo <owner>/<repo> --branch <default-branch>
```

Fix anything it reports until it says the file follows the contract. Without Node.js, check the file against the contract by hand and tell me it was not validated.

**6. Sync workflow.** Download https://raw.githubusercontent.com/manuelstone/guppy/main/templates/guppy-sync.yml to `.github/workflows/guppy-sync.yml`, unchanged.

**7. Packaging.** Check that no build, packaging or publishing rule (the packager, `.distignore`, `.gitattributes` with `export-ignore`, the website configuration) includes `guppy/` or `.github/workflows/guppy-sync.yml`; if one would, exclude it. For a `.gitattributes` with `export-ignore`, exclude `/.github` as a whole.

**8. Secret.** Stop here and ask me to confirm that the repo has the `GUPPY_TOKEN` Actions secret. Without it, the sync fails. I add it myself (https://github.com/manuelstone/guppy/blob/main/docs/sync-setup.md). Do not continue until I confirm.

**9. Publish.** Commit and push to the default branch, with a message like `Publish project status to Guppy`. Then check, waiting a couple of minutes if needed:

- The **Guppy sync** run in the repo's Actions tab finishes successfully (`gh run list --workflow guppy-sync.yml`, if the GitHub CLI is available). If `guppy/STATUS.json` did not change in this push, no run starts; that is fine.
- The project appears with its current status in https://guppy.manolito.com.es/projects.json (add `?nocache=<unix time>` to skip the cache).

**10. Report.** In a few lines: what changed in the repo, the commit, the status the project ends up with, and the result of both checks. If something failed, say exactly what.
