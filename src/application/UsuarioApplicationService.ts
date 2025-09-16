import { UsuarioPort } from "../domain/Usuario/UsuarioPort";
import { Usuario } from "../domain/Usuario/Usuario";
import { Rol } from "../domain/Usuario/Rol";
import { AuthApplication } from "./AuthApplication";
import bcrypt from "bcryptjs";

export interface UsuarioDTO {
    nombre: string;
    email: string;
    password: string;
}

export class UsuarioApplicationService {
    private port!: UsuarioPort;
    constructor(port: UsuarioPort) {
        this.port = port;
    }

    async login(email: string, password: string): Promise<string> {
        const existingUser = await this.port.getUsuarioByEmail(email);
        if (!existingUser) throw new Error("Credenciales incorrectas");

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) throw new Error("Credenciales incorrectas");

        console.log(`[LOGIN] Usuario ${email} autenticado correctamente`);

        return AuthApplication.generateToken({
            id: existingUser.id_usuario,
            email: existingUser.email,
            rol: existingUser.id_rol
        });
    }

    async createUsuario(usuario: UsuarioDTO): Promise<number> {
        const existingUser = await this.port.getUsuarioByEmail(usuario.email);
        if (existingUser) throw new Error("El usuario ya existe");

        const defaultRoleId = 2; // rol usuario por defecto
        const rol = await this.port.getRolById(defaultRoleId);
        if (!rol) throw new Error("Rol por defecto no existe");

        const hashedPassword = await bcrypt.hash(usuario.password, 10);
        usuario.password = hashedPassword;

        console.log(`[CREATE] Usuario creado: ${usuario.email} con rol ${rol.nombre_rol}`);

        return this.port.createUsuario({
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            estado: true,
            id_rol: defaultRoleId
        });
    }

    async updateUsuario(id_usuario: number, usuario: Partial<Usuario>, isAdmin = false): Promise<boolean> {
        const existingUser = await this.port.getUsuarioById(id_usuario);
        if (!existingUser) throw new Error("Usuario no encontrado");

        if (usuario.email && usuario.email !== existingUser.email) {
            const emailTaken = await this.port.getUsuarioByEmail(usuario.email);
            if (emailTaken && emailTaken.id_usuario !== id_usuario) throw new Error("Email ya en uso");
        }

        if (usuario.password) {
            usuario.password = await bcrypt.hash(usuario.password, 10);
        }

        if (usuario.id_rol && usuario.id_rol !== existingUser.id_rol) {
            if (!isAdmin) throw new Error("Solo admin puede cambiar roles");

            const rol = await this.port.getRolById(usuario.id_rol);
            if (!rol) throw new Error("Rol no válido");

            const assigned = await this.port.assignRol(id_usuario, usuario.id_rol);
            if (!assigned) throw new Error("No se pudo asignar el rol");

            console.log(`[ROLE CHANGE] Usuario ${id_usuario} rol cambiado a ${rol.nombre_rol} por admin`);
        }

        const updated = await this.port.updateUsuario(id_usuario, usuario);
        if (updated) console.log(`[UPDATE] Usuario ${id_usuario} actualizado`);
        return updated;
    }

    async deleteUsuario(id_usuario: number): Promise<boolean> {
        const existingUser = await this.port.getUsuarioById(id_usuario);
        if (!existingUser) throw new Error("Usuario no encontrado");

        const deleted = await this.port.deleteUsuario(id_usuario);
        if (deleted) console.log(`[DELETE] Usuario ${id_usuario} desactivado`);
        return deleted;
    }

    async getUsuarioById(id_usuario: number): Promise<Usuario | null> {
        return await this.port.getUsuarioById(id_usuario);
    }

    async getUsuarioByEmail(email: string): Promise<Usuario | null> {
        return await this.port.getUsuarioByEmail(email);
    }

    async getAllUsuarios(): Promise<Usuario[]> {
        return await this.port.getAllUsuario();
    }
}
