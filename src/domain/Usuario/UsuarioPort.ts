import { Usuario } from './Usuario';
import { Rol } from './Rol'; 

export interface UsuarioPort {
    // CRUD de usuarios
    createUsuario(usuario: Omit<Usuario, "id_usuario" | "fecha_registro">): Promise<number>;
    updateUsuario(id_usuario: number, usuario: Partial<Usuario>): Promise<boolean>;
    deleteUsuario(id_usuario: number): Promise<boolean>;

    // Consultas de usuarios
    getUsuarioById(id_usuario: number): Promise<Usuario | null>;
    getAllUsuario(): Promise<Usuario[]>;
    getUsuarioByEmail(email: string): Promise<Usuario | null>;

    // Roles (solo consulta y asignación)
    getRolById(id_rol: number): Promise<Rol | null>;
    assignRol(id_usuario: number, id_rol: number): Promise<boolean>; // admin -> usuario o usuario -> admin
    changeUserRole(id_usuario: number, id_rol: number): Promise<boolean>;
}
