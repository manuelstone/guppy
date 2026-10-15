---
id: nilovelez-wp-agentic-workflow
nombre: wp-agentic-workflow
repo: https://github.com/nilovelez/wp-agentic-workflow
status_url: https://raw.githubusercontent.com/nilovelez/wp-agentic-workflow/main/guppy/STATUS.md
estado: activo
siguiente_paso: Convertir docs/handoff.md y drafts/ en la skill (SKILL.md, references/ y scripts/ en skills/wp-agentic-workflow/)
bloqueo: ""
actualizado: 2026-10-13
---

# wp-agentic-workflow

## De qué va

Skill pública (GPL) para Claude Code que monta y guía un entorno de desarrollo de plugins (y temas) de WordPress: comprueba las herramientas, prepara los sitios (Playground, Studio) y sigue el mismo flujo en cada proyecto, hasta el envío a WordPress.org. Opinada y basada en las prácticas oficiales de WordPress y en las skills de WordPress/agent-skills.

## Dependencias y relaciones

- Sale del hito 5 de [Classic Honeypot for CF7](nilovelez-classic-honeypot-for-cf7.md), donde se validó el flujo.
- Se apoya en las skills oficiales de WordPress/agent-skills y en Playground, Studio, WP-CLI, PHPCS/WPCS y Plugin Check.
- Alimenta un artículo y una charla sobre empezar a desarrollar para WordPress con Claude (`docs/lessons-learned.md`).

## Notas operativas

- El estado está en `guppy/STATUS.md` del repo (creado el 2026-10-13).
- Fuente de verdad del flujo mientras no exista la skill: `docs/handoff.md`. Scripts de ejemplo en `drafts/`, aún con valores de Classic Honeypot for CF7.
- Todo el repo en inglés de EE. UU., salvo `guppy/`.
- Instalación prevista: `npx skills add nilovelez/wp-agentic-workflow -g -a claude-code`.

## Historial de la ficha

- 2026-10-13: ficha creada desde la sesión del proyecto con la skill `registrar-en-guppy`, a partir de su `guppy/STATUS.md`. El repo se llamaba antes `nilovelez/entorno-desarrollo-wp`.
