import { AppDataSource } from "../config/data-base";
import { ClimaEntity } from "../entities/Planta/Referencia/ClimaEntity";
import { TipoCultivoEntity } from "../entities/Planta/Referencia/TipoCultivoEntity";
import { TemporadaEntity } from "../entities/Planta/Referencia/TemporadaEntity";
import { EpocaEntity } from "../entities/Planta/Referencia/EpocaEntity ";
import { TipoSiembraEntity } from "../entities/Planta/Referencia/TipoSiembraEntity";
import { ResistenciaFrioEntity } from "../entities/Planta/Referencia/ResistenciaFrioEntity";
import { LuzSolarEntity } from "../entities/Planta/Referencia/LuzSolarEntity ";
import { PlagaEntity } from "../entities/Planta/Referencia/PlagaEntity";
import { CultivoAsociadoEntity } from "../entities/Planta/Referencia/CultivoAsociadoEntity";
import { TipoContenedorEntity } from "../entities/Planta/Referencia/TipoContenedorEntity";

import { Clima, TipoCultivo, Temporada, Epoca, TipoSiembra, ResistenciaFrio, LuzSolar, Plaga, CultivoAsociado, TipoContenedor } from "../../domain/Planta/ReferenciasPort";

export class ReferenciaAdapter {
  async getClimas(): Promise<Clima[]> {
    const entities = await AppDataSource.getRepository(ClimaEntity).find();
    return entities.map(e => ({ id_clima: e.id_clima, nombre: e.nombre, descripcion: e.descripcion }));
  }

  async getTiposCultivo(): Promise<TipoCultivo[]> {
    const entities = await AppDataSource.getRepository(TipoCultivoEntity).find();
    return entities.map(e => ({ id_tipos_cultivo: e.id_tipos_cultivo, nombre: e.nombre, descripcion: e.descripcion }));
  }

  async getTemporadas(): Promise<Temporada[]> {
    const entities = await AppDataSource.getRepository(TemporadaEntity).find();
    return entities.map(e => ({ id_temporada: e.id_temporada, nombre: e.nombre, descripcion: e.descripcion, tipo: e.tipo }));
  }

  async getEpocas(): Promise<Epoca[]> {
    const entities = await AppDataSource.getRepository(EpocaEntity).find();
    return entities.map(e => ({ id_epoca: e.id_epoca, nombre: e.nombre, descripcion: e.descripcion, tipo: e.tipo }));
  }

  async getTiposSiembra(): Promise<TipoSiembra[]> {
    const entities = await AppDataSource.getRepository(TipoSiembraEntity).find();
    return entities.map(e => ({ id_tipo_siembra: e.id_tipo_siembra, nombre: e.nombre, descripcion: e.descripcion }));
  }

  async getResistenciasFrio(): Promise<ResistenciaFrio[]> {
    const entities = await AppDataSource.getRepository(ResistenciaFrioEntity).find();
    return entities.map(e => ({ id_resistencia_frio: e.id_resistencia_frio, nombre: e.nombre, descripcion: e.descripcion }));
  }

  async getLuzSolar(): Promise<LuzSolar[]> {
    const entities = await AppDataSource.getRepository(LuzSolarEntity).find();
    return entities.map(e => ({ id_luz_solar: e.id_luz_solar, nombre: e.nombre, descripcion: e.descripcion }));
  }

  async getPlagas(): Promise<Plaga[]> {
    const entities = await AppDataSource.getRepository(PlagaEntity).find();
    return entities.map(e => ({ id_plaga: e.id_plaga, nombre: e.nombre }));
  }

  async getCultivosAsociados(): Promise<CultivoAsociado[]> {
    const entities = await AppDataSource.getRepository(CultivoAsociadoEntity).find();
    return entities.map(e => ({ id_cultivo_asociado: e.id_cultivo_asociado, nombre: e.nombre, tipo: e.tipo }));
  }

  async getTiposContenedores(): Promise<TipoContenedor[]> {
    const entities = await AppDataSource.getRepository(TipoContenedorEntity).find();
    return entities.map(e => ({ id_tipo_de_contenedor: e.id_tipo_de_contenedor, nombre: e.nombre }));
  }
}
