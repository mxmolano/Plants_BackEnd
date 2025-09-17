import express from "express";
import cors from "cors";

// Routers
import userRoutes from "../routes/UserRoutes";
import usuarioRoutes from "../routes/usuarioRoutes";
import cultivoRoutes from "../routes/CultivoRoutes";
import etapaCultivoRoutes from "../routes/EtapaCultivoRoutes";
import etapaRoutes from "../routes/EtapaRoutes";
import notificacionRoutes from "../routes/NotificacionRoutes";
import plantaRoutes from "../routes/PlantaRoutes";
import referenciaRoutes from "../routes/Referencia";
import tareaRoutes from "../routes/TareaRoutes";

class App {
  private app!: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    // Montar todos los routers bajo /api
    this.app.use("/api", userRoutes);
    this.app.use("/api", usuarioRoutes);
    this.app.use("/api", cultivoRoutes);
    this.app.use("/api", etapaCultivoRoutes);
    this.app.use("/api", etapaRoutes);
    this.app.use("/api", notificacionRoutes);
    this.app.use("/api", plantaRoutes);
    this.app.use("/api", referenciaRoutes);
    this.app.use("/api", tareaRoutes);
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();
