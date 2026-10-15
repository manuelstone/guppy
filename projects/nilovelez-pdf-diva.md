---
id: nilovelez-pdf-diva
nombre: PDF Diva
repo: https://github.com/nilovelez/pdf-diva
status_url: https://raw.githubusercontent.com/nilovelez/pdf-diva/main/guppy/STATUS.md
estado: activo
siguiente_paso: "Nilo publica la release v1.5.0 en GitHub (instalador, dmg y deb) y envía el .appx a la Store; después, la web enlaza la 1.5.0. Después del 19 de octubre, comprobar el build de Linux con Ubuntu 26 (o fijar ubuntu-24.04)"
bloqueo: ""
actualizado: 2026-10-13
---

# PDF Diva

## De qué va

App de escritorio, libre y gratuita, que da a cualquier PDF una vista del orador como la de PowerPoint: diapositiva a pantalla completa para el público y, en otra pantalla, diapositiva actual, siguiente, cronómetro y controles. Pensada para técnicos de sala y operadores de streaming y vídeo, no para docentes ni creadores de contenido. Sin cuenta, sin telemetría, sin red.

Stack: Electron + TypeScript + PDF.js, UI sin framework, empaquetado con electron-builder. Licencia GPL.

## Dependencias y relaciones

- Distribución en Windows: Microsoft Store (MSIX) y releases de GitHub (instalador NSIS sin firmar).
- Web del proyecto: https://pdfdiva.nilovelez.com (desde el 2026-10-11; las direcciones antiguas de GitHub Pages redirigen).
- Hito 10 (Mac y Linux) terminado: .dmg probado en un MacBook con Apple silicon; ramas `feat/mac` y `feat/linux` fusionadas en `main`. La web enlaza las descargas de Windows, Mac y Linux.

## Notas operativas

- El estado está en `guppy/STATUS.md` del repo (creado el 2026-10-08). El `CHANGELOG.md` es para usuarios.
- Documentación técnica: `docs/developer-guide.md`; la web, en `docs/website.md`.
- Equipo dedicado de pruebas y compilación MSIX: "Marcianito".
- Principios del proyecto: sencillo de mantener, estable, autocontenido; contención frente a funciones nuevas.
- Situación a 2026-10-13: hito 11 (refinamiento) hecho y v1.5.0 aprobada y etiquetada (marco uniforme en la vista del orador, selector de tema con tarjetas, miniaturas centradas, imagen nueva del instalador de Windows); pendiente de publicar. Promoción en marcha: textos de prensa y BrandScript en `press/`, cierre de la web «Let the PDF be the star.».

## Historial de la ficha

- 2026-10-08: ficha creada a partir del README, CHANGELOG y CLAUDE.md del repo.
- 2026-10-08: el estado pasa a `guppy/STATUS.md`; mensaje de alta entregado.
- 2026-10-08: la sesión de PDF Diva crea `guppy/STATUS.md`; ficha sincronizada con él.
- 2026-10-09: sincronizada con `guppy/STATUS.md`: la Store aprueba la 1.3.0; queda solo el bloqueo de la prueba en Mac.
- 2026-10-10: sincronizada con `guppy/STATUS.md`: Linux probado en máquinas reales; sigue bloqueado por la prueba en Mac.
- 2026-10-11: sincronizada con `guppy/STATUS.md`: Mac probado, v1.4.0 publicada; bloqueado solo por la certificación de la Store.
- 2026-10-12: sincronizada con `guppy/STATUS.md`: la Store aprueba la 1.4.0 y pasa a activo (promoción y mantenimiento); web nueva en pdfdiva.nilovelez.com.
- 2026-10-13: sincronizada con `guppy/STATUS.md`: v1.5.0 (hito 11) aprobada y etiquetada, pendiente de publicar.
