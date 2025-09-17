import { Repository } from "typeorm";
import { EtapaCultivoPort } from "../../domain/Etapa/EtapaCultivo/EtapaCultivoPort";
import { EtapaCultivo } from "../../domain/Etapa/EtapaCultivo/EtapaCultivo";
import { EtapaCultivoEntity, EstadoEtapaEnum } from "../entities/Etapa/EtapaCultivoEntity";
import { AppDataSource } from "../config/data-base";

export class EtapaCultivoAdapter implements EtapaCultivoPort {
  private repo: Repository<EtapaCultivoEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(EtapaCultivoEntity);
  }

  // Copiar etapas de planta a cultivo
  async createEtapasFromPlanta(id_cultivo: number, id_planta: number): Promise<boolean> {
    const etapaEntities = await AppDataSource.getRepository("EtapaEntity").find({
      where: { planta: { id_planta } },
    });

    const entities: EtapaCultivoEntity[] = [];

    for (const e of etapaEntities) {
      const entity = new EtapaCultivoEntity();
      entity.cultivo = { id_cultivo } as any;  // Cast para TypeORM
      entity.etapa = { id_etapa: e.id_etapa } as any;
      entity.fecha_inicio = new Date();
      entity.fecha_fin = new Date(); // inicializamos igual a fecha_inicio si quieres
      entity.estado = true;
      entity.estado_etapa = EstadoEtapaEnum.PENDIENTE;
      entities.push(entity);
    }

    await this.repo.save(entities);
    return true;
  }

  // Listar todas las etapas de un cultivo
  async getEtapasByCultivo(id_cultivo: number): Promise<EtapaCultivo[]> {
    const etapas = await this.repo.find({
      where: { cultivo: { id_cultivo } },
      relations: ["etapa", "cultivo"],
    });

    return etapas.map(e => ({
      id_cultivo_etapa: e.id_cultivo_etapa,
      id_cultivo: e.cultivo.id_cultivo,
      id_etapa: e.etapa.id_etapa,
      fecha_inicio: e.fecha_inicio.toISOString(),
      fecha_fin: e.fecha_fin ? e.fecha_fin.toISOString() : e.fecha_inicio.toISOString(),
      estado: e.estado,
      estado_etapa: e.estado_etapa, // ya es string compatible
    }));
  }

  // Obtener una etapa de cultivo por id
  async getEtapaCultivoById(id_cultivo_etapa: number): Promise<EtapaCultivo | null> {
    const e = await this.repo.findOne({
      where: { id_cultivo_etapa },
      relations: ["etapa", "cultivo"],
    });

    if (!e) return null;

    return {
      id_cultivo_etapa: e.id_cultivo_etapa,
      id_cultivo: e.cultivo.id_cultivo,
      id_etapa: e.etapa.id_etapa,
      fecha_inicio: e.fecha_inicio.toISOString(),
      fecha_fin: e.fecha_fin ? e.fecha_fin.toISOString() : e.fecha_inicio.toISOString(),
      estado: e.estado,
      estado_etapa: e.estado_etapa,
    };
  }

  // Actualizar etapa de cultivo
  async updateEtapaCultivo(
    id_cultivo_etapa: number,
    etapaCultivo: Partial<EtapaCultivo>
  ): Promise<boolean> {
    const entityUpdate: any = { ...etapaCultivo };

    if (etapaCultivo.id_cultivo) {
      entityUpdate.cultivo = { id_cultivo: etapaCultivo.id_cultivo } as any;
      delete entityUpdate.id_cultivo;
    }

    if (etapaCultivo.id_etapa) {
      entityUpdate.etapa = { id_etapa: etapaCultivo.id_etapa } as any;
      delete entityUpdate.id_etapa;
    }

    // Convertir fecha_fin de string a Date si viene
    if (etapaCultivo.fecha_fin) {
      entityUpdate.fecha_fin = new Date(etapaCultivo.fecha_fin);
    }

    if (etapaCultivo.fecha_inicio) {
      entityUpdate.fecha_inicio = new Date(etapaCultivo.fecha_inicio);
    }

    const result = await this.repo.update({ id_cultivo_etapa }, entityUpdate);
    return result.affected! > 0;
  }
}
