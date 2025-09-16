import { PlantaPort } from "../domain/Planta/PlantaPort";
import { Planta } from "../domain/Planta/Planta";
import { ReferenciaPort } from "../domain/Planta/ReferenciasPort";

export class PlantaApplicationService {
    private plantaPort!: PlantaPort;
    private referenciaPort!: ReferenciaPort;

    constructor(plantaPort: PlantaPort, referenciaPort: ReferenciaPort) {
        this.plantaPort = plantaPort;
        this.referenciaPort = referenciaPort;
    }

    async createPlanta(planta: Omit<Planta, "id_planta">): Promise<number> {
        const id = await this.plantaPort.createPlanta(planta);
        console.log(`[CREATE] Planta ${id} creada: ${planta.nombre_planta}`);
        return id;
    }

    async updatePlanta(id_planta: number, planta: Partial<Planta>): Promise<boolean> {
        const existing = await this.plantaPort.getPlantaById(id_planta);
        if (!existing) throw new Error("Planta no encontrada");

        const updated = await this.plantaPort.updatePlanta(id_planta, planta);
        if (updated) console.log(`[UPDATE] Planta ${id_planta} actualizada`);
        return updated;
    }

    async deactivatePlanta(id_planta: number): Promise<boolean> {
        const existing = await this.plantaPort.getPlantaById(id_planta);
        if (!existing) throw new Error("Planta no encontrada");

        const deleted = await this.plantaPort.deactivatePlanta(id_planta);
        if (deleted) console.log(`[DELETE] Planta ${id_planta} desactivada`);
        return deleted;
    }

    async getPlantaById(id_planta: number): Promise<Planta | null> {
        const planta = await this.plantaPort.getPlantaById(id_planta);
        console.log(`[GET] Planta ${id_planta} obtenida`);
        return planta;
    }

    async getPlantasByName(nombre: string): Promise<Planta[]> {
        const plantas = await this.plantaPort.getPlantasByName(nombre);
        console.log(`[SEARCH] Plantas con nombre "${nombre}" obtenidas: ${plantas.length} registros`);
        return plantas;
    }

    async getAllPlantas(): Promise<Planta[]> {
        const plantas = await this.plantaPort.getAllPlantas();
        console.log(`[GET ALL] Total de plantas obtenidas: ${plantas.length}`);
        return plantas;
    }

    async getReferenciasCompletas() {
        const [climas, tiposCultivo, temporadas, epocas, tiposSiembra, resistenciasFrio, luzSolar, plagas, cultivosAsociados, contenedores] = await Promise.all([
            this.referenciaPort.getClimas(),
            this.referenciaPort.getTiposCultivo(),
            this.referenciaPort.getTemporadas(),
            this.referenciaPort.getEpocas(),
            this.referenciaPort.getTiposSiembra(),
            this.referenciaPort.getResistenciasFrio(),
            this.referenciaPort.getLuzSolar(),
            this.referenciaPort.getPlagas(),
            this.referenciaPort.getCultivosAsociados(),
            this.referenciaPort.getTiposContenedores(),
        ]);

        console.log(`[REFERENCIAS] Datos de referencias obtenidos`);
        return { climas, tiposCultivo, temporadas, epocas, tiposSiembra, resistenciasFrio, luzSolar, plagas, cultivosAsociados, contenedores };
    }
}
