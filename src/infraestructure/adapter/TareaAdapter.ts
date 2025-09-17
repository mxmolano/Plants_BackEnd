import { Repository } from "typeorm";
import { TareaPort } from "../../domain/Tarea/TareasPort";
import { Tarea } from "../../domain/Tarea/Tarea";
import { TareaEntity } from "../entities/Tarea/TareaEntity";
import { AppDataSource } from "../config/data-base";

export class TareaAdapter implements TareaPort {
  private repo: Repository<TareaEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(TareaEntity);
  }

  async createTarea(tarea: Omit<Tarea, "id_tarea">): Promise<number> {
    const entity = this.repo.create(tarea);
    const saved = await this.repo.save(entity);
    return saved.id_tarea;
  }

  async updateTarea(id_tarea: number, tarea: Partial<Tarea>): Promise<boolean> {
    const result = await this.repo.update({ id_tarea }, tarea);
    return result.affected! > 0;
  }

  async deleteTarea(id_tarea: number): Promise<boolean> {
    const result = await this.repo.update({ id_tarea }, { estado: false });
    return result.affected! > 0;
  }

  async getTareaById(id_tarea: number): Promise<Tarea | null> {
    const t = await this.repo.findOne({ where: { id_tarea }, relations: ["cultivo"] });
    if (!t) return null;
    return {
      id_tarea: t.id_tarea,
      id_cultivo: t.cultivo.id_cultivo,
      titulo: t.titulo,
      descripcion: t.descripcion,
      fecha_programada: t.fecha_programada.toISOString(),
      estado: t.estado,
      completada: t.completada,
    };
  }

  async getCultivoTareas(id_cultivo: number): Promise<Tarea[]> {
    const tareas = await this.repo.find({ where: { cultivo: { id_cultivo } }, relations: ["cultivo"] });
    return tareas.map(t => ({
      id_tarea: t.id_tarea,
      id_cultivo: t.cultivo.id_cultivo,
      titulo: t.titulo,
      descripcion: t.descripcion,
      fecha_programada: t.fecha_programada.toISOString(),
      estado: t.estado,
      completada: t.completada,
    }));
  }

  async getTareasByFecha(fecha: string): Promise<Tarea[]> {
    const tareas = await this.repo
      .createQueryBuilder("tarea")
      .where("tarea.fecha_programada = :fecha", { fecha })
      .getMany();
    return tareas.map(t => ({
      id_tarea: t.id_tarea,
      id_cultivo: t.cultivo.id_cultivo,
      titulo: t.titulo,
      descripcion: t.descripcion,
      fecha_programada: t.fecha_programada.toISOString(),
      estado: t.estado,
      completada: t.completada,
    }));
  }
}
