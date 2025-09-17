import { PlantaAdapter } from "../adapter/PlantaAdapter";
import { ReferenciaAdapter } from "../adapter/ReferenciaAdapter"; // <- Importar adapter correcto
import { PlantaApplicationService } from "../../application/PlantaApplicationService";
import { PlantaController } from "../controller/PlantaController";
import { Router } from "express";

const router = Router();

// Inicialización
const plantaAdapter = new PlantaAdapter();
const referenciaAdapter = new ReferenciaAdapter(); // <- este implementa ReferenciaPort
const plantaApp = new PlantaApplicationService(plantaAdapter, referenciaAdapter);
const plantaController = new PlantaController(plantaApp);

// Rutas
router.post("/plantas", async (req, res) => await plantaController.createPlanta(req, res));
router.put("/plantas/:id", async (req, res) => await plantaController.updatePlanta(req, res));
router.get("/plantas/:id", async (req, res) => await plantaController.getPlantaById(req, res));
router.get("/plantas", async (req, res) => await plantaController.getAllPlantas(req, res));

export default router;
