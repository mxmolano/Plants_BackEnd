import { Repository } from "typeorm";
import { UsuarioPort } from "../../domain/Usuario/UsuarioPort";
import { Usuario } from "../../domain/Usuario/Usuario";
import { UsuarioEntity } from "../entities/usuario/UsuarioEntity";
import { RolEntity } from "../entities/usuario/RolEntity";
import { AppDataSource } from "../config/data-base";

export class UsuarioAdapter implements UsuarioPort {
  private repo: Repository<UsuarioEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(UsuarioEntity);
  }

  // Crea un usuario
  async createUsuario(usuario: Omit<Usuario, "id_usuario" | "fecha_registro">): Promise<number> {
    const userEntity = this.repo.create({
      ...usuario,
      rol: { id_rol: usuario.id_rol } as RolEntity,
    });
    const saved = await this.repo.save(userEntity);
    return saved.id_usuario;
  }

  // Actualiza un usuario parcial
  async updateUsuario(id_usuario: number, usuario: Partial<Usuario>): Promise<boolean> {
    const result = await this.repo.update({ id_usuario }, usuario);
    return result.affected! > 0;
  }

  // Soft delete de usuario
  async deleteUsuario(id_usuario: number): Promise<boolean> {
    const result = await this.repo.update({ id_usuario }, { estado: false });
    return result.affected! > 0;
  }

  // Obtiene usuario por id
  async getUsuarioById(id_usuario: number): Promise<Usuario | null> {
    const user = await this.repo.findOne({ where: { id_usuario }, relations: ["rol"] });
    if (!user) return null;
    return {
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      estado: user.estado,
      fecha_registro: user.fecha_registro,
      id_rol: user.rol.id_rol,
    };
  }

  // Obtiene usuario por email
  async getUsuarioByEmail(email: string): Promise<Usuario | null> {
    const user = await this.repo.findOne({ where: { email }, relations: ["rol"] });
    if (!user) return null;
    return {
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      estado: user.estado,
      fecha_registro: user.fecha_registro,
      id_rol: user.rol.id_rol,
    };
  }

  // Lista todos los usuarios
  async getAllUsuario(): Promise<Usuario[]> {
    const users = await this.repo.find({ relations: ["rol"] });
    return users.map(u => ({
      id_usuario: u.id_usuario,
      nombre: u.nombre,
      email: u.email,
      password: u.password,
      estado: u.estado,
      fecha_registro: u.fecha_registro,
      id_rol: u.rol.id_rol,
    }));
  }

  // Obtiene un rol por id
  async getRolById(id_rol: number): Promise<any> {
    const rol = await AppDataSource.getRepository(RolEntity).findOne({ where: { id_rol } });
    return rol ? { id_rol: rol.id_rol, nombre_rol: rol.nombre_rol } : null;
  }

  // Asigna un rol a un usuario
  async assignRol(id_usuario: number, id_rol: number): Promise<boolean> {
    const user = await this.repo.findOne({ where: { id_usuario }, relations: ["rol"] });
    if (!user) return false;
    user.rol = { id_rol } as RolEntity;
    await this.repo.save(user);
    return true;
  }

  // Cambiar el rol asignado a un usuario
  async changeUserRole(id_usuario: number, id_rol: number): Promise<boolean> {
  const result = await this.repo.update(
    { id_usuario },
    { rol: { id_rol } as RolEntity }
  );
  return result.affected! > 0;
}


}

