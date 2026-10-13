---
name: registrar-en-guppy
description: Registra el proyecto actual en Guppy, el gestor de proyectos de Nilo. Úsala cuando pida registrar, dar de alta o añadir este proyecto en Guppy.
---

# Registrar el proyecto actual en Guppy

Guppy es el gestor de proyectos de Nilo y vive en el repo privado github.com/manuelstone/guppy. Esta skill no lleva reglas propias: todas están en el AGENTS.md de Guppy y en su carpeta `plantillas/`. Léelas allí y síguelas; si algo de aquí contradice al AGENTS.md, manda el AGENTS.md.

## 1. Comprobar el acceso a Guppy (antes de tocar nada)

1. Clona github.com/manuelstone/guppy (con permiso de escritura) en una carpeta **fuera del repo del proyecto**, por ejemplo una carpeta temporal. Nunca lo clones dentro del proyecto ni copies sus archivos al proyecto.
2. Si no puedes clonarlo o no tienes permiso de escritura, **para aquí**: dile a Nilo exactamente qué ha fallado y no hagas ningún cambio en el proyecto.
3. Lee entero el `AGENTS.md` del clon, en especial el ritual «Al añadir un proyecto», y `plantillas/mensaje-alta.md`.

## 2. Identificar el proyecto

1. Saca la URL del repo de GitHub del proyecto (`git remote get-url origin`). Si no tiene repo en GitHub, para y díselo a Nilo.
2. Calcula el identificador como dice el AGENTS.md y mira si ya existe su ficha en `proyectos/` o si está en `proyectos/BACKLOG.md` (aunque sea con otro nombre). Si ya hay ficha, díselo a Nilo y actualízala en lugar de crear otra.

## 3. Parte local, en el proyecto

1. Aplica los pasos de `plantillas/mensaje-alta.md` en este repo, salvo el último (no hace falta pedir la URL: ya la tienes).
2. El estado de `guppy/STATUS.md` debe ser el real. Sácalo del repo y de lo que diga Nilo; si no está claro, pregúntale. No lo inventes.
3. Commit y push en el proyecto.

## 4. Parte central, en Guppy

1. Sigue el ritual «Al añadir un proyecto» del AGENTS.md, por la vía de la skill que describe (usa el `guppy/STATUS.md` que acabas de crear y no entregues mensaje de alta).
2. Commit y push en Guppy, con un mensaje como `alta: <id>`.

## 5. Informar

En pocas líneas: qué se ha creado en cada repo, los dos commits y el estado con el que queda el proyecto. Si alguna lectura o escritura ha fallado, dilo tal cual.
