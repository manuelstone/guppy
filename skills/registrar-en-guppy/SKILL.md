---
name: registrar-en-guppy
description: Registers the current project in Guppy, Nilo's project manager, so it publishes its status there, and changes the project's data in Guppy (icon, title, description, status). Use it when he asks to register, add or sign up this project in Guppy ("registrar", "dar de alta", "añadir en Guppy"), or to change something about this project in Guppy ("cambia el icono del proyecto en Guppy", "cambia la descripción en Guppy").
---

# Guppy: register the current project or change its data

Guppy is Nilo's project manager. It lives in the public repo github.com/manuelstone/guppy and publishes every project's status on a public website (https://guppy.manolito.com.es/). Each project publishes its own `guppy/STATUS.json`, and a GitHub Action in the project copies it to Guppy. This skill never writes to Guppy: it only reads its public URLs and works in the project.

This skill has no rules of its own. Everything is in Guppy's onboarding message and status contract; if anything here contradicts them, they win.

Talk to Nilo in Spanish. Everything written to the repo is in US English.

Pick the task from what Nilo asks: **register** the project, or **change** its data in Guppy.

## Register the project

1. **Read the onboarding message**: https://raw.githubusercontent.com/manuelstone/guppy/main/templates/onboarding-message.md (add `?nocache=<unix time>` to skip the cache). If you cannot download it, stop and tell Nilo exactly what failed. Make no changes to the project.
2. **Check whether it is already registered** before changing anything. If it already has `guppy/STATUS.json` and the sync workflow, tell Nilo in one line; then only check them against the contract, replace the Guppy section of `CLAUDE.md` with the current one from the message, and fix what is needed.
3. **Apply the message** in this repo, step by step, as if Nilo had pasted it. Stop at the secret step and wait for his confirmation, as the message says.
4. **Backlog.** If the project appears in https://raw.githubusercontent.com/manuelstone/guppy/main/projects/BACKLOG.md (even under another name), tell Nilo: its row has to be removed from a Guppy session, because this skill does not write to Guppy.
5. **Report** as the message's last step says.

## Change the project's data in Guppy

For requests like "change the project's icon in Guppy to <url>", or a new title, description or status.

1. **Check it is registered**: the project must have `guppy/STATUS.json` and `.github/workflows/guppy-sync.yml`. If not, tell Nilo and offer to register it first.
2. **Read the status contract**: https://raw.githubusercontent.com/manuelstone/guppy/main/docs/status-contract.md. It defines every field and how to write it.
3. **Edit only what Nilo asked** in `guppy/STATUS.json`, following the contract:
   - `icon`: download the URL first and check that it answers 200 with an image. Tell Nilo if it is not a square 128×128 PNG (the recommended format); use it anyway if he confirms. `null` removes the icon.
   - `title`, `description`: as Nilo says, within the contract's limits.
   - `status`, `status_text`: also update the Status section and the Log of `guppy/STATUS.md`, and take new `last_update` and `last_update_unix` from a single timestamp, as the project's `CLAUDE.md` describes.
   - Do not touch the dates for any other change: they record status changes only.
4. **Validate** it with Guppy's validator (the commands are in step 5 of the onboarding message) and fix anything it reports.
5. **Commit and push** to the default branch, with a message like `Update the Guppy icon`.
6. **Check** that the Guppy sync run in the Actions tab succeeds and, after a couple of minutes, that https://guppy.manolito.com.es/projects.json shows the change (add `?nocache=<unix time>`).
7. **Report** in one or two lines: what changed, the commit and the result of the check.
