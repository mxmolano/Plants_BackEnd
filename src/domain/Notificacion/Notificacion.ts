export interface Notificacion {
  id_notificacion: number;
  id_usuario: number;
  mensaje: string;
  tipo: string;           
  estado: boolean;
  visto: boolean;          
  enlace: string;         
  fecha_creacion: string;  
}