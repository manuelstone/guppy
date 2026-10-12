---
id: nilovelez-classic-honeypot-for-cf7
nombre: Classic Honeypot for CF7
repo: https://github.com/nilovelez/classic-honeypot-for-cf7
status_url: https://raw.githubusercontent.com/nilovelez/classic-honeypot-for-cf7/main/guppy/STATUS.md
estado: bloqueado
siguiente_paso: "Esperar la respuesta a la apelación y atender lo que pidan (responder siempre a su email, nunca reenviar el plugin); si lo aprueban, subir a trunk, crear el tag 1.0.0 y subir assets/ al SVN"
bloqueo: "Equipo de plugins de WordPress.org: respuesta a la apelación del rechazo por duplicado (apelado el 2026-10-12)."
actualizado: 2026-10-12
---

# Classic Honeypot for CF7

## De qué va

Fork GPL del plugin de WordPress Honeypot for Contact Form 7 (de Nocean), a partir de la versión 2.1.1, la última antes de que el plugin cambiara de dueño. Renombrado a Classic Honeypot for CF7 y sin publicidad.

## Dependencias y relaciones

- Depende de Contact Form 7; ya incluye los cambios del generador de etiquetas de CF7 6.0.
- Upstream: Honeypot for Contact Form 7 2.1.1 (Nocean).

## Notas operativas

- El estado está en `guppy/STATUS.md` del repo (creado el 2026-10-11).
- Situación a 2026-10-12: hitos 1 a 5 terminados (el 5 montó el entorno de desarrollo: Studio, Playground y MCP Adapter, base de una futura skill pública). Enviado a WordPress.org el 2026-10-11 con el slug `classic-honeypot-for-cf7`; rechazado por duplicado de Honeypot for Contact Form 7 y apelado el 2026-10-12. Se mantienen el tag `[honeypot]` y los filtros `wpcf7_honeypot_*` por compatibilidad.
- Ya hay README.md y `assets/` para el SVN de WordPress.org, ambos excluidos del zip. Sin confirmar si el zip excluye también `guppy/`.

## Historial de la ficha

- 2026-10-11: ficha creada a partir de `guppy/STATUS.md` y `CLAUDE.md` del repo; sale del backlog, donde estaba como «CF7 Honeypot Classic».
- 2026-10-11: Nilo confirma que aún no hay README ni empaquetado.
- 2026-10-11: el repo cambia de nombre a `nilovelez/classic-honeypot-for-cf7` (antes `cf7-honeypot-classic`); actualizados id, repo y status_url.
- 2026-10-12: sincronizada con `guppy/STATUS.md`: hito 5 cerrado, enviado a WordPress.org, rechazado por duplicado y apelado; pasa a bloqueado.
