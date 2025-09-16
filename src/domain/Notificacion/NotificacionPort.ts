import { Notificacion } from './Notificacion';

export interface NotificacionPort {
  createNotificacion(notificacion: Omit<Notificacion, "id_notificacion">): Promise<number>;
  markAsRead(id_notificacion: number): Promise<boolean>;
  markAllAsRead(id_usuario: number): Promise<boolean>;
  deleteNotificacion(id_notificacion: number): Promise<boolean>;
  getUserNotificaciones(id_usuario: number, onlyUnread?: boolean): Promise<Notificacion[]>;
}

