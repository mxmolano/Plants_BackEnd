¡Perfecto! 😄 Te preparé una **versión final completa del README**, lista para tu proyecto, que incluye **Domains, Ports, ApplicationServices**, instalación, stack, características, y con la lógica de negocio bien explicada. Además agregué una sección final con **diagramas ASCII simples** para mostrar la relación entre capas, manteniendo todo profesional y legible.

---

# 🌱 Mi Huerta - Backend

Backend desarrollado en **Node.js + Express + TypeScript** con **arquitectura hexagonal**, para gestionar usuarios, plantas, cultivos, etapas, tareas y notificaciones.

---

## 🚀 Características

* Autenticación **JWT**.
* Base de datos **PostgreSQL**.
* Gestión completa de **usuarios, plantas, cultivos, tareas, etapas y notificaciones**.
* **Arquitectura hexagonal** con separación de capas (**domain**, **application**, **infrastructure**).
* Soporte para **despliegue con Docker**.

---

## 🔧 Instalación

```bash
git clone https://github.com/tuusuario/mi-huerta-backend.git
cd mi-huerta-backend
npm install
cp .env
npm run dev
```

---

## 📦 Stack

* **Node.js + Express**
* **TypeScript**
* **PostgreSQL**
* **JWT** (autenticación)
* **Docker** (opcional)

---

# 🌱 Resumen de Domains y Ports

Cada **Domain** define la estructura de datos y reglas de negocio fundamentales.
Cada **Port** define la interfaz para acceder a esos datos, permitiendo que los **ApplicationServices** sean independientes de la infraestructura.

---

## 👤 Usuario (Domain + Port)

**Domain:**

* `Usuario`: nombre, email, contraseña, estado, rol.
* `Rol`: tipo de usuario (admin o usuario normal).

**Port:** `UsuarioPort`

* Métodos: `createUsuario`, `updateUsuario`, `deleteUsuario`, `getUsuarioById`, `getAllUsuario`, `getUsuarioByEmail`, `getRolById`.

**Lógica de negocio:**

* Admin controla la creación, actualización y asignación de roles.
* Base para autenticación mediante JWT.
* Seguridad de contraseñas con bcrypt.
* Validaciones de existencia antes de actualizar o eliminar.

---

## 🌿 Planta (Domain + Port)

**Domain:**

* `Planta`: nombre, nombre científico, descripción, siembra, cosecha, asociaciones y plagas.
* Referencias: climas, tipos de cultivo, temporadas, epocas, luz solar, resistencias al frío, contenedores, plagas y cultivos asociados.

**Port:**

* `PlantaPort`: CRUD de plantas.
* `ReferenciaPort`: Consultas de referencias (climas, tipos, plagas, contenedores).

**Lógica de negocio:**

* Solo admin puede crear, actualizar o desactivar plantas.
* Biblioteca base para cultivos de usuarios.
* Contiene toda la información de siembra, cosecha y mantenimiento.

---

## 🌾 Cultivo (Domain + Port)

**Domain:**

* `Cultivo`: Relación usuario-planta con nombre personalizado, fecha de inicio y estado.

**Port:** `CultivoPort`

* CRUD de cultivos y consultas por usuario.

**Lógica de negocio:**

* Permite seguimiento completo del ciclo del cultivo.
* Al crear un cultivo, se generan automáticamente las etapas (`EtapaCultivo`).
* Valida fechas y personalización de nombre.

---

## ⏳ Etapa (Domain + Port)

**Domain:**

* `Etapa`: Fases teóricas de crecimiento de la planta: nombre, duración y orden.

**Port:** `EtapaPort`

* CRUD de etapas: `getEtapasByPlanta`, `createEtapa`, `updateEtapa`, `deleteEtapa`.

**Lógica de negocio:**

* Solo admin puede gestionar etapas.
* Sirve como base para generar etapas reales (`EtapaCultivo`).

---

## ⏳ EtapaCultivo (Domain + Port)

**Domain:**

* `EtapaCultivo`: Etapa real de un cultivo con fechas, estado y progreso.

**Port:** `EtapaCultivoPort`

* Métodos: `createEtapasFromPlanta`, `getEtapasByCultivo`, `getEtapaCultivoById`, `updateEtapaCultivo`.

**Lógica de negocio:**

* Usuario solo actualiza estado y fechas reales.
* No se crean ni eliminan manualmente.
* Representa el ciclo real del cultivo.

---

## 📋 Tarea (Domain + Port)

**Domain:**

* `Tarea`: Actividades de cuidado de cultivo con título, descripción, fecha programada, estado y completada.

**Port:** `TareaPort`

* CRUD y consultas: `createTarea`, `updateTarea`, `deleteTarea`, `getTareaById`, `getCultivoTareas`, `getTareasByFecha`.

**Lógica de negocio:**

* Permite gestionar riego, fertilización, mantenimiento y recordatorios.
* Conexión con notificaciones.
* Validación de fechas programadas antes de crear o actualizar.

---

## 🔔 Notificación (Domain + Port)

**Domain:**

* `Notificacion`: Mensajes para usuarios con texto, tipo, enlace, estado y visto.

**Port:** `NotificacionPort`

* CRUD y consultas: `createNotificacion`, `markAsRead`, `markAllAsRead`, `deleteNotificacion`, `getUserNotificaciones`.

**Lógica de negocio:**

* Mantiene a los usuarios informados sobre etapas, tareas y alertas.
* Permite marcar como leídas individual o todas.
* Base para UX de notificaciones clicables.

---

# 📝 Resumen de ApplicationServices

Cada ApplicationService aplica la **lógica de negocio** usando los ports:

