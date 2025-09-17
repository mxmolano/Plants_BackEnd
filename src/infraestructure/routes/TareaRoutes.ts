import { Router } from "express";
import { TareaAdapter } from "../adapter/TareaAdapter";
import { TareaApplicationService } from "../../application/TareaApplicationService";
import { TareaController } from "../controller/TareaController";

const router = Router();

// Inicialización
const tareaAdapter = new TareaAdapter();
const tareaApp = new TareaApplicationService(tareaAdapter);
const tareaController = new TareaController(tareaApp);

// Rutas
router.post("/tareas", async (req, res) => await tareaController.createTarea(req, res));
router.put("/tareas/:id", async (req, res) => await tareaController.updateTarea(req, res));
router.get("/tareas/:id", async (req, res) => await tareaController.getTareaById(req, res));
router.get("/cultivos/:id_cultivo/tareas", async (req, res) => await tareaController.getCultivoTareas(req, res));
router.get("/tareas/fecha/:fecha", async (req, res) => await tareaController.getTareasByFecha(req, res));
router.delete("/tareas/:id", async (req, res) => await tareaController.deleteTareaById(req, res));

export default router;
