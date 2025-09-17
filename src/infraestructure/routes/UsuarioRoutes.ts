import { Router } from "express";
import { UsuarioAdapter } from "../adapter/UsuarioAdapter";
import { UsuarioApplicationService } from "../../application/UsuarioApplicationService";
import { UsuarioController } from "../controller/UsuarioController";
import { authenticateToken, authorizeRole } from "../web/authMiddleware";

const router = Router();

// Inicialización
const usuarioAdapter = new UsuarioAdapter();
const usuarioApp = new UsuarioApplicationService(usuarioAdapter);
const usuarioController = new UsuarioController(usuarioApp);

// Rutas
router.post("/loginUsuarios", async (req, res) => await usuarioController.login(req, res));
router.post("/usuarios", async (req, res) => await usuarioController.registerUser(req, res));
router.get("/usuarios", authenticateToken, async (req, res) => await usuarioController.getAllUsers(req, res));
router.get("/usuarios/:id", authenticateToken, async (req, res) => await usuarioController.getUserById(req, res));
router.put("/usuarios/:id", authenticateToken, async (req, res) => await usuarioController.updateUser(req, res));
router.get("/usuarios/email/:email", authenticateToken, async (req, res) => await usuarioController.getUserByEmail(req, res));
router.delete("/usuarios/:id", authenticateToken, async (req, res) => await usuarioController.deleteUserById(req, res));
router.put("/usuarios/:id/role",authenticateToken, authorizeRole(["Administrador"]), async (req, res) => await usuarioController.changeUserRole(req, res));

export default router;
