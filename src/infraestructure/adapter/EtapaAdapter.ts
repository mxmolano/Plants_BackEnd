import { Repository } from "typeorm";
import { EtapaPort } from "../../domain/Etapa/EtapaPort";
import { Etapa } from "../../domain/Etapa/Etapa";
import { EtapaEntity } from "../entities/Etapa/EtapaEntity";
import { AppDataSource } from "../config/data-base";

export class EtapaAdapter implements EtapaPort {
  private repo: Repository<EtapaEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(EtapaEntity);
  }

  // Crear una nueva etapa
  async createEtapa(etapa: Omit<Etapa, "id_etapa">): Promise<number> {
    const entity = this.repo.create({
      nombre_etapa: etapa.nombre_etapa,
      duracion_dias: etapa.duracion_dias,
      orden: etapa.orden,
      planta: { id_planta: etapa.id_planta }, // asignamos la planta por id
    });
    const saved = await this.repo.save(entity);
    return saved.id_etapa;
  }

  // Actualizar etapa
  async updateEtapa(id_etapa: number, etapa: Partial<Etapa>): Promise<boolean> {
    const entityUpdate: any = { ...etapa };
    if (etapa.id_planta) {
      entityUpdate.planta = { id_planta: etapa.id_planta };
      delete entityUpdate.id_planta;
    }
    const result = await this.repo.update({ id_etapa }, entityUpdate);
    return result.affected! > 0;
  }

  // Eliminar etapa
  async deleteEtapa(id_etapa: number): Promise<boolean> {
    const result = await this.repo.delete({ id_etapa });
    return result.affected! > 0;
  }

  // Listar etapas por planta
  async getEtapasByPlanta(id_planta: number): Promise<Etapa[]> {
    const etapas = await this.repo.find({
      where: { planta: { id_planta } },
      relations: ["planta"],
    });

    // Mapear cada entity a domain object
    return etapas.map(e => ({
      id_etapa: e.id_etapa,
      id_planta: e.planta.id_planta,
      nombre_etapa: e.nombre_etapa,
      duracion_dias: e.duracion_dias,
      orden: e.orden,
    }));
  }
}
