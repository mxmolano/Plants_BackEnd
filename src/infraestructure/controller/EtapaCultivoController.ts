import { EtapaCultivoApplicationService } from "../../application/EtapaCultivoApplicationService";
import { Request, Response } from "express";

export class EtapaCultivoController {
  private app: EtapaCultivoApplicationService;

  constructor(app: EtapaCultivoApplicationService) {
    this.app = app;
  }

  async createEtapasFromPlanta(req: Request, res: Response): Promise<Response> {
    const { id_cultivo, id_planta } = req.body;
    try {
      const result = await this.app.createEtapasFromPlanta(id_cultivo, id_planta);
      return res.status(201).json({ message: result ? "Etapas creadas correctamente" : "Error al crear etapas" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async updateEtapaCultivo(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const updated = await this.app.updateEtapaCultivo(id, req.body);
      return res.status(200).json({ message: updated ? "EtapaCultivo actualizada" : "No se pudo actualizar" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async deleteEtapaCultivoById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const deleted = await this.app.deleteEtapaCultivoById(id);
      return res.status(200).json({ message: deleted ? "EtapaCultivo desactivada" : "No se encontró la etapa" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async getEtapaCultivoById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const etapa = await this.app.getEtapaCultivoById(id);
      if (!etapa) return res.status(404).json({ message: "EtapaCultivo no encontrada" });
      return res.status(200).json(etapa);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getEtapasByCultivo(req: Request, res: Response): Promise<Response> {
    const id_cultivo = parseInt(req.params.id_cultivo);
    try {
      const etapas = await this.app.getEtapasByCultivo(id_cultivo);
      return res.status(200).json(etapas);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
