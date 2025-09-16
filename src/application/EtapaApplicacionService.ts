import { EtapaPort } from "../domain/Etapa/EtapaPort";
import { Etapa } from "../domain/Etapa/Etapa";

export class EtapaApplicationService {
    private port!: EtapaPort;

    constructor(port: EtapaPort) {
        this.port = port;
    }

    async createEtapa(etapa: Omit<Etapa, "id_etapa">): Promise<number> {
        const id = await this.port.createEtapa(etapa);
        console.log(`[CREATE] Etapa ${id} creada para planta ${etapa.id_planta}: ${etapa.nombre_etapa}`);
        return id;
    }

    async updateEtapa(id_etapa: number, etapa: Partial<Etapa>): Promise<boolean> {
        const etapas = await this.port.getEtapasByPlanta(etapa.id_planta || 0);
        const existing = etapas.find(e => e.id_etapa === id_etapa);
        if (!existing) throw new Error("Etapa no encontrada");

        const updated = await this.port.updateEtapa(id_etapa, etapa);
        if (updated) console.log(`[UPDATE] Etapa ${id_etapa} actualizada`);
        return updated;
    }

    async deleteEtapa(id_etapa: number): Promise<boolean> {
        const etapas = await this.port.getEtapasByPlanta(0);
        const existing = etapas.find(e => e.id_etapa === id_etapa);
        if (!existing) throw new Error("Etapa no encontrada");

        const deleted = await this.port.deleteEtapa(id_etapa);
        if (deleted) console.log(`[DELETE] Etapa ${id_etapa} eliminada`);
        return deleted;
    }

    async getEtapasByPlanta(id_planta: number): Promise<Etapa[]> {
        const etapas = await this.port.getEtapasByPlanta(id_planta);
        console.log(`[GET] Etapas de planta ${id_planta} obtenidas: ${etapas.length}`);
        return etapas;
    }
}
