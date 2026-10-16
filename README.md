# Guppy

Nilo Vélez's personal project manager. It publishes a public summary and the current status of all his projects, as Markdown for humans and agents and as JSON for any app.

- Dashboard: https://manuelstone.github.io/guppy/projects/
- Overview: https://manuelstone.github.io/guppy/projects.md (also as [JSON](https://manuelstone.github.io/guppy/projects.json); source in [site/](site/))
- How it works: [AGENTS.md](AGENTS.md)
- Status data contract: [docs/status-contract.md](docs/status-contract.md)

To teach a new agent how to work with Guppy, just tell it: *"Connect to github.com/manuelstone/guppy and follow its AGENTS.md"*.

To register projects from their own Claude Code session, install the skill on the machine with `npx skills add manuelstone/guppy -g -a claude-code` and say *"registra este proyecto en Guppy"* in the project. Without the skill, paste the [onboarding message](templates/onboarding-message.md) into the project's session.
