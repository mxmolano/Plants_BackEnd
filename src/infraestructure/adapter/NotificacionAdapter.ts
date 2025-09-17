import { Repository } from "typeorm";
import { NotificacionPort } from "../../domain/Notificacion/NotificacionPort";
import { Notificacion } from "../../domain/Notificacion/Notificacion";
import { NotificacionEntity } from "../entities/Notificacion/NotificacionEntity";
import { AppDataSource } from "../config/data-base";

export class NotificacionAdapter implements NotificacionPort {
  private repo: Repository<NotificacionEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(NotificacionEntity);
  }

  // Crear notificación
  async createNotificacion(notificacion: Omit<Notificacion, "id_notificacion">): Promise<number> {
    const entity = this.repo.create({
      ...notificacion,
      usuario: { id_usuario: notificacion.id_usuario } as any, // mapear relación
    });
    const saved = await this.repo.save(entity);
    return saved.id_notificacion;
  }

  // Marcar notificación como leída
  async markAsRead(id_notificacion: number): Promise<boolean> {
    const result = await this.repo.update({ id_notificacion }, { visto: true });
    return result.affected! > 0;
  }

  // Marcar todas las notificaciones de un usuario como leídas
  async markAllAsRead(id_usuario: number): Promise<boolean> {
    const result = await this.repo.createQueryBuilder()
      .update(NotificacionEntity)
      .set({ visto: true })
      .where("id_usuario = :id_usuario", { id_usuario })
      .execute();
    return result.affected! > 0;
  }

  // Eliminar notificación
  async deleteNotificacion(id_notificacion: number): Promise<boolean> {
    const result = await this.repo.delete({ id_notificacion });
    return result.affected! > 0;
  }

  // Obtener todas las notificaciones de un usuario, opcional solo no leídas
  async getUserNotificaciones(id_usuario: number, onlyUnread: boolean = false): Promise<Notificacion[]> {
    const where: any = { usuario: { id_usuario } };
    if (onlyUnread) where.visto = false;

    const notificacionesEntities: NotificacionEntity[] = await this.repo.find({
      where,
      relations: ["usuario"],
    });

    // Mapear entities → domain
    const notificaciones: Notificacion[] = notificacionesEntities.map(n => ({
      id_notificacion: n.id_notificacion,
      id_usuario: n.usuario.id_usuario, // extraer id de la relación
      mensaje: n.mensaje,
      tipo: n.tipo || "",
      estado: n.estado,
      visto: n.visto,
      enlace: n.enlace || "",
      fecha_creacion: n.fecha_creacion.toISOString(), // convertir Date → string
    }));

    return notificaciones;
  }
}
