import { CultivoApplicationService } from "../../application/CultivoApplicationService";
import { Request, Response } from "express";
import { Cultivo } from "../../domain/Cultivo/Cultivo";

export class CultivoController {
    private applicationService: CultivoApplicationService;

    constructor(applicationService: CultivoApplicationService) {
        this.applicationService = applicationService;
    }

    // Crear un nuevo cultivo
    async createCultivo(request: Request, response: Response): Promise<Response> {
        try {
            const cultivoData: Omit<Cultivo, "id_cultivo"> = request.body;

            if (!cultivoData.nombre_personalizado || !cultivoData.fecha_inicio) {
                return response.status(400).json({ message: "Nombre y fecha de inicio son requeridos" });
            }

            const fechaValida = !isNaN(Date.parse(cultivoData.fecha_inicio));
            if (!fechaValida) {
                return response.status(400).json({ message: "Fecha no válida" });
            }

            const newCultivoId = await this.applicationService.createCultivo(cultivoData);
            return response.status(201).json({ message: "Cultivo creado correctamente", id_cultivo: newCultivoId });

        } catch (error: any) {
            return response.status(500).json({ message: error.message || "Error interno del servidor" });
        }
    }

    // Obtener cultivo por ID
    async getCultivoById(request: Request, response: Response): Promise<Response> {
        try {
            const idCultivo = Number(request.params.id);
            if (isNaN(idCultivo)) {
                return response.status(400).json({ message: "ID de cultivo inválido" });
            }

            const cultivo = await this.applicationService.getCultivoById(idCultivo);
            if (!cultivo) {
                return response.status(404).json({ message: "Cultivo no encontrado" });
            }

            return response.status(200).json(cultivo);

        } catch (error: any) {
            return response.status(500).json({ message: error.message || "Error interno del servidor" });
        }
    }

    // Obtener cultivos de un usuario
    async getUserCultivos(request: Request, response: Response): Promise<Response> {
        try {
            const idUsuario = Number(request.params.usuarioId);
            if (isNaN(idUsuario)) {
                return response.status(400).json({ message: "ID de usuario inválido" });
            }

            const cultivos = await this.applicationService.getUserCultivos(idUsuario);
            return response.status(200).json(cultivos);

        } catch (error: any) {
            return response.status(500).json({ message: error.message || "Error interno del servidor" });
        }
    }

    // Actualizar cultivo
    async updateCultivo(request: Request, response: Response): Promise<Response> {
        try {
            const idCultivo = Number(request.params.id);
            if (isNaN(idCultivo)) {
                return response.status(400).json({ message: "ID de cultivo inválido" });
            }

            const cultivoData: Partial<Cultivo> = request.body;

            if (cultivoData.fecha_inicio && isNaN(Date.parse(cultivoData.fecha_inicio))) {
                return response.status(400).json({ message: "Fecha no válida" });
            }

            const updated = await this.applicationService.updateCultivo(idCultivo, cultivoData);
            return response.status(200).json({ message: updated ? "Cultivo actualizado correctamente" : "No se pudo actualizar el cultivo" });

        } catch (error: any) {
            return response.status(500).json({ message: error.message || "Error interno del servidor" });
        }
    }

    // Borrado lógico de cultivo
    async deleteCultivoById(request: Request, response: Response): Promise<Response> {
        try {
            const idCultivo = Number(request.params.id);
            if (isNaN(idCultivo)) {
                return response.status(400).json({ message: "ID de cultivo inválido" });
            }

            const deleted = await this.applicationService.deleteCultivoById(idCultivo);
            return response.status(200).json({ message: deleted ? "Cultivo dado de baja correctamente" : "No se pudo eliminar el cultivo" });

        } catch (error: any) {
            return response.status(500).json({ message: error.message || "Error interno del servidor" });
        }
    }
}
