import { UsuarioPort } from "../domain/Usuario/UsuarioPort";
import { Usuario } from "../domain/Usuario/Usuario";
import { AuthApplication } from "./AuthApplication";
import bcrypt from "bcryptjs";

export interface UsuarioDTO {
  nombre: string;
  email: string;
  password: string;
  id_rol?: number;
}

export class UsuarioApplicationService {
  private port!: UsuarioPort;

  constructor(port: UsuarioPort) {
    this.port = port;
  }

  // LOGIN con rol incluido en el token
  async login(email: string, password: string): Promise<string> {
    const existingUser = await this.port.getUsuarioByEmail(email);
    if (!existingUser) {
      throw new Error("Credentials are Invalid");
    }

    const passwordMath = await bcrypt.compare(password, existingUser.password);
    if (!passwordMath) {
      throw new Error("Credentials are Invalid");
    }

    // Se agrega el rol al payload del token
    const roleEntity = await this.port.getRolById(existingUser.id_rol);

    const token = AuthApplication.generateToken({
      id: existingUser.id_usuario,
      email: existingUser.email,
      role: roleEntity?.nombre_rol || "user" // si no hay rol asignado, user por defecto
    });

    return token;
  }

  // Crear usuario
  async createUsuario(user: Omit<Usuario, "id_usuario" | "fecha_registro">): Promise<number> {
    const existingUser = await this.port.getUsuarioByEmail(user.email);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      return this.port.createUsuario(user);
    }
    throw new Error("El usuario ya existe");
  }

  // Actualizar usuario
  async updateUsuario(id: number, user: Partial<Usuario>): Promise<boolean> {
    const existingUser = await this.port.getUsuarioById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (user.email) {
      const emailTaken = await this.port.getUsuarioByEmail(user.email);
      if (emailTaken && emailTaken.id_usuario !== id) {
        throw new Error("Email already taken");
      }
    }

    return await this.port.updateUsuario(id, user);
  }

  // Eliminar usuario (soft delete)
  async deleteUsuario(id: number): Promise<boolean> {
    const existingUser = await this.port.getUsuarioById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    return await this.port.deleteUsuario(id);
  }

  // Consultas
  async getUsuarioById(id: number): Promise<Usuario | null> {
    return await this.port.getUsuarioById(id);
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | null> {
    return await this.port.getUsuarioByEmail(email);
  }

  async getAllUsuarios(): Promise<Usuario[]> {
    return await this.port.getAllUsuario();
  }

  // Cambio de rol (solo admin lo puede usar vía authorizeRole)
  async changeUserRole(id_usuario: number, id_rol: number): Promise<boolean> {
    return await this.port.changeUserRole(id_usuario, id_rol);
  }
}
