import { Router } from "express";
import { NotificacionAdapter } from "../adapter/NotificacionAdapter";
import { NotificacionApplicationService } from "../../application/NotificacionApplicationService";
import { NotificacionController } from "../controller/NotificacionController";

const router = Router();

// Inicialización
const notificacionAdapter = new NotificacionAdapter();
const notificacionApp = new NotificacionApplicationService(notificacionAdapter);
const notificacionController = new NotificacionController(notificacionApp);

// Rutas
router.post("/notificaciones", async (req, res) => await notificacionController.createNotificacion(req, res));
router.put("/notificaciones/:id", async (req, res) => await notificacionController.markAsRead(req, res));
router.put("/notificaciones/usuario/:id_usuario", async (req, res) => await notificacionController.markAllAsRead(req, res));
router.get("/notificaciones/usuario/:id_usuario", async (req, res) => await notificacionController.getUserNotificaciones(req, res));
router.delete("/notificaciones/:id", async (req, res) => await notificacionController.deleteNotificacion(req, res));

export default router;
