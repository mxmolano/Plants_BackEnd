import { TareaPort } from "../domain/Tarea/TareasPort";
import { Tarea } from "../domain/Tarea/Tarea";

export class TareaApplicationService {
    private port!: TareaPort;

    constructor(port: TareaPort) {
        this.port = port;
    }

    async createTarea(tarea: Omit<Tarea, "id_tarea">): Promise<number> {
        if (!tarea.fecha_programada || isNaN(Date.parse(tarea.fecha_programada))) {
            throw new Error("Fecha programada no válida");
        }

        const id = await this.port.createTarea(tarea);
        console.log(`[CREATE] Tarea ${id} creada para cultivo ${tarea.id_cultivo}: ${tarea.titulo}`);
        return id;
    }

    async updateTarea(id_tarea: number, tarea: Partial<Tarea>): Promise<boolean> {
        const existing = await this.port.getTareaById(id_tarea);
        if (!existing) throw new Error("Tarea no encontrada");

        if (tarea.fecha_programada && isNaN(Date.parse(tarea.fecha_programada))) {
            throw new Error("Fecha programada no válida");
        }

        const updated = await this.port.updateTarea(id_tarea, tarea);
        if (updated) console.log(`[UPDATE] Tarea ${id_tarea} actualizada`);
        return updated;
    }

    async deleteTareaById(id_tarea: number): Promise<boolean> {
        const existing = await this.port.getTareaById(id_tarea);
        if (!existing) throw new Error("Tarea no encontrada");

        const deleted = await this.port.deleteTarea(id_tarea);
        if (deleted) console.log(`[DELETE] Tarea ${id_tarea} eliminada`);
        return deleted;
    }

    async getTareaById(id_tarea: number): Promise<Tarea | null> {
        const tarea = await this.port.getTareaById(id_tarea);
        console.log(`[GET] Tarea ${id_tarea} obtenida`);
        return tarea;
    }

    async getCultivoTareas(id_cultivo: number): Promise<Tarea[]> {
        const tareas = await this.port.getCultivoTareas(id_cultivo);
        console.log(`[GET] Tareas de cultivo ${id_cultivo} obtenidas: ${tareas.length}`);
        return tareas;
    }

    async getTareasByFecha(fecha: string): Promise<Tarea[]> {
        const tareas = await this.port.getTareasByFecha(fecha);
        console.log(`[GET] Tareas programadas para ${fecha} obtenidas: ${tareas.length}`);
        return tareas;
    }
}
