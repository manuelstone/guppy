---
id: nilovelez-pdf-diva
nombre: PDF Diva
repo: https://github.com/nilovelez/pdf-diva
status_url: https://raw.githubusercontent.com/nilovelez/pdf-diva/main/guppy/STATUS.md
estado: bloqueado
siguiente_paso: "Probar el .dmg en un Mac real (Nilo busca un Mac mini M1) y corregir lo que salga; después, documentación de Linux y fusionar feat/mac y feat/linux"
bloqueo: "Nilo: prueba del .dmg en un Mac real."
actualizado: 2026-10-09
---

# PDF Diva

## De qué va

App de escritorio, libre y gratuita, que da a cualquier PDF una vista del orador como la de PowerPoint: diapositiva a pantalla completa para el público y, en otra pantalla, diapositiva actual, siguiente, cronómetro y controles. Pensada para técnicos de sala y operadores de streaming y vídeo, no para docentes ni creadores de contenido. Sin cuenta, sin telemetría, sin red.

Stack: Electron + TypeScript + PDF.js, UI sin framework, empaquetado con electron-builder. Licencia GPL.

## Dependencias y relaciones

- Distribución en Windows: Microsoft Store (MSIX) y releases de GitHub (instalador NSIS sin firmar).
- Web del proyecto en GitHub Pages: https://nilovelez.github.io/pdf-diva/
- Hito 10: Mac (.dmg universal en `feat/mac`, compilado con GitHub Actions, pendiente de probar en un Mac real) y Linux (.deb x64 en `feat/linux`, probado en Linux Mint 22.3 y Ubuntu 24.04 con X11; Wayland es un riesgo conocido).

## Notas operativas

- El estado está en `guppy/STATUS.md` del repo (creado el 2026-10-08). El `CHANGELOG.md` es para usuarios.
- Documentación técnica: `docs/developer-guide.md`; la web, en `docs/website.md`.
- Equipo dedicado de pruebas y compilación MSIX: "Marcianito".
- Principios del proyecto: sencillo de mantener, estable, autocontenido; contención frente a funciones nuevas.
- Situación a 2026-10-08: v1.3.0 publicada en GitHub (2026-10-07). En la Store, la 1.3.0 se aprobó el 2026-10-09 y ha vuelto el botón de la Store a la web. Siete idiomas nuevos en `locales/` (francés, alemán, italiano, neerlandés, portugués, catalán y andaluz EPA), aún sin registrar en `src/i18n/i18n.ts`.

## Historial de la ficha

- 2026-10-08: ficha creada a partir del README, CHANGELOG y CLAUDE.md del repo.
- 2026-10-08: el estado pasa a `guppy/STATUS.md`; mensaje de alta entregado.
- 2026-10-08: la sesión de PDF Diva crea `guppy/STATUS.md`; ficha sincronizada con él.
- 2026-10-09: sincronizada con `guppy/STATUS.md`: la Store aprueba la 1.3.0; queda solo el bloqueo de la prueba en Mac.
- 2026-10-10: sincronizada con `guppy/STATUS.md`: Linux probado en máquinas reales; sigue bloqueado por la prueba en Mac.
