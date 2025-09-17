import { PlantaApplicationService } from "../../application/PlantaApplicationService";
import { Request, Response } from "express";

export class PlantaController {
  private app: PlantaApplicationService;

  constructor(app: PlantaApplicationService) {
    this.app = app;
  }

  async createPlanta(req: Request, res: Response): Promise<Response> {
    try {
      const planta = req.body;
      const id = await this.app.createPlanta(planta);
      return res.status(201).json({ message: "Planta creada correctamente", id });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async updatePlanta(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const updated = await this.app.updatePlanta(id, req.body);
      return res.status(200).json({ message: updated ? "Planta actualizada" : "No se pudo actualizar" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async getPlantaById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const planta = await this.app.getPlantaById(id);
      if (!planta) return res.status(404).json({ message: "Planta no encontrada" });
      return res.status(200).json(planta);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getAllPlantas(req: Request, res: Response): Promise<Response> {
    try {
      const plantas = await this.app.getAllPlantas();
      return res.status(200).json(plantas);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
