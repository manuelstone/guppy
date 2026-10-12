# Guppy — instrucciones para agentes

Guppy es el gestor personal de proyectos de Nilo Vélez. Este repositorio es la **fuente central** del panorama de todos sus proyectos. Si eres un agente o una sesión nueva, lee este archivo entero antes de hacer nada: aquí está todo lo que necesitas para trabajar.

## Qué hay aquí

```
AGENTS.md                  ← este archivo: reglas y flujo de trabajo
CLAUDE.md                  ← remite a este archivo
proyectos/index.md         ← panorama: una línea por proyecto
proyectos/<id>.md          ← ficha de cada proyecto
proyectos/BACKLOG.md       ← ideas de proyectos sin decidir
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

1. Para cada proyecto implicado, comprueba primero que su repo no ha cambiado de nombre ni de dueño: abre la página del repo (el campo `repo` de la ficha) y compara el `usuario/nombre` que muestra con el de la ficha. GitHub redirige las direcciones antiguas sin avisar, así que el hecho de que el STATUS.md se lea bien no demuestra que la URL de la ficha siga siendo la buena. Si ha cambiado, renombra la ficha al nuevo identificador, actualiza `id`, `repo`, `status_url` y su línea en `index.md`, anótalo en el historial de la ficha y avisa al usuario.
2. Lee su `guppy/STATUS.md` por HTTP desde la URL raw de la ficha (`status_url`, en `raw.githubusercontent.com`), añadiendo siempre el parámetro `nocache` con la fecha Unix del momento de la lectura (`date +%s`), por ejemplo `.../guppy/STATUS.md?nocache=1791478800`. Así cada lectura usa una URL única y no puede devolver una versión en caché, ni un 404 antiguo ni un estado viejo. Usa ese nombre de parámetro y no `t`: con `?t=` se comprobó (2026-10-08) que seguía llegando un 404 cacheado de la URL sin parámetros. **No clones el repo del proyecto**: con muchos proyectos no escala y solo hace falta ese archivo.
3. Si el estado ha cambiado, actualiza la cabecera de la ficha y su línea en `index.md`, con `actualizado:` a la fecha de hoy.
4. Responde a partir del estado actualizado. Si no puedes leer un STATUS.md, dilo y usa el estado guardado indicando su fecha.
5. No menciones los proyectos `terminado` salvo que el usuario pregunte por ellos expresamente. Sigue leyendo su STATUS.md igualmente: si alguno ha dejado de estar terminado (se ha reabierto), eso sí se cuenta.

### Al añadir un proyecto

Hay dos vías:

- **Desde una sesión de Guppy** (como hasta ahora): sigue los pasos de abajo y entrega al usuario el mensaje de alta.
- **Desde la sesión del propio proyecto, con la skill `registrar-en-guppy`** de la cuenta de Nilo. La skill clona Guppy en una carpeta fuera del proyecto, aplica `plantillas/mensaje-alta.md` en el proyecto y después sigue estos mismos pasos aquí, con dos diferencias: el paso 1 usa el `guppy/STATUS.md` que acaba de crear en local (no hace falta leerlo por HTTP) y el paso 4 no aplica. La skill no lleva reglas propias: todo lo lee de este archivo y de `plantillas/`, así que cualquier cambio de flujo se hace aquí.

En los dos casos: si ya existe una ficha para ese repo, no crees otra; actualízala. Si el proyecto estaba en `BACKLOG.md` (aunque sea con otro nombre), quita su fila y anótalo en el historial de la ficha.

1. Si el proyecto tiene repo, intenta leer su `guppy/STATUS.md` por la URL raw, con el parámetro de fecha Unix descrito en «Al consultar el estado». Si no puedes leerlo (un 404, un error o un bloqueo), dile al usuario exactamente eso: que no has podido leer el archivo y por qué. No concluyas ni escribas que no existe. Puede que aún no le haya pedido al agente del proyecto que lo cree (para eso es el mensaje del paso 4), pero eso lo confirma el usuario. Mientras no lo hayas leído, el estado de la ficha sale de lo que se haya leído en el repo o de lo que diga el usuario, y la ficha lo indica en sus notas.
2. Crea `proyectos/<id>.md` a partir de `plantillas/ficha.md`.
3. Añade su línea a `index.md`.
4. Si el proyecto tiene repo, entrega al usuario el mensaje de `plantillas/mensaje-alta.md`, listo para pegar en una sesión de ese proyecto. Es autocontenido: el agente del proyecto no necesita acceso a Guppy.

### Al añadir una idea al backlog

1. Añade una fila arriba de la tabla de `proyectos/BACKLOG.md` (lo más reciente, primero): nombre de la idea, resumen de una frase y fecha de hoy. Usa las palabras del usuario; no amplíes la idea.
2. El backlog es solo para proyectos nuevos sin decidir. Las mejoras de un proyecto que ya existe van al backlog de su propio repo, no aquí; si el usuario pide apuntar una, díselo.

### Al sacar una idea del backlog para hacerla

1. Quita su fila de `BACKLOG.md`.
2. Sigue el ritual de «Al añadir un proyecto», con estado `pendiente` o `activo` según diga el usuario. Así cada cosa está en un solo sitio.

### Al terminar una sesión que haya cambiado algo

Commit y push con un mensaje claro (`estado: pdf-diva bloqueado esperando prueba en Mac`). **Lo que no se commitea, no ha pasado.**

## Reglas

- No inventes estado: si no lo has leído en un STATUS.md o no te lo ha dicho el usuario, no lo escribas.
- No poder leer un archivo no significa que no exista. Si una lectura falla, informa del fallo tal cual.
- No edites repos de otros proyectos desde aquí, salvo petición expresa.
- La ficha es contexto y memoria; el estado de verdad está en el STATUS.md del proyecto.
- Escribe en español de España, conciso.
