# Guppy

Nilo Vélez's personal project manager. It publishes a public summary and the current status of all his projects, as Markdown for humans and agents and as JSON for any app.

- Dashboard: https://guppy.manolito.com.es/
- Overview: https://guppy.manolito.com.es/projects.md (also as [JSON](https://guppy.manolito.com.es/projects.json); source in [site/](site/))
- How it works: [AGENTS.md](AGENTS.md)
- Status data contract: [docs/status-contract.md](docs/status-contract.md)

To teach a new agent how to work with Guppy, just tell it: *"Connect to github.com/manuelstone/guppy and follow its AGENTS.md"*.

## The `guppy` command

A local tool for working with Claude Code in tmux, one session per repo folder. It is independent of the project data: it only looks at the folder that holds the repos and at tmux, so any folder works, whether or not it is a Guppy project. It needs zsh and tmux.

```
guppy               List every repo folder and every tmux session; open ones are marked ● in green
guppy <name>        Join the session <name>, or open one in the repo folder <name> running Claude Code
guppy close <name>  Close the session <name>
```

- When it opens a new session and the folder already has Claude conversations, it asks whether to continue the last one, pick one or start a new one (Enter continues).
- Claude is the only program in the session: leaving Claude (`/exit`) closes the session. To leave it running, detach with `Ctrl+B`, `D`.
- Inside tmux, it switches session instead of nesting one.
- Tab completes repo folders and sessions, and the open sessions after `close`.
- The repos folder comes from `GUPPY_REPOS`, or from `~/.guppy/config`. If neither is set, the first run asks for it and saves it there.

It lives in [cli/](cli/). Install it from a clone of this repo with `zsh cli/install.sh`. It links `~/.local/bin/guppy` to the script and sets up the completion in `~/.zshrc`. Update it with `git pull`.

## Registering projects

To register projects from their own Claude Code session, install the skill on the machine with `npx skills add manuelstone/guppy -g -a claude-code` and say *"registra este proyecto en Guppy"* in the project. Without the skill, paste the [onboarding message](templates/onboarding-message.md) into the project's session.
