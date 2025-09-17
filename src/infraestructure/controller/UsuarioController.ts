import { UsuarioApplicationService } from "../../application/UsuarioApplicationService";
import { Request, Response } from "express";
import { UsuarioDTO } from "../../application/UsuarioApplicationService";

export class UsuarioController {
  private app: UsuarioApplicationService;

  constructor(app: UsuarioApplicationService) {
    this.app = app;
  }

  // ✅ Validaciones internas
  private validateEmail(email: string): boolean {
    return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  private validatePassword(password: string): boolean {
    // Min 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  }

  private validateName(name: string): boolean {
    return /^[a-zA-Z\s]{3,50}$/.test(name);
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ error: "Email y contraseña son requeridos" });

      if (!this.validateEmail(email))
        return res.status(400).json({ error: "Correo electrónico no válido" });

      const token = await this.app.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
  }

  async registerUser(req: Request, res: Response): Promise<Response> {
    const { nombre, email, password }: UsuarioDTO = req.body;
    try {
      if (!nombre || !email || !password)
        return res.status(400).json({ message: "Todos los campos son requeridos" });

      if (!this.validateName(nombre))
        return res.status(400).json({ message: "Nombre inválido (mínimo 3 caracteres, solo letras)" });

      if (!this.validateEmail(email))
        return res.status(400).json({ message: "Correo electrónico no válido" });

      if (!this.validatePassword(password))
        return res.status(400).json({
          message: "Contraseña insegura (mínimo 8 caracteres, mayúscula, número y símbolo)",
        });

      // ✅ Se asignan valores por defecto: estado true, rol = 2 (usuario normal)
      const userId = await this.app.createUsuario({
        nombre,
        email,
        password,
        estado: true,
        id_rol: 2
      });

      return res.status(201).json({ message: "Usuario registrado correctamente", userId });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.app.getAllUsuarios();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    try {
      const user = await this.app.getUsuarioById(id);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    try {
      const updated = await this.app.updateUsuario(id, req.body);
      return res
        .status(200)
        .json({ message: updated ? "Usuario actualizado" : "No se pudo actualizar" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error en el servidor" });
    }
  }

  async deleteUserById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    try {
      const deleted = await this.app.deleteUsuario(id);
      return res.status(200).json({
        message: deleted ? "Usuario dado de baja" : "Usuario no encontrado",
      });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    const email = req.params.email;
    if (!this.validateEmail(email))
      return res.status(400).json({ message: "Correo electrónico no válido" });

    try {
      const user = await this.app.getUsuarioByEmail(email);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async changeUserRole(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const { id_rol } = req.body;

    if (isNaN(id) || !id_rol)
      return res.status(400).json({ message: "Datos inválidos" });

    try {
      const updated = await this.app.changeUserRole(id, id_rol);
      return res.status(200).json({ message: updated ? "Rol actualizado" : "Usuario no encontrado" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
