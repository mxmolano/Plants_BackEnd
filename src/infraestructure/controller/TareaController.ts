import { TareaApplicationService } from "../../application/TareaApplicationService";
import { Request, Response } from "express";

export class TareaController {
  private app: TareaApplicationService;

  constructor(app: TareaApplicationService) {
    this.app = app;
  }

  async createTarea(req: Request, res: Response): Promise<Response> {
    try {
      const id = await this.app.createTarea(req.body);
      return res.status(201).json({ message: "Tarea creada correctamente", id });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async updateTarea(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const updated = await this.app.updateTarea(id, req.body);
      return res.status(200).json({ message: updated ? "Tarea actualizada" : "No se pudo actualizar" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async deleteTareaById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const deleted = await this.app.deleteTareaById(id);
      return res.status(200).json({ message: deleted ? "Tarea eliminada" : "Tarea no encontrada" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getTareaById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const tarea = await this.app.getTareaById(id);
      if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });
      return res.status(200).json(tarea);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getCultivoTareas(req: Request, res: Response): Promise<Response> {
    const id_cultivo = parseInt(req.params.id_cultivo);
    try {
      const tareas = await this.app.getCultivoTareas(id_cultivo);
      return res.status(200).json(tareas);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getTareasByFecha(req: Request, res: Response): Promise<Response> {
    const fecha = req.params.fecha;
    try {
      const tareas = await this.app.getTareasByFecha(fecha);
      return res.status(200).json(tareas);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
