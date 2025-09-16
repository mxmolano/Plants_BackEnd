export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  password: string;
  estado: boolean; 
  fecha_registro: Date;
  id_rol: number;  // FK hacia Rol
}
