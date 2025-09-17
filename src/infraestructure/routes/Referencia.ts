import { Router } from "express";
import { ReferenciaAdapter } from "../adapter/ReferenciaAdapter";
import { ReferenciaController } from "../controller/ReferenciaController";

const router = Router();

// Inicialización
const referenciaAdapter = new ReferenciaAdapter();
const referenciaController = new ReferenciaController(referenciaAdapter);

// Rutas
router.get("/referencias/climas", async (req, res) => await referenciaController.getClimas(req, res));
router.get("/referencias/tipos-cultivo", async (req, res) => await referenciaController.getTiposCultivo(req, res));
router.get("/referencias/temporadas", async (req, res) => await referenciaController.getTemporadas(req, res));
router.get("/referencias/epocas", async (req, res) => await referenciaController.getEpocas(req, res));
router.get("/referencias/tipos-siembra", async (req, res) => await referenciaController.getTiposSiembra(req, res));
router.get("/referencias/resistencias-frio", async (req, res) => await referenciaController.getResistenciasFrio(req, res));
router.get("/referencias/luz-solar", async (req, res) => await referenciaController.getLuzSolar(req, res));
router.get("/referencias/plagas", async (req, res) => await referenciaController.getPlagas(req, res));
router.get("/referencias/cultivos-asociados", async (req, res) => await referenciaController.getCultivosAsociados(req, res));
router.get("/referencias/tipos-contenedores", async (req, res) => await referenciaController.getTiposContenedores(req, res));

export default router;
