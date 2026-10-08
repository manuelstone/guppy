---
id: nilovelez-pdf-diva
nombre: PDF Diva
repo: https://github.com/nilovelez/pdf-diva
status_url: https://github.com/nilovelez/pdf-diva/blob/main/STATUS.md
estado: bloqueado
siguiente_paso: Probar en un Mac real el .dmg universal de la rama feat/mac (hito 10)
bloqueo: Espera a que Nilo pruebe el .dmg en un Mac; no hay Mac en el entorno de desarrollo
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

- Mientras el repo no tenga `STATUS.md`, el estado está en la sección "Estado actual" de su `CLAUDE.md`. El `CHANGELOG.md` es para usuarios.
- Documentación técnica: `docs/developer-guide.md`; la web, en `docs/website.md`.
- Equipo dedicado de pruebas y compilación MSIX: "Marcianito".
- Principios del proyecto: sencillo de mantener, estable, autocontenido; contención frente a funciones nuevas.
- Situación a 2026-10-08: v1.3.0 publicada en GitHub (2026-10-07). En la Store, la 1.2.0 está aprobada y la 1.3.0 se envió el 2026-10-08 y está en certificación.

## Historial de la ficha

- 2026-10-08: ficha creada a partir del README, CHANGELOG y CLAUDE.md del repo.
