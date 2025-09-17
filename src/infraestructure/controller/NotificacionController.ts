import { NotificacionApplicationService } from "../../application/NotificacionApplicationService";
import { Request, Response } from "express";

export class NotificacionController {
  private app: NotificacionApplicationService;

  constructor(app: NotificacionApplicationService) {
    this.app = app;
  }

  async createNotificacion(req: Request, res: Response): Promise<Response> {
    try {
      const id = await this.app.createNotificacion(req.body);
      return res.status(201).json({ message: "Notificación creada correctamente", id });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async markAsRead(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const id_usuario = parseInt(req.body.id_usuario);
    try {
      const updated = await this.app.markAsRead(id, id_usuario);
      return res.status(200).json({ message: updated ? "Notificación marcada como leída" : "No se encontró la notificación" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async markAllAsRead(req: Request, res: Response): Promise<Response> {
    const id_usuario = parseInt(req.params.id_usuario);
    try {
      const updated = await this.app.markAllAsRead(id_usuario);
      return res.status(200).json({ message: updated ? "Todas las notificaciones marcadas como leídas" : "No se encontraron notificaciones" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async deleteNotificacion(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const id_usuario = parseInt(req.body.id_usuario);
    try {
      const deleted = await this.app.deleteNotificacion(id, id_usuario);
      return res.status(200).json({ message: deleted ? "Notificación eliminada" : "No se encontró la notificación" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getUserNotificaciones(req: Request, res: Response): Promise<Response> {
    const id_usuario = parseInt(req.params.id_usuario);
    const onlyUnread = req.query.onlyUnread === "true";
    try {
      const notificaciones = await this.app.getUserNotificaciones(id_usuario, onlyUnread);
      return res.status(200).json(notificaciones);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
