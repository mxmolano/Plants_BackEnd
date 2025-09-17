-- ==========================================================
-- BASE DE DATOS MI HUERTA - CREACIÓN DE TABLAS
-- PostgreSQL
-- ==========================================================

-- Crear esquema opcional
CREATE SCHEMA IF NOT EXISTS horticultura;
SET search_path TO horticultura;

-- ==========================================================
-- TABLAS DE REFERENCIA
-- ==========================================================

-- Tipos de cultivo
CREATE TABLE tipos_cultivo (
    id_tipos_cultivo SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT
);

-- Tipos de siembra
CREATE TABLE tipos_siembra (
    id_tipo_siembra SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT
);

-- Climas
CREATE TABLE climas (
    id_clima SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT
);

-- Resistencia al frío
CREATE TABLE resistencia_frio (
    id_resistencia_frio SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT
);

-- Luz solar
CREATE TABLE luz_solar (
    id_luz_solar SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT
);

-- Plagas
CREATE TABLE plagas (
    id_plaga SERIAL PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Cultivos asociados
CREATE TABLE cultivos_asociados (
    id_cultivo_asociado SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('beneficioso', 'perjudicial'))
);

-- Tipos de contenedor
CREATE TABLE tipos_de_contenedor (
    id_tipo_de_contenedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Temporadas
CREATE TABLE temporadas (
    id_temporada SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('siembra', 'cosecha'))
);

-- Épocas
CREATE TABLE epocas (
    id_epoca SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('siembra', 'cosecha'))
);

-- ==========================================================
-- TABLAS DE USUARIO
-- ==========================================================

-- Roles
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) UNIQUE NOT NULL
);

-- Usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- ==========================================================
-- TABLA PRINCIPAL PLANTAS
-- ==========================================================

CREATE TABLE plantas (
    id_planta SERIAL PRIMARY KEY,
    descripcion_planta TEXT,
    nombre_planta VARCHAR(255) NOT NULL,
    nombre_cientifico VARCHAR(255),
    id_tipo_cultivo INT,
    descripcion_siembra TEXT,
    id_temporada INT,
    id_epoca INT,
    id_tipo_siembra INT,
    profundidad_siembra VARCHAR(50),
    distancia_siembra VARCHAR(50),
    descripcion_cli_temp TEXT,
    id_clima INT,
    id_resistencia_frio INT,
    temperatura_max DECIMAL(5,2),
    temperatura_mini DECIMAL(5,2),
    descripcion_mantenimiento TEXT,
    dias_riego INT,
    id_luz_solar INT,
    descripcion_cosecha TEXT,
    tiempo_cosecha VARCHAR(100),
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_tipo_cultivo) REFERENCES tipos_cultivo(id_tipos_cultivo),
    FOREIGN KEY (id_temporada) REFERENCES temporadas(id_temporada),
    FOREIGN KEY (id_epoca) REFERENCES epocas(id_epoca),
    FOREIGN KEY (id_tipo_siembra) REFERENCES tipos_siembra(id_tipo_siembra),
    FOREIGN KEY (id_clima) REFERENCES climas(id_clima),
    FOREIGN KEY (id_resistencia_frio) REFERENCES resistencia_frio(id_resistencia_frio),
    FOREIGN KEY (id_luz_solar) REFERENCES luz_solar(id_luz_solar)
);

-- ==========================================================
-- TABLAS DE RELACIÓN MUCHOS A MUCHOS
-- ==========================================================

-- Plantas - Plagas
CREATE TABLE plantas_plagas (
    id_planta INT,
    id_plaga INT,
    PRIMARY KEY (id_planta, id_plaga),
    FOREIGN KEY (id_planta) REFERENCES plantas(id_planta) ON DELETE CASCADE,
    FOREIGN KEY (id_plaga) REFERENCES plagas(id_plaga) ON DELETE CASCADE
);

-- Plantas - Cultivos asociados
CREATE TABLE plantas_cultivos_asociados (
    id_planta INT,
    id_cultivo_asociado INT,
    PRIMARY KEY (id_planta, id_cultivo_asociado),
    FOREIGN KEY (id_planta) REFERENCES plantas(id_planta) ON DELETE CASCADE,
    FOREIGN KEY (id_cultivo_asociado) REFERENCES cultivos_asociados(id_cultivo_asociado) ON DELETE CASCADE
);

-- Plantas - Contenedores
CREATE TABLE plantas_contenedores (
    id_planta INT,
    id_tipo_de_contenedor INT,
    PRIMARY KEY (id_planta, id_tipo_de_contenedor),
    FOREIGN KEY (id_planta) REFERENCES plantas(id_planta) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo_de_contenedor) REFERENCES tipos_de_contenedor(id_tipo_de_contenedor) ON DELETE CASCADE
);

-- ==========================================================
-- TABLAS DE GESTIÓN DE CULTIVOS
-- ==========================================================

-- Cultivos
CREATE TABLE cultivos (
    id_cultivo SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_planta INT NOT NULL,
    nombre_personalizado VARCHAR(150) NOT NULL,
    fecha_inicio DATE NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_planta) REFERENCES plantas(id_planta) ON DELETE CASCADE
);

-- Tareas
CREATE TABLE tareas (
    id_tarea SERIAL PRIMARY KEY,
    id_cultivo INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_programada DATE NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    completada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_cultivo) REFERENCES cultivos(id_cultivo) ON DELETE CASCADE
);

-- Notificaciones
CREATE TABLE notificaciones (
    id_notificacion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    mensaje TEXT NOT NULL,
    tipo VARCHAR(50),
    estado BOOLEAN DEFAULT TRUE,
    visto BOOLEAN DEFAULT FALSE,
    enlace VARCHAR(255),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- ==========================================================
-- GESTIÓN DE ETAPAS
-- ==========================================================

CREATE TABLE etapas (
    id_etapa SERIAL PRIMARY KEY,
    id_planta INT NOT NULL,
    nombre_etapa VARCHAR(100) NOT NULL,
    duracion_dias INT NOT NULL,
    orden INT NOT NULL,
    UNIQUE (id_planta, orden),
    FOREIGN KEY (id_planta) REFERENCES plantas(id_planta) ON DELETE CASCADE
);

-- Tipo ENUM
CREATE TYPE estado_etapa_enum AS ENUM ('pendiente', 'en-progreso', 'completada');

-- Cultivos - Etapas
CREATE TABLE cultivos_etapas (
    id_cultivo_estapa SERIAL PRIMARY KEY,
    id_cultivo INT NOT NULL,
    id_etapa INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    estado BOOLEAN DEFAULT TRUE,
    estado_etapa estado_etapa_enum DEFAULT 'pendiente',
    FOREIGN KEY (id_cultivo) REFERENCES cultivos(id_cultivo) ON DELETE CASCADE,
    FOREIGN KEY (id_etapa) REFERENCES etapas(id_etapa) ON DELETE CASCADE
);
