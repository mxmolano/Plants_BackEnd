# 🌱 Mi Huerta - Backend

Backend desarrollado en Node.js + Express + TypeScript con arquitectura hexagonal.

## 🚀 Características
- Autenticación JWT
- PostgreSQL
- Gestión de usuarios, plantas, cultivos, etapas, tareas y notificaciones
- Arquitectura hexagonal
- Soporte para despliegue con Docker

## 🔧 Instalación
```bash
git clone https://github.com/tuusuario/mi-huerta-backend.git
cd mi-huerta-backend
npm install
cp .env
npm run dev
```

## 📦 Stack
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT (autenticación)
- Docker (opcional)

# 🌱 Resumen de Ports y Lógica de Negocio

## 👤 UsuarioPort
**Métodos**
- `createUsuario(usuario)` → Crea un nuevo usuario (admin o normal).
- `updateUsuario(id_usuario, usuario)` → Actualiza datos del usuario.
- `deleteUsuario(id_usuario)` → Desactiva un usuario (borrado lógico).
- `getUsuarioById(id_usuario)` → Consulta un usuario puntual.
- `getAllUsuario()` → Lista todos los usuarios.
- `getUsuarioByEmail(email)` → Consulta un usuario por email (para login).
- `getRolById(id_rol)` → Consulta el rol asignado a un usuario.

**Lógica de negocio**
- Maneja cuentas y roles.
- Solo admin puede asignar o cambiar roles.
- Base para autenticación (aunque el JWT vive en application).

---

## 🌿 PlantaPort
**Métodos**
- `createPlanta(planta)` → Crea una planta en la biblioteca (solo admin).
- `updatePlanta(id_planta, planta)` → Actualiza datos de la planta.
- `deactivatePlanta(id_planta)` → Desactiva una planta (soft delete).
- `getPlantaById(id_planta)` → Consulta una planta puntual.
- `getAllPlantas()` → Lista todas las plantas.

**Lógica de negocio**
- Biblioteca de plantas mantenida por admin.
- Plantas sirven como plantilla base para nuevos cultivos.
- Define condiciones ambientales, siembra, cosecha, asociaciones y plagas.

---

## 🌾 CultivoPort
**Métodos**
- `createCultivo(cultivo)` → Crea un cultivo para un usuario a partir de una planta.  
  (Debe disparar la creación automática de EtapaCultivo).
- `updateCultivo(id_cultivo, cultivo)` → Actualiza datos del cultivo (ej: nombre personalizado).
- `deleteCultivo(id_cultivo)` → Desactiva un cultivo (soft delete).
- `getCultivoById(id_cultivo)` → Consulta un cultivo puntual.
- `getUserCultivos(id_usuario)` → Lista cultivos de un usuario.
- *(Opcional)* `getAllCultivos()` → Lista todos los cultivos (solo admin/reportes).

**Lógica de negocio**
- Relaciona usuarios con plantas.
- Permite personalizar nombre y llevar seguimiento del cultivo.
- Al crear un cultivo, genera sus etapas (EtapaCultivo).

---

## ⏳ EtapaPort (Admin)
**Métodos**
- `getEtapasByPlanta(id_planta)` → Obtiene todas las etapas de una planta.
- `createEtapa(etapa)` → Crea una nueva etapa en la definición de la planta.
- `updateEtapa(id_etapa, etapa)` → Actualiza duración, nombre u orden de una etapa.
- `deleteEtapa(id_etapa)` → Elimina una etapa de la planta.

**Lógica de negocio**
- Define el ciclo de vida teórico de cada planta.
- Solo admin puede gestionarlas.
- Base para generar las EtapaCultivo de los usuarios.

---

## ⏳ EtapaCultivoPort (Usuario)
**Métodos**
- `createEtapasFromPlanta(id_cultivo, id_planta)` → Copia las etapas de la planta hacia el cultivo (se usa al crear un cultivo).
- `getEtapasByCultivo(id_cultivo)` → Lista las etapas de un cultivo (timeline).
- `getEtapaCultivoById(id_cultivo_etapa)` → Consulta una etapa puntual.
- `updateEtapaCultivo(id_cultivo_etapa, etapaCultivo)` → Actualiza el estado o fechas de una etapa (pendiente, en-progreso, completada).

**Lógica de negocio**
- Representa el ciclo real de un cultivo.
- Usuario solo actualiza progreso y fechas reales.
- No se crean ni borran manualmente.

---

## 📋 TareaPort
**Métodos**
- `createTarea(tarea)` → Crea una nueva tarea para un cultivo.
- `updateTarea(id_tarea, tarea)` → Actualiza tarea (ej: marcar completada, cambiar fecha).
- `deleteTarea(id_tarea)` → Desactiva tarea (soft delete).
- `getTareaById(id_tarea)` → Consulta una tarea puntual.
- `getCultivoTareas(id_cultivo)` → Lista todas las tareas de un cultivo.
- *(Opcional)* `getTareasByFecha(fecha)` → Lista tareas programadas para una fecha.

**Lógica de negocio**
- Manejo de actividades de cuidado de un cultivo.
- Permite recordatorios y seguimiento de acciones (riego, fertilización, etc.).
- Se conecta con notificaciones.

---

## 🔔 NotificacionPort
**Métodos**
- `createNotificacion(notificacion)` → Crea una notificación para un usuario.
- `markAsRead(id_notificacion)` → Marca una notificación como leída.
- *(Opcional)* `markAllAsRead(id_usuario)` → Marca todas las notificaciones de un usuario como leídas.
- `deleteNotificacion(id_notificacion)` → Desactiva notificación (soft delete).
- `getUserNotificaciones(id_usuario, onlyUnread?)` → Lista notificaciones de un usuario (con filtro de no leídas).

**Lógica de negocio**
- Mantiene informados a los usuarios sobre etapas, tareas y alertas.
- Base para la UX: notificaciones clicables con enlaces.
- Puede usarse para recordatorios automáticos.

---
