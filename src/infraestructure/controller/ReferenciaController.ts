import { Request, Response } from "express";
import { ReferenciaAdapter } from "../adapter/ReferenciaAdapter";

export class ReferenciaController {
  private adapter: ReferenciaAdapter;

  constructor(adapter: ReferenciaAdapter) {
    this.adapter = adapter;
  }

  async getClimas(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getClimas();
      return res.status(200).json(datos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getTiposCultivo(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getTiposCultivo();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getTemporadas(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getTemporadas();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getEpocas(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getEpocas();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getTiposSiembra(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getTiposSiembra();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getResistenciasFrio(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getResistenciasFrio();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getLuzSolar(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getLuzSolar();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getPlagas(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getPlagas();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getCultivosAsociados(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getCultivosAsociados();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getTiposContenedores(req: Request, res: Response): Promise<Response> {
    try {
      const datos = await this.adapter.getTiposContenedores();
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
