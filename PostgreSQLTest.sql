-- ==========================================================
-- DATOS DE REFERENCIA MI HUERTA
-- ==========================================================

-- 1️⃣ Roles
INSERT INTO roles (nombre_rol) VALUES
('Administrador'),
('Usuario');

-- 2️⃣ Tipos de cultivo
INSERT INTO tipos_cultivo (nombre, descripcion) VALUES
('Cereales', 'Cultivos de granos como trigo, arroz y maíz'),
('Leguminosas', 'Plantas que producen frutos en vaina como frijoles y lentejas'),
('Oleaginosas', 'Cultivos para extracción de aceite como girasol y soja'),
('Hortalizas', 'Plantas de hojas, tallos o frutos comestibles como lechuga, tomate, pimiento'),
('Frutales', 'Plantas que producen frutas comestibles como mango, fresa, plátano'),
('Raíces y Tubérculos', 'Plantas cuya raíz o tubérculo es comestible como zanahoria, papa, remolacha'),
('Ornamentales', 'Plantas cultivadas por estética, flores o arbustos decorativos'),
('Aromáticas y Medicinales', 'Hierbas y plantas con aroma o propiedades medicinales como menta, romero, aloe'),
('Suculentas y Cactus', 'Plantas resistentes a sequía y fáciles de mantener en interiores'),
('Bonsái', 'Árboles en miniatura para decoración o colección'),
('Hidropónico', 'Plantas cultivadas en agua con nutrientes, sin suelo');

-- 3️⃣ Tipos de siembra
INSERT INTO tipos_siembra (nombre, descripcion) VALUES
('Almacigo', 'Siembra en semillero para trasplante posterior'),
('Directa', 'Siembra directa en maceta o terreno'),
('Hidropónica', 'Siembra en solución nutritiva sin tierra'),
('Injerto/Trasplante', 'Trasplante de esquejes o injertos');

-- 4️⃣ Climas
INSERT INTO climas (nombre, descripcion) VALUES
('Tropical','Clima cálido y húmedo durante todo el año'),
('Templado','Clima moderado, sin extremos'),
('Frío','Clima con bajas temperaturas, posibles heladas'),
('Árido','Clima seco con poca lluvia'),
('Mediterráneo','Clima templado con veranos cálidos y secos'),
('Subtropical','Clima cálido con humedad moderada');

-- 5️⃣ Luz solar
INSERT INTO luz_solar (nombre, descripcion) VALUES
('Sombra','Zona sin sol directo'),
('Media luz / sombra parcial','Luz indirecta o sol parcial'),
('Sol directo','Sol directo varias horas al día'),
('Pleno sol / exterior','Exposición completa al sol');

-- 6️⃣ Resistencia al frío
INSERT INTO resistencia_frio (nombre, descripcion) VALUES
('Baja','No tolera temperaturas bajas'),
('Media','Puede soportar frío moderado'),
('Alta','Tolerante a bajas temperaturas'),
('Muy alta','Resistente a heladas y climas fríos extremos');

-- 7️⃣ Temporadas
INSERT INTO temporadas (nombre, descripcion, tipo) VALUES
('Primavera','Temporada para siembra o cosecha de primavera','siembra'),
('Verano','Temporada para siembra o cosecha de verano','siembra'),
('Otoño','Temporada para siembra o cosecha de otoño','siembra'),
('Invierno','Temporada para siembra o cosecha de invierno','siembra');

-- 8️⃣ Épocas
INSERT INTO epocas (nombre, descripcion, tipo) VALUES
('Siembra temprana','Comienzo de la temporada de siembra','siembra'),
('Siembra media','Mitad de la temporada de siembra','siembra'),
('Siembra tardía','Final de la temporada de siembra','siembra'),
('Cosecha inicial','Inicio de la cosecha','cosecha'),
('Cosecha media','Mitad de la cosecha','cosecha'),
('Cosecha final','Final de la cosecha','cosecha');

-- 9️⃣ Plagas
INSERT INTO plagas (nombre) VALUES
('Pulgón'),
('Mosca blanca'),
('Araña roja'),
('Cochinilla'),
('Trips'),
('Caracoles / babosas');

-- 🔟 Tipos de contenedor
INSERT INTO tipos_de_contenedor (nombre) VALUES
('Maceta pequeña'),
('Maceta mediana'),
('Maceta grande'),
('Jardín vertical'),
('Bandeja de germinación'),
('Huerto en cajones / mesas de cultivo'),
('Hidropónico casero'),
('Invernadero mini'),
('Huerto móvil en macetas o jardineras');

-- 11️⃣ Cultivos asociados - Beneficiosos
INSERT INTO cultivos_asociados (nombre, tipo) VALUES
('Tomate + Albahaca','beneficioso'),
('Zanahoria + Cebolla','beneficioso'),
('Lechuga + Rábano','beneficioso'),
('Pepino + Maíz','beneficioso');

-- 12️⃣ Cultivos asociados - Perjudiciales
INSERT INTO cultivos_asociados (nombre, tipo) VALUES
('Papa + Tomate','perjudicial'),
('Lechuga + Perejil','perjudicial'),
('Cebolla + Frijol','perjudicial');

