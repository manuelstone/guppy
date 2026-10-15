---
name: registrar-en-guppy
description: Registers the current project in Guppy, Nilo's project manager. Use it when he asks to register, add or sign up this project in Guppy ("registrar", "dar de alta" or "añadir en Guppy").
---

# Register the current project in Guppy

Guppy is Nilo's project manager and lives in the public repo github.com/manuelstone/guppy. Everything written there is public: never put private information, credentials or secrets in it. This skill has no rules of its own: they are all in Guppy's AGENTS.md and its `templates/` folder. Read them there and follow them; if anything here contradicts AGENTS.md, AGENTS.md wins.

Talk to Nilo in Spanish. Everything written to the repos is in US English, except the legacy Spanish keys and values the templates keep on purpose.

## 1. Check access to Guppy (before touching anything)

1. Clone github.com/manuelstone/guppy (with write access) into a folder **outside the project repo**, for example a temporary folder. Never clone it inside the project or copy its files into the project.
2. If you cannot clone it or do not have write access, **stop here**: tell Nilo exactly what failed and make no changes to the project.
3. Read the clone's whole `AGENTS.md`, especially the "When adding a project" ritual, and `templates/onboarding-message.md`.

## 2. Identify the project

1. Get the project's GitHub repo URL (`git remote get-url origin`). If it has no GitHub repo, stop and tell Nilo.
2. Work out the identifier as AGENTS.md describes and check whether its card already exists in `projects/` or whether it is in `projects/BACKLOG.md` (even under another name). If a card already exists, tell Nilo and update it instead of creating another.

## 3. Local part, in the project

1. Apply the steps in `templates/onboarding-message.md` to this repo, except the last one (no need to ask for the URL: you already have it).
2. The status in `guppy/STATUS.md` must be the real one. Get it from the repo and from what Nilo says; if it is not clear, ask him. Do not make it up.
3. Commit and push in the project.

## 4. Central part, in Guppy

1. Follow the "When adding a project" ritual in AGENTS.md, through the skill route it describes (use the `guppy/STATUS.md` you have just created and do not hand over an onboarding message).
2. Commit and push in Guppy, with a message like `add: <id>`.

## 5. Report

In a few lines: what was created in each repo, the two commits and the status the project ends up with. If any read or write failed, say so as it is.
