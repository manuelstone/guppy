---
id: nilovelez-flypad-keepalive
nombre: Flypad Keepalive
repo: https://github.com/nilovelez/flypad-keepalive
status_url: https://raw.githubusercontent.com/nilovelez/flypad-keepalive/main/guppy/STATUS.md
estado: activo
siguiente_paso: "H2: mensajes de error claros (falta ViGEmBus, Bluetooth apagado) y que la ventana no se cierre de golpe"
bloqueo: ""
actualizado: 2026-10-08
---

# Flypad Keepalive

## De qué va

Ejecutable para Windows que permite usar el mando Parrot Flypad (Bluetooth LE) en simuladores de dron para PC, como Liftoff o Uncrashed, sin que se desconecte. El script `flypad_bridge.py` se conecta al mando por GATT directo y lo presenta como un mando virtual de Xbox 360. Proyecto personal de Nilo para aprovechar el mando de su minidron Parrot.

Stack: Python 3 con `bleak` (BLE) y `vgamepad` (mando virtual). Plataforma: Windows 11.

## Dependencias y relaciones

- Driver de sistema ViGEmBus (versión de referencia 1.22.0), que necesita `vgamepad` y que el .exe de PyInstaller no instala. ViGEmBus está descontinuado, pero funciona en Windows 10 y 11.
- Protocolo BLE obtenido de la app FreeFlight Mini de Parrot.

## Notas operativas

- La documentación técnica (protocolo BLE, lo que no funciona, tareas abiertas) está en el `CLAUDE.md` del repo.
- El emparejamiento en Windows y la conexión por USB se cortan a los 60-120 s; la solución es la conexión GATT directa. Por USB no hay solución.
- El estado está en `guppy/STATUS.md` del repo (creado el 2026-10-08).
- Decisiones: programa de consola en una ventana pequeña que se deja abierta, sin icono en la bandeja. El keep-alive se ha quitado del código porque las pruebas mostraron que no hace falta. Dependencias fijadas: bleak 3.0.2 y vgamepad 0.1.0 (Python 3.14).
- Hitos: H1 (limpieza, dependencias, `.gitignore`) terminado. Quedan H2 (mensajes de error y que la ventana no se cierre de golpe), H3 (instalador de ViGEmBus 1.22.0 con su licencia en `drivers/`), H4 (.exe único con PyInstaller), H5 (README) y H6 opcional (release en GitHub).

## Historial de la ficha

- 2026-10-08: ficha creada a partir del `CLAUDE.md` del repo; mensaje de alta entregado.
- 2026-10-08: corregida la nota de que no existía `guppy/STATUS.md` (la URL raw devolvía 404 por caché); ficha sincronizada con él.
