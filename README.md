# Guppy

Nilo Vélez's personal project manager. It centralizes the status, context and relationships of all his projects so they can be checked from any session or agent.

- Overview: [projects/index.md](projects/index.md)
- How it works: [AGENTS.md](AGENTS.md)
- Status data contract: [docs/status-contract.md](docs/status-contract.md)

To teach a new agent how to work with Guppy, just tell it: *"Connect to github.com/manuelstone/guppy and follow its AGENTS.md"*.

To register projects from their own Claude Code session, install the skill on the machine with `npx skills add manuelstone/guppy -g -a claude-code` and say *"registra este proyecto en Guppy"* in the project.
