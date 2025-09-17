import { Repository } from "typeorm";
import { CultivoPort } from "../../domain/Cultivo/CultivoPort";
import { Cultivo } from "../../domain/Cultivo/Cultivo";
import { CultivoEntity } from "../entities/Cultivo/CultivoEntity";
import { AppDataSource } from "../config/data-base";

export class CultivoAdapter implements CultivoPort {
  private repo: Repository<CultivoEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(CultivoEntity);
  }

  async createCultivo(cultivo: Omit<Cultivo, "id_cultivo">): Promise<number> {
    const entity = this.repo.create(cultivo);
    const saved = await this.repo.save(entity);
    return saved.id_cultivo;
  }

  async updateCultivo(id_cultivo: number, cultivo: Partial<Cultivo>): Promise<boolean> {
    const result = await this.repo.update({ id_cultivo }, cultivo);
    return result.affected! > 0;
  }

  async deleteCultivo(id_cultivo: number): Promise<boolean> {
    const result = await this.repo.update({ id_cultivo }, { estado: false });
    return result.affected! > 0;
  }

  async getCultivoById(id_cultivo: number): Promise<Cultivo | null> {
    const c = await this.repo.findOne({ where: { id_cultivo }, relations: ["usuario", "planta"] });
    if (!c) return null;
    return {
      id_cultivo: c.id_cultivo,
      id_usuario: c.usuario.id_usuario,
      id_planta: c.planta.id_planta,
      nombre_personalizado: c.nombre_personalizado,
      fecha_inicio: c.fecha_inicio.toISOString(),
      estado: c.estado,
    };
  }

  async getUserCultivos(id_usuario: number): Promise<Cultivo[]> {
    const cultivos = await this.repo.find({ where: { usuario: { id_usuario } }, relations: ["usuario", "planta"] });
    return cultivos.map(c => ({
      id_cultivo: c.id_cultivo,
      id_usuario: c.usuario.id_usuario,
      id_planta: c.planta.id_planta,
      nombre_personalizado: c.nombre_personalizado,
      fecha_inicio: c.fecha_inicio.toISOString(),
      estado: c.estado,
    }));
  }
}
