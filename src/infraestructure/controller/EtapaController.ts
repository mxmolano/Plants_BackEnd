import { EtapaApplicationService } from "../../application/EtapaApplicacionService";
import { Request, Response } from "express";

export class EtapaController {
  private app: EtapaApplicationService;

  constructor(app: EtapaApplicationService) {
    this.app = app;
  }

  async createEtapa(req: Request, res: Response): Promise<Response> {
    try {
      const id = await this.app.createEtapa(req.body);
      return res.status(201).json({ message: "Etapa creada correctamente", id });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async updateEtapa(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const updated = await this.app.updateEtapa(id, req.body);
      return res.status(200).json({ message: updated ? "Etapa actualizada" : "No se pudo actualizar" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async deleteEtapa(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const deleted = await this.app.deleteEtapa(id);
      return res.status(200).json({ message: deleted ? "Etapa eliminada" : "Etapa no encontrada" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getEtapasByPlanta(req: Request, res: Response): Promise<Response> {
    const id_planta = parseInt(req.params.id_planta);
    try {
      const etapas = await this.app.getEtapasByPlanta(id_planta);
      return res.status(200).json(etapas);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