* Validación de existencia antes de `update`/`delete`.
* `throw new Error` si no existe el recurso.
* Logs `[CREATE]`, `[UPDATE]`, `[DELETE]`, `[GET]`.
* Independientes de infraestructura (DB/HTTP).

---

### 1️⃣ UsuarioApplicationService

* Gestiona usuarios, roles y autenticación.
* Métodos: `login`, `createUsuario`, `updateUsuario`, `deleteUsuario`, `getUsuarioById`, `getUsuarioByEmail`, `getAllUsuarios`.
* Admin puede asignar roles.
* Seguridad con bcrypt y JWT.
* Validaciones de existencia y logs.

---

### 2️⃣ PlantaApplicationService

* Administra biblioteca de plantas y sus referencias.
* Métodos: `createPlanta`, `updatePlanta`, `deactivatePlanta`, `getPlantaById`, `getPlantasByName`, `getAllPlantas`, `getReferenciasCompletas`.
* Solo admin puede modificar plantas.
* Permite consultar referencias de climas, tipos de cultivo, plagas y contenedores.

---

### 3️⃣ CultivoApplicationService

* Gestiona cultivos de usuarios y seguimiento.
* Métodos: `createCultivo`, `updateCultivo`, `deleteCultivoById`, `getCultivoById`, `getUserCultivos`.
* Valida fechas y genera automáticamente las etapas (`EtapaCultivo`).

---

### 4️⃣ EtapaApplicationService

* Gestiona ciclo teórico de plantas.
* Métodos: `createEtapa`, `updateEtapa`, `deleteEtapa`, `getEtapasByPlanta`.
* Base para generar etapas reales de los cultivos (`EtapaCultivo`).

---

### 5️⃣ EtapaCultivoApplicationService

* Representa ciclo real del cultivo del usuario.
* Métodos: `createEtapasFromPlanta`, `updateEtapaCultivo`, `deleteEtapaCultivoById`, `getEtapaCultivoById`, `getEtapasByCultivo`.
* Usuario solo actualiza estado y fechas.

---

### 6️⃣ TareaApplicationService

* Gestiona tareas de cuidado del cultivo.
* Métodos: `createTarea`, `updateTarea`, `deleteTareaById`, `getTareaById`, `getCultivoTareas`, `getTareasByFecha`.
* Valida fecha programada antes de crear o actualizar.
* Se conecta con notificaciones para recordatorios.

---

### 7️⃣ NotificacionApplicationService

* Mantiene informado al usuario sobre tareas, etapas y alertas.
* Métodos: `createNotificacion`, `markAsRead`, `markAllAsRead`, `deleteNotificacion`, `getUserNotificaciones`.
* Validaciones de existencia filtrando array devuelto por `getUserNotificaciones`.
* Logs consistentes para seguimiento.

---

## ✅ Resumen general

* Todos los ApplicationServices siguen el patrón de la profesora (`UserApplicationService`).
* Validaciones antes de update/delete con `throw new Error`.
* Logs `[CREATE]`, `[UPDATE]`, `[DELETE]`, `[GET]`.
* Arquitectura hexagonal respetada.
* Ports de Etapa y Notificación se mantienen intactos para evitar errores.

---

## 🗂 Diagrama de Arquitectura (ASCII)

``` mermaid
graph TD
    subgraph Domain
        Usuario[Usuario]
        Rol[Rol]
        Planta[Planta]
        Referencias[Referencias]
        Cultivo[Cultivo]
        Etapa[Etapa]
        EtapaCultivo[EtapaCultivo]
        Tarea[Tarea]
        Notificacion[Notificación]
    end

    subgraph Ports
        UsuarioPort[UsuarioPort]
        PlantaPort[PlantaPort]
        ReferenciaPort[ReferenciaPort]
        CultivoPort[CultivoPort]
        EtapaPort[EtapaPort]
        EtapaCultivoPort[EtapaCultivoPort]
        TareaPort[TareaPort]
        NotificacionPort[NotificacionPort]
    end

    subgraph ApplicationService
        UsuarioApp[UsuarioApplicationService]
        PlantaApp[PlantaApplicationService]
        CultivoApp[CultivoApplicationService]
        EtapaApp[EtapaApplicationService]
        EtapaCultivoApp[EtapaCultivoApplicationService]
        TareaApp[TareaApplicationService]
        NotificacionApp[NotificacionApplicationService]
    end

    subgraph Infrastructure
        DB[(PostgreSQL)]
        Repositorios[Repositorios]
        API[API REST / Controllers]
    end

    %% Relaciones Domain -> Ports
    Usuario --> UsuarioPort
    Rol --> UsuarioPort
    Planta --> PlantaPort
    Referencias --> ReferenciaPort
    Cultivo --> CultivoPort
    Etapa --> EtapaPort
    EtapaCultivo --> EtapaCultivoPort
    Tarea --> TareaPort
    Notificacion --> NotificacionPort

    %% Relaciones Ports -> Application
    UsuarioPort --> UsuarioApp
    PlantaPort --> PlantaApp
    ReferenciaPort --> PlantaApp
    CultivoPort --> CultivoApp
    EtapaPort --> EtapaApp
    EtapaCultivoPort --> EtapaCultivoApp
    TareaPort --> TareaApp
    NotificacionPort --> NotificacionApp

    %% Relaciones Application -> Infrastructure
    UsuarioApp --> Repositorios
    PlantaApp --> Repositorios
    CultivoApp --> Repositorios
    EtapaApp --> Repositorios
    EtapaCultivoApp --> Repositorios
    TareaApp --> Repositorios
    NotificacionApp --> Repositorios

    Repositorios --> DB
    API --> ApplicationService
```
