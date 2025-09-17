import { Router } from "express";
import { EtapaCultivoAdapter } from "../adapter/EtapaCultivoAdapter";
import { EtapaCultivoApplicationService } from "../../application/EtapaCultivoApplicationService";
import { EtapaCultivoController } from "../controller/EtapaCultivoController";

const router = Router();

// Inicialización
const etapaCultivoAdapter = new EtapaCultivoAdapter();
const etapaCultivoApp = new EtapaCultivoApplicationService(etapaCultivoAdapter);
const etapaCultivoController = new EtapaCultivoController(etapaCultivoApp);

// Rutas
router.post("/cultivos-etapas", async (req, res) => await etapaCultivoController.createEtapasFromPlanta(req, res));
router.put("/cultivos-etapas/:id", async (req, res) => await etapaCultivoController.updateEtapaCultivo(req, res));
router.get("/cultivos-etapas/:id", async (req, res) => await etapaCultivoController.getEtapaCultivoById(req, res));
router.get("/cultivos/:id_cultivo/etapas", async (req, res) => await etapaCultivoController.getEtapasByCultivo(req, res));
router.delete("/cultivos-etapas/:id", async (req, res) => await etapaCultivoController.deleteEtapaCultivoById(req, res));

export default router;
