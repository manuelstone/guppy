# Project onboarding message

When the user asks for "the session instructions" for a project, give them this message, complete and ready to paste. It is self-contained on purpose: the project agent does not need access to Guppy.

Replace `<TODAY>`. Do not change anything else unless the user asks.

---

This project is registered in Guppy, my project manager. Do this once:

1. Add this section to your `CLAUDE.md` (or `AGENTS.md`, whichever the project uses; create it if it does not exist):

```markdown
## Project status (Guppy)

Everything related to Guppy, Nilo's project manager, lives in the `guppy/` directory at the repo root, separate from the project's files. Do not store Guppy data outside that directory, or project data inside it.

The project status is in `guppy/STATUS.md`. At the end of any session that changes the project status:
1. Update the header of `guppy/STATUS.md` (estado, siguiente_paso, bloqueo, actualizado).
2. Add a brief entry at the top of its Log.
3. Include the change in the commit.

The header keys and status values are in Spanish on purpose; keep them as they are. Statuses: activo, bloqueado, en-pausa, pendiente, terminado. If it is blocked, say what it is waiting for and from whom.
Do not use CHANGELOG.md for this: it is for users.
```

2. Create the `guppy/` directory at the repo root and, inside it, `guppy/STATUS.md` with this format and the project's actual status:

```markdown
---
estado: activo
siguiente_paso: <one sentence>
bloqueo: ""
actualizado: <TODAY>
---

# Status

<Two or three sentences describing the current situation.>

## Log

- <TODAY>: guppy/STATUS.md created.
```

3. If the `CLAUDE.md` already had a status section, reduce it to one line pointing to `guppy/STATUS.md`, so the status is not duplicated.
4. Check that no build, packaging or publishing rule (for example, the packager or website configuration) includes the `guppy/` directory; if any would, exclude it.
5. Commit and push, and give me the repo URL so I can register it in Guppy.
