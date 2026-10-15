---
name: registrar-en-guppy
description: Registers the current project in Guppy, Nilo's project manager, or migrates it to Guppy's current status format. Use it when he asks to register, add, sign up, migrate or update this project in Guppy ("registrar", "dar de alta", "añadir en Guppy", "migrar a Guppy").
---

# Register the current project in Guppy

Guppy is Nilo's project manager. It lives in the public repo github.com/manuelstone/guppy and publishes every project's status on a public website. Each project publishes its own `guppy/STATUS.json`, and a GitHub Action in the project copies it to Guppy. This skill never writes to Guppy: it only reads its public URLs and sets up the project.

This skill has no rules of its own. Everything is in Guppy's onboarding message; if anything here contradicts it, the onboarding message wins.

Talk to Nilo in Spanish. Everything written to the repo is in US English.

## Steps

1. **Read the onboarding message**: https://raw.githubusercontent.com/manuelstone/guppy/main/templates/onboarding-message.md (add `?nocache=<unix time>` to skip the cache). If you cannot download it, stop and tell Nilo exactly what failed. Make no changes to the project.
2. **Tell Nilo which case it is** before changing anything, in one line: a new project (no `guppy/STATUS.md`), a migration (a `guppy/STATUS.md` with a YAML header) or an update (it already has `guppy/STATUS.json`; check it against the contract and fix what is needed).
3. **Apply the message** in this repo, step by step, as if Nilo had pasted it. Stop at the secret step and wait for his confirmation, as the message says.
4. **Backlog.** If the project appears in https://raw.githubusercontent.com/manuelstone/guppy/main/projects/BACKLOG.md (even under another name), tell Nilo: its row has to be removed from a Guppy session, because this skill does not write to Guppy.
5. **Report** as the message's last step says.
