import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user/UserEntity";
import { UsuarioEntity } from "../entities/usuario/UsuarioEntity";
import { RolEntity } from "../entities/usuario/RolEntity";
import { CultivoEntity } from "../entities/Cultivo/CultivoEntity";
import { EtapaEntity } from "../entities/Etapa/EtapaEntity";
import { EtapaCultivoEntity } from "../entities/Etapa/EtapaCultivoEntity";
import { NotificacionEntity } from "../entities/Notificacion/NotificacionEntity";
import { PlantaEntity } from "../entities/Planta/PlantaEntity";
import { TareaEntity } from "../entities/Tarea/TareaEntity";

// Referencias (Plantas Referencia)
import { ClimaEntity } from "../entities/Planta/Referencia/ClimaEntity";
import { CultivoAsociadoEntity } from "../entities/Planta/Referencia/CultivoAsociadoEntity";
import { EpocaEntity } from "../entities/Planta/Referencia/EpocaEntity ";
import { LuzSolarEntity } from "../entities/Planta/Referencia/LuzSolarEntity ";
import { PlagaEntity } from "../entities/Planta/Referencia//PlagaEntity";
import { ResistenciaFrioEntity } from "../entities/Planta/Referencia/ResistenciaFrioEntity";
import { TemporadaEntity } from "../entities/Planta/Referencia/TemporadaEntity";
import { TipoContenedorEntity } from "../entities/Planta/Referencia/TipoContenedorEntity";
import { TipoCultivoEntity } from "../entities/Planta/Referencia/TipoCultivoEntity";
import { TipoSiembraEntity } from "../entities/Planta/Referencia/TipoSiembraEntity";

import envs from "../config/environment-vars";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(envs.DB_PORT),
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  schema: envs.DB_SCHEMA,
  synchronize: true, 
  logging: false,
  entities: [
    UserEntity,
    UsuarioEntity,
    RolEntity,
    CultivoEntity,
    EtapaEntity,
    EtapaCultivoEntity,
    NotificacionEntity,
    TareaEntity,
    PlantaEntity,
    ClimaEntity,
    CultivoAsociadoEntity,
    EpocaEntity,
    LuzSolarEntity,
    PlagaEntity,
    ResistenciaFrioEntity,
    TemporadaEntity,
    TipoContenedorEntity,
    TipoCultivoEntity,
    TipoSiembraEntity,
  ],
});

// Conexión
export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to the database", error);
    process.exit(1);
  }
};