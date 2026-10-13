---
id: nilovelez-quevedo
nombre: Quevedo
repo: https://github.com/nilovelez/quevedo
status_url: https://raw.githubusercontent.com/nilovelez/quevedo/master/guppy/STATUS.md
estado: activo
siguiente_paso: "Publicar la 1.5 en WordPress.org por SVN; antes, decidir quién instala el cliente svn y si se añade un Upgrade Notice"
bloqueo: ""
actualizado: 2026-10-13
---

# Quevedo

## De qué va

Plugin de WordPress, publicado en WordPress.org, con herramientas para quien usa WordPress para escribir: quita funciones innecesarias en blogs de un solo autor (etiquetas, formatos de entrada, archivos de autor y de fecha, páginas de adjuntos), simplifica los bloques del editor, añade imagen destacada por defecto y metadatos Open Graph, y shortcodes `[year]` y `[lipsum]`.

## Dependencias y relaciones

- Distribución: directorio de plugins de WordPress.org.
- Flujo de desarrollo de WordPress: [wp-agentic-workflow](nilovelez-wp-agentic-workflow.md).

## Notas operativas

- El estado está en `guppy/STATUS.md` del repo (creado el 2026-10-13). La rama principal es `master`, no `main`.
- Versión 1.5 publicada en GitHub (etiqueta v1.5, 2026-10-13), pendiente de subir a WordPress.org; la 1.4 sigue siendo la publicada allí. Requiere WordPress 5.9 y PHP 8.2, probada hasta WordPress 7.1. Las traducciones llegan solo de translate.wordpress.org.
- Pendiente: `BACKLOG.md` del repo. Plan de publicación por SVN en `guppy/STATUS.md`.
- Entorno: sitio de Studio en `Studio/quevedo` (quevedo.local) y `blueprint.json` para Playground (usar `--port 9401` si el 9400 está ocupado).
- El zip de release se genera con `git archive` (instrucciones en el README.md); los archivos de desarrollo, `guppy/` incluido, se excluyen con `export-ignore` en `.gitattributes`.

## Historial de la ficha

- 2026-10-13: ficha creada con la skill `registrar-en-guppy` desde la sesión del proyecto, a partir del repo y del `guppy/STATUS.md` recién creado.
- 2026-10-13: el repo añade `.gitattributes` con `export-ignore` y la guía del zip de release en el README.md.
- 2026-10-13: sincronizada con `guppy/STATUS.md`: 1.5 publicada en GitHub (análisis, PHPCS, bugs, seguridad, accesibilidad, PHP 8.2, Plugin Check limpio); falta subirla a WordPress.org.
