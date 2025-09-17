import { Router } from "express";
import { CultivoAdapter } from "../adapter/CultivoAdapter";
import { CultivoApplicationService } from "../../application/CultivoApplicationService";
import { CultivoController } from "../controller/CultivoController";

const router = Router();

// Inicialización
const cultivoAdapter = new CultivoAdapter();
const cultivoApp = new CultivoApplicationService(cultivoAdapter);
const cultivoController = new CultivoController(cultivoApp);

// Rutas
router.post("/cultivos", async (req, res) => await cultivoController.createCultivo(req, res));
router.put("/cultivos/:id", async (req, res) => await cultivoController.updateCultivo(req, res));
router.get("/cultivos/:id", async (req, res) => await cultivoController.getCultivoById(req, res));
router.get("/usuarios/:id_usuario/cultivos", async (req, res) => await cultivoController.getUserCultivos(req, res));
router.delete("/cultivos/:id", async (req, res) => await cultivoController.deleteCultivoById(req, res));

export default router;
