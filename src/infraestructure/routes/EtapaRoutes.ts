import { Router } from "express";
import { EtapaAdapter } from "../adapter/EtapaAdapter";
import { EtapaApplicationService } from "../../application/EtapaApplicacionService";
import { EtapaController } from "../controller/EtapaController";

const router = Router();

// Inicialización
const etapaAdapter = new EtapaAdapter();
const etapaApp = new EtapaApplicationService(etapaAdapter);
const etapaController = new EtapaController(etapaApp);

// Rutas
router.post("/etapas", async (req, res) => await etapaController.createEtapa(req, res));
router.put("/etapas/:id", async (req, res) => await etapaController.updateEtapa(req, res));
router.get("/plantas/:id_planta/etapas", async (req, res) => await etapaController.getEtapasByPlanta(req, res));
router.delete("/etapas/:id", async (req, res) => await etapaController.deleteEtapa(req, res));

export default router;
