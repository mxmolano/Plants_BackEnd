import { Repository } from "typeorm";
import { PlantaPort } from "../../domain/Planta/PlantaPort";
import { Planta } from "../../domain/Planta/Planta";
import { PlantaEntity } from "../entities/Planta/PlantaEntity";

// Importar entidades de N:M
import { PlagaEntity } from "../entities/Planta/Referencia/PlagaEntity";
import { CultivoAsociadoEntity } from "../entities/Planta/Referencia/CultivoAsociadoEntity";
import { TipoContenedorEntity } from "../entities/Planta/Referencia/TipoContenedorEntity";

import { AppDataSource } from "../config/data-base";

export class PlantaAdapter implements PlantaPort {
  private repo: Repository<PlantaEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(PlantaEntity);
  }

  // Crear planta
  async createPlanta(planta: Omit<Planta, "id_planta">): Promise<number> {
    const entity = this.repo.create({
      nombre_planta: planta.nombre_planta,
      nombre_cientifico: planta.nombre_cientifico,
      descripcion_planta: planta.descripcion_planta,

      tipo_cultivo: { id_tipos_cultivo: planta.id_tipo_cultivo } as any,
      tipo_siembra: { id_tipo_siembra: planta.id_tipo_siembra } as any,
      temporada: { id_temporada: planta.id_temporada } as any,
      epoca: { id_epoca: planta.id_epoca } as any,

      clima: { id_clima: planta.id_clima } as any,
      resistencia_frio: { id_resistencia_frio: planta.id_resistencia_frio } as any,
      luz_solar: { id_luz_solar: planta.id_luz_solar } as any,

      plagas: planta.plagas.map(id => ({ id_plaga: id } as PlagaEntity)),
      cultivos_asociados: planta.cultivos_asociados.map(id => ({ id_cultivo_asociado: id } as CultivoAsociadoEntity)),
      contenedores: planta.contenedores.map(id => ({ id_tipo_de_contenedor: id } as TipoContenedorEntity)),

      descripcion_siembra: planta.descripcion_siembra,
      profundidad_siembra: planta.profundidad_siembra,
      distancia_siembra: planta.distancia_siembra,

      descripcion_mantenimiento: planta.descripcion_mantenimiento,
      dias_riego: planta.dias_riego,

      descripcion_cosecha: planta.descripcion_cosecha,
      tiempo_cosecha: planta.tiempo_cosecha,

      temperatura_mini: planta.temperatura_mini,
      temperatura_max: planta.temperatura_max,
      descripcion_cli_temp: planta.descripcion_cli_temp,

      estado: planta.estado,
    });

    const saved = await this.repo.save(entity);
    return saved.id_planta;
  }

  // Actualizar planta
  async updatePlanta(id_planta: number, planta: Partial<Planta>): Promise<boolean> {
    const entityUpdate: any = { ...planta };

    if (planta.id_tipo_cultivo) entityUpdate.tipo_cultivo = { id_tipos_cultivo: planta.id_tipo_cultivo } as any;
    if (planta.id_tipo_siembra) entityUpdate.tipo_siembra = { id_tipo_siembra: planta.id_tipo_siembra } as any;
    if (planta.id_temporada) entityUpdate.temporada = { id_temporada: planta.id_temporada } as any;
    if (planta.id_epoca) entityUpdate.epoca = { id_epoca: planta.id_epoca } as any;

    if (planta.id_clima) entityUpdate.clima = { id_clima: planta.id_clima } as any;
    if (planta.id_resistencia_frio) entityUpdate.resistencia_frio = { id_resistencia_frio: planta.id_resistencia_frio } as any;
    if (planta.id_luz_solar) entityUpdate.luz_solar = { id_luz_solar: planta.id_luz_solar } as any;

    if (planta.plagas) entityUpdate.plagas = planta.plagas.map(id => ({ id_plaga: id } as PlagaEntity));
    if (planta.cultivos_asociados) entityUpdate.cultivos_asociados = planta.cultivos_asociados.map(id => ({ id_cultivo_asociado: id } as CultivoAsociadoEntity));
    if (planta.contenedores) entityUpdate.contenedores = planta.contenedores.map(id => ({ id_tipo_de_contenedor: id } as TipoContenedorEntity));

    const result = await this.repo.update({ id_planta }, entityUpdate);
    return result.affected! > 0;
  }

  // Soft delete
  async deactivatePlanta(id_planta: number): Promise<boolean> {
    const result = await this.repo.update({ id_planta }, { estado: false });
    return result.affected! > 0;
  }

  // Obtener planta por id
  async getPlantaById(id_planta: number): Promise<Planta | null> {
    const p = await this.repo.findOne({
      where: { id_planta },
      relations: ["tipo_cultivo", "tipo_siembra", "temporada", "epoca", "clima", "resistencia_frio", "luz_solar", "plagas", "cultivos_asociados", "contenedores"],
    });

    if (!p) return null;

    return {
      id_planta: p.id_planta,
      nombre_planta: p.nombre_planta,
      nombre_cientifico: p.nombre_cientifico,
      descripcion_planta: p.descripcion_planta,

      id_tipo_cultivo: p.tipo_cultivo.id_tipos_cultivo,
      id_tipo_siembra: p.tipo_siembra.id_tipo_siembra,
      id_temporada: p.temporada.id_temporada,
      id_epoca: p.epoca.id_epoca,

      id_clima: p.clima.id_clima,
      id_resistencia_frio: p.resistencia_frio.id_resistencia_frio,
      id_luz_solar: p.luz_solar.id_luz_solar,

      plagas: p.plagas.map(pl => pl.id_plaga),
      cultivos_asociados: p.cultivos_asociados.map(ca => ca.id_cultivo_asociado),
      contenedores: p.contenedores.map(tc => tc.id_tipo_de_contenedor),

      descripcion_siembra: p.descripcion_siembra,
      profundidad_siembra: p.profundidad_siembra,
      distancia_siembra: p.distancia_siembra,

      descripcion_mantenimiento: p.descripcion_mantenimiento,
      dias_riego: p.dias_riego,

      descripcion_cosecha: p.descripcion_cosecha,
      tiempo_cosecha: p.tiempo_cosecha,

      temperatura_mini: p.temperatura_mini,
      temperatura_max: p.temperatura_max,
      descripcion_cli_temp: p.descripcion_cli_temp,

      estado: p.estado,
    };
  }

  // Buscar plantas por nombre
  async getPlantasByName(nombre: string): Promise<Planta[]> {
    const plantas = await this.repo
      .createQueryBuilder("planta")
      .where("planta.nombre_planta ILIKE :nombre", { nombre: `%${nombre}%` })
      .leftJoinAndSelect("planta.tipo_cultivo", "tipo_cultivo")
      .leftJoinAndSelect("planta.tipo_siembra", "tipo_siembra")
      .leftJoinAndSelect("planta.temporada", "temporada")
      .leftJoinAndSelect("planta.epoca", "epoca")
      .leftJoinAndSelect("planta.clima", "clima")
      .leftJoinAndSelect("planta.resistencia_frio", "resistencia_frio")
      .leftJoinAndSelect("planta.luz_solar", "luz_solar")
      .leftJoinAndSelect("planta.plagas", "plagas")
      .leftJoinAndSelect("planta.cultivos_asociados", "cultivos_asociados")
      .leftJoinAndSelect("planta.contenedores", "contenedores")
      .getMany();

    return plantas.map(p => ({
      id_planta: p.id_planta,
      nombre_planta: p.nombre_planta,
      nombre_cientifico: p.nombre_cientifico,
      descripcion_planta: p.descripcion_planta,

      id_tipo_cultivo: p.tipo_cultivo.id_tipos_cultivo,
      id_tipo_siembra: p.tipo_siembra.id_tipo_siembra,
      id_temporada: p.temporada.id_temporada,
      id_epoca: p.epoca.id_epoca,

      id_clima: p.clima.id_clima,
      id_resistencia_frio: p.resistencia_frio.id_resistencia_frio,
      id_luz_solar: p.luz_solar.id_luz_solar,

      plagas: p.plagas.map(pl => pl.id_plaga),
      cultivos_asociados: p.cultivos_asociados.map(ca => ca.id_cultivo_asociado),
      contenedores: p.contenedores.map(tc => tc.id_tipo_de_contenedor),

      descripcion_siembra: p.descripcion_siembra,
      profundidad_siembra: p.profundidad_siembra,
      distancia_siembra: p.distancia_siembra,

      descripcion_mantenimiento: p.descripcion_mantenimiento,
      dias_riego: p.dias_riego,

      descripcion_cosecha: p.descripcion_cosecha,
      tiempo_cosecha: p.tiempo_cosecha,

      temperatura_mini: p.temperatura_mini,
      temperatura_max: p.temperatura_max,
      descripcion_cli_temp: p.descripcion_cli_temp,

      estado: p.estado,
    }));
  }

  // Listar todas las plantas
  async getAllPlantas(): Promise<Planta[]> {
    const plantas = await this.repo.find({
      relations: ["tipo_cultivo", "tipo_siembra", "temporada", "epoca", "clima", "resistencia_frio", "luz_solar", "plagas", "cultivos_asociados", "contenedores"],
    });

    return plantas.map(p => ({
      id_planta: p.id_planta,
      nombre_planta: p.nombre_planta,
      nombre_cientifico: p.nombre_cientifico,
      descripcion_planta: p.descripcion_planta,

      id_tipo_cultivo: p.tipo_cultivo.id_tipos_cultivo,
      id_tipo_siembra: p.tipo_siembra.id_tipo_siembra,
      id_temporada: p.temporada.id_temporada,
      id_epoca: p.epoca.id_epoca,

      id_clima: p.clima.id_clima,
      id_resistencia_frio: p.resistencia_frio.id_resistencia_frio,
      id_luz_solar: p.luz_solar.id_luz_solar,

      plagas: p.plagas.map(pl => pl.id_plaga),
      cultivos_asociados: p.cultivos_asociados.map(ca => ca.id_cultivo_asociado),
      contenedores: p.contenedores.map(tc => tc.id_tipo_de_contenedor),

      descripcion_siembra: p.descripcion_siembra,
      profundidad_siembra: p.profundidad_siembra,
      distancia_siembra: p.distancia_siembra,

      descripcion_mantenimiento: p.descripcion_mantenimiento,
      dias_riego: p.dias_riego,

      descripcion_cosecha: p.descripcion_cosecha,
      tiempo_cosecha: p.tiempo_cosecha,

      temperatura_mini: p.temperatura_mini,
      temperatura_max: p.temperatura_max,
      descripcion_cli_temp: p.descripcion_cli_temp,

      estado: p.estado,
    }));
  }
}
