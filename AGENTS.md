# Guppy — instrucciones para agentes

Guppy es el gestor personal de proyectos de Nilo Vélez. Este repositorio es la **fuente central** del panorama de todos sus proyectos. Si eres un agente o una sesión nueva, lee este archivo entero antes de hacer nada: aquí está todo lo que necesitas para trabajar.

## Qué hay aquí

```
AGENTS.md                  ← este archivo: reglas y flujo de trabajo
CLAUDE.md                  ← remite a este archivo
proyectos/index.md         ← panorama: una línea por proyecto
proyectos/<id>.md          ← ficha de cada proyecto
plantillas/ficha.md        ← plantilla para fichas nuevas
plantillas/STATUS.md       ← plantilla del guppy/STATUS.md que vive en cada proyecto
plantillas/mensaje-alta.md ← mensaje de alta para la sesión de cada proyecto
```

## Modelo

Hay dos niveles de información y cada uno tiene un dueño:

| Dónde | Qué es | Quién lo escribe |
|---|---|---|
| `guppy/STATUS.md` en el repo de cada proyecto | Estado operativo y diario de trabajo. **Fuente de verdad del estado.** | El agente que trabaja en ese proyecto, al terminar cada sesión |
| `proyectos/<id>.md` aquí | Ficha: de qué va, dependencias, relación con otros proyectos, notas, puntero al STATUS.md y una copia del estado | El agente de Guppy |
| `proyectos/index.md` aquí | Una línea por proyecto para consultas rápidas | El agente de Guppy |

En cada proyecto, **todo lo de Guppy vive en el directorio `guppy/`** de la raíz del repo, para no mezclarlo con los archivos del propio proyecto. Hoy contiene `guppy/STATUS.md`; cualquier archivo nuevo de Guppy en un proyecto va también ahí.

El `CHANGELOG.md` de cada proyecto, si existe, es para usuarios y **no** se usa como diario.

### Identificador de proyecto

`<usuario-github>-<slug-del-repo>`, en minúsculas, sin acentos ni espacios. Ejemplo: `nilovelez-pdf-diva`. Para proyectos sin repo, `nilovelez-<slug-descriptivo>`.

### Estados posibles

- `activo` — se está trabajando en él
- `bloqueado` — no puede avanzar hasta que pase algo (indicar qué y quién)
- `en-pausa` — parado por decisión, sin bloqueo
- `pendiente` — anotado, sin empezar
- `terminado` — cerrado; se conserva la ficha

## Rituales

### Al empezar una sesión de Guppy

1. Haz `git pull`.
2. Lee `proyectos/index.md`. Abre fichas solo cuando la pregunta lo requiera.

### Al consultar el estado ("qué está a medias", "qué está bloqueado", "con cuál sigo")

1. Para cada proyecto implicado, lee su `guppy/STATUS.md` en la URL de la ficha (`status_url`).
2. Si el estado ha cambiado, actualiza la cabecera de la ficha y su línea en `index.md`, con `actualizado:` a la fecha de hoy.
3. Responde a partir del estado actualizado. Si no puedes leer un STATUS.md, dilo y usa el estado guardado indicando su fecha.

### Al añadir un proyecto

1. Crea `proyectos/<id>.md` a partir de `plantillas/ficha.md`.
2. Añade su línea a `index.md`.
3. Si el proyecto tiene repo, entrega al usuario el mensaje de `plantillas/mensaje-alta.md`, listo para pegar en una sesión de ese proyecto. Es autocontenido: el agente del proyecto no necesita acceso a Guppy.

### Al terminar una sesión que haya cambiado algo

Commit y push con un mensaje claro (`estado: pdf-diva bloqueado esperando prueba en Mac`). **Lo que no se commitea, no ha pasado.**

## Reglas

- No inventes estado: si no lo has leído en un STATUS.md o no te lo ha dicho el usuario, no lo escribas.
- No edites repos de otros proyectos desde aquí, salvo petición expresa.
- La ficha es contexto y memoria; el estado de verdad está en el STATUS.md del proyecto.
- Escribe en español de España, conciso.
