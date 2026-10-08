# Mensaje de alta de un proyecto

Cuando el usuario pida "las instrucciones de sesión" para un proyecto, entrégale este mensaje, completo y listo para pegar. Es autocontenido a propósito: el agente del proyecto no necesita acceso a Guppy, que es privado.

Sustituye `<HOY>`. No cambies nada más salvo que el usuario lo pida.

---

Este proyecto está registrado en Guppy, mi gestor de proyectos. Haz esto una sola vez:

1. Añade esta sección a tu `CLAUDE.md` (o `AGENTS.md`, el que use el proyecto; créalo si no existe):

```markdown
## Estado del proyecto (Guppy)

El estado de este proyecto vive en `STATUS.md`, en la raíz del repo. Lo lee Guppy, el gestor de proyectos de Nilo.

Al terminar cualquier sesión que cambie el estado del proyecto:
1. Actualiza la cabecera de `STATUS.md` (estado, siguiente_paso, bloqueo, actualizado).
2. Añade una entrada breve al principio de su Diario.
3. Incluye el cambio en el commit.

Estados: activo, bloqueado, en-pausa, pendiente, terminado. Si está bloqueado, di qué se espera y de quién.
No uses CHANGELOG.md para esto: es para usuarios.
```

2. Crea `STATUS.md` en la raíz con este formato y el estado real del proyecto:

```markdown
---
estado: activo
siguiente_paso: <una frase>
bloqueo: ""
actualizado: <HOY>
---

# Estado

<Dos o tres frases con la situación actual.>

## Diario

- <HOY>: STATUS.md creado.
```

3. Si el `CLAUDE.md` ya tenía una sección de estado, déjala en una línea que remita a `STATUS.md`, para no tener el estado duplicado.
4. Haz commit y push, y dime la URL del repo para registrarla en Guppy.
