---
id: nilovelez-flypad-keepalive
nombre: Flypad Keepalive
repo: https://github.com/nilovelez/flypad-keepalive
status_url: https://raw.githubusercontent.com/nilovelez/flypad-keepalive/main/guppy/STATUS.md
estado: activo
siguiente_paso: Empaquetar flypad_bridge.py como un único .exe con PyInstaller
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
- Situación a 2026-10-08, según el `CLAUDE.md`: el script funciona más de 10 minutos en Uncrashed sin cortes y con el keep-alive desactivado (disponible con `--keepalive`). Pendiente: .exe con PyInstaller, copia del instalador de ViGEmBus 1.22.0 en el repo, aviso claro si falta el driver, README y decidir entre consola o app con icono en la bandeja.
- El repo aún no tiene `guppy/STATUS.md`; el estado de esta ficha sale del `CLAUDE.md` y de lo que ha contado Nilo.

## Historial de la ficha

- 2026-10-08: ficha creada a partir del `CLAUDE.md` del repo; mensaje de alta entregado.
