---
id: nilovelez-pdf-diva
nombre: PDF Diva
repo: https://github.com/nilovelez/pdf-diva
status_url: https://github.com/nilovelez/pdf-diva/blob/main/guppy/STATUS.md
estado: bloqueado
siguiente_paso: Probar el .dmg del Mac en un Mac real y corregir lo que salga; después, Linux (Debian y Ubuntu)
bloqueo: "Nilo: resultado de la prueba del .dmg en un Mac real. Microsoft: certificación de la 1.3.0 en la Store (al aprobarse, volver a poner el botón de la Store en la web)."
actualizado: 2026-10-08
---

# PDF Diva

## De qué va

App de escritorio, libre y gratuita, que da a cualquier PDF una vista del orador como la de PowerPoint: diapositiva a pantalla completa para el público y, en otra pantalla, diapositiva actual, siguiente, cronómetro y controles. Pensada para técnicos de sala y operadores de streaming y vídeo, no para docentes ni creadores de contenido. Sin cuenta, sin telemetría, sin red.

Stack: Electron + TypeScript + PDF.js, UI sin framework, empaquetado con electron-builder. Licencia GPL.

## Dependencias y relaciones

- Distribución en Windows: Microsoft Store (MSIX) y releases de GitHub (instalador NSIS sin firmar).
- Web del proyecto en GitHub Pages: https://nilovelez.github.io/pdf-diva/
- Hito 10: Mac primero (.dmg compilado con GitHub Actions), después Linux (Debian/Ubuntu).

## Notas operativas

- El estado está en `guppy/STATUS.md` del repo (creado el 2026-10-08). El `CHANGELOG.md` es para usuarios.
- Documentación técnica: `docs/developer-guide.md`; la web, en `docs/website.md`.
- Equipo dedicado de pruebas y compilación MSIX: "Marcianito".
- Principios del proyecto: sencillo de mantener, estable, autocontenido; contención frente a funciones nuevas.
- Situación a 2026-10-08: v1.3.0 publicada en GitHub (2026-10-07). En la Store, la 1.2.0 está aprobada y la 1.3.0 se envió el 2026-10-08 y está en certificación.

## Historial de la ficha

- 2026-10-08: ficha creada a partir del README, CHANGELOG y CLAUDE.md del repo.
- 2026-10-08: el estado pasa a `guppy/STATUS.md`; mensaje de alta entregado.
- 2026-10-08: la sesión de PDF Diva crea `guppy/STATUS.md`; ficha sincronizada con él.
