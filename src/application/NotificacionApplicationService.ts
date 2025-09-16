import { NotificacionPort } from '../domain/Notificacion/NotificacionPort';
import { Notificacion } from '../domain/Notificacion/Notificacion';

export class NotificacionApplicationService {
    private port!: NotificacionPort;

    constructor(port: NotificacionPort) {
        this.port = port;
    }

    async createNotificacion(notificacion: Omit<Notificacion, "id_notificacion">): Promise<number> {
        const id = await this.port.createNotificacion(notificacion);
        console.log(`[CREATE] Notificación ${id} creada para usuario ${notificacion.id_usuario}: ${notificacion.mensaje}`);
        return id;
    }

    async markAsRead(id_notificacion: number, id_usuario: number): Promise<boolean> {
        const notificaciones = await this.port.getUserNotificaciones(id_usuario);
        const existing = notificaciones.find(n => n.id_notificacion === id_notificacion);
        if (!existing) throw new Error("Notificación no encontrada");

        const success = await this.port.markAsRead(id_notificacion);
        if (success) console.log(`[UPDATE] Notificación ${id_notificacion} marcada como leída`);
        return success;
    }

    async deleteNotificacion(id_notificacion: number, id_usuario: number): Promise<boolean> {
        const notificaciones = await this.port.getUserNotificaciones(id_usuario);
        const existing = notificaciones.find(n => n.id_notificacion === id_notificacion);
        if (!existing) throw new Error("Notificación no encontrada");

        const success = await this.port.deleteNotificacion(id_notificacion);
        if (success) console.log(`[DELETE] Notificación ${id_notificacion} eliminada`);
        return success;
    }

    async getUserNotificaciones(id_usuario: number, onlyUnread: boolean = false): Promise<Notificacion[]> {
        const notificaciones = await this.port.getUserNotificaciones(id_usuario, onlyUnread);
        console.log(`[GET] Notificaciones de usuario ${id_usuario} obtenidas: ${notificaciones.length}`);
        return notificaciones;
    }

    async markAllAsRead(id_usuario: number): Promise<boolean> {
        const success = await this.port.markAllAsRead(id_usuario);
        if (success) console.log(`[UPDATE] Todas las notificaciones de usuario ${id_usuario} marcadas como leídas`);
        return success;
    }
}
