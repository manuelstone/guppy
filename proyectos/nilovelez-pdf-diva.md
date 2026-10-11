---
id: nilovelez-pdf-diva
nombre: PDF Diva
repo: https://github.com/nilovelez/pdf-diva
status_url: https://raw.githubusercontent.com/nilovelez/pdf-diva/main/guppy/STATUS.md
estado: bloqueado
siguiente_paso: "Mantenimiento y promoción. Después del 19 de octubre, comprobar que el build de Linux sigue bien con Ubuntu 26 (o fijar ubuntu-24.04)"
bloqueo: "Microsoft: certificación de la 1.4.0 en la Store."
actualizado: 2026-10-10
---

# PDF Diva

## De qué va

App de escritorio, libre y gratuita, que da a cualquier PDF una vista del orador como la de PowerPoint: diapositiva a pantalla completa para el público y, en otra pantalla, diapositiva actual, siguiente, cronómetro y controles. Pensada para técnicos de sala y operadores de streaming y vídeo, no para docentes ni creadores de contenido. Sin cuenta, sin telemetría, sin red.

Stack: Electron + TypeScript + PDF.js, UI sin framework, empaquetado con electron-builder. Licencia GPL.

## Dependencias y relaciones

- Distribución en Windows: Microsoft Store (MSIX) y releases de GitHub (instalador NSIS sin firmar).
- Web del proyecto en GitHub Pages: https://nilovelez.github.io/pdf-diva/
- Hito 10 (Mac y Linux) terminado: .dmg probado en un MacBook con Apple silicon; ramas `feat/mac` y `feat/linux` fusionadas en `main`. La web enlaza las descargas de Windows, Mac y Linux.

## Notas operativas

- El estado está en `guppy/STATUS.md` del repo (creado el 2026-10-08). El `CHANGELOG.md` es para usuarios.
- Documentación técnica: `docs/developer-guide.md`; la web, en `docs/website.md`.
- Equipo dedicado de pruebas y compilación MSIX: "Marcianito".
- Principios del proyecto: sencillo de mantener, estable, autocontenido; contención frente a funciones nuevas.
- Situación a 2026-10-10: v1.4.0 publicada en GitHub (Windows, Mac y Linux, con los idiomas nuevos registrados) y enviada a la Store, en certificación.

## Historial de la ficha

- 2026-10-08: ficha creada a partir del README, CHANGELOG y CLAUDE.md del repo.
- 2026-10-08: el estado pasa a `guppy/STATUS.md`; mensaje de alta entregado.
- 2026-10-08: la sesión de PDF Diva crea `guppy/STATUS.md`; ficha sincronizada con él.
- 2026-10-09: sincronizada con `guppy/STATUS.md`: la Store aprueba la 1.3.0; queda solo el bloqueo de la prueba en Mac.
- 2026-10-10: sincronizada con `guppy/STATUS.md`: Linux probado en máquinas reales; sigue bloqueado por la prueba en Mac.
- 2026-10-11: sincronizada con `guppy/STATUS.md`: Mac probado, v1.4.0 publicada; bloqueado solo por la certificación de la Store.
