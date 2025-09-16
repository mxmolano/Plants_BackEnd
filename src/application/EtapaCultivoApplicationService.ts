import { EtapaCultivoPort } from '../domain/Etapa/EtapaCultivo/EtapaCultivoPort';
import { EtapaCultivo } from '../domain/Etapa/EtapaCultivo/EtapaCultivo';

export class EtapaCultivoApplicationService {
    private port!: EtapaCultivoPort;

    constructor(port: EtapaCultivoPort) {
        this.port = port;
    }

    async createEtapasFromPlanta(id_cultivo: number, id_planta: number): Promise<boolean> {
        const result = await this.port.createEtapasFromPlanta(id_cultivo, id_planta);
        if (result) console.log(`[CREATE] Etapas copiadas al cultivo ${id_cultivo} desde planta ${id_planta}`);
        return result;
    }

    async updateEtapaCultivo(id_cultivo_etapa: number, etapaCultivo: Partial<EtapaCultivo>): Promise<boolean> {
        const existing = await this.port.getEtapaCultivoById(id_cultivo_etapa);
        if (!existing) throw new Error("Etapa del cultivo no encontrada");

        const updated = await this.port.updateEtapaCultivo(id_cultivo_etapa, etapaCultivo);
        if (updated) console.log(`[UPDATE] EtapaCultivo ${id_cultivo_etapa} actualizada`);
        return updated;
    }

    async deleteEtapaCultivoById(id_cultivo_etapa: number): Promise<boolean> {
        const existing = await this.port.getEtapaCultivoById(id_cultivo_etapa);
        if (!existing) throw new Error("Etapa del cultivo no encontrada");

        const deleted = await this.port.updateEtapaCultivo(id_cultivo_etapa, { estado: false });
        if (deleted) console.log(`[DELETE] EtapaCultivo ${id_cultivo_etapa} desactivada`);
        return deleted;
    }

    async getEtapaCultivoById(id_cultivo_etapa: number): Promise<EtapaCultivo | null> {
        const etapa = await this.port.getEtapaCultivoById(id_cultivo_etapa);
        console.log(`[GET] EtapaCultivo ${id_cultivo_etapa} obtenida`);
        return etapa;
    }

    async getEtapasByCultivo(id_cultivo: number): Promise<EtapaCultivo[]> {
        const etapas = await this.port.getEtapasByCultivo(id_cultivo);
        console.log(`[GET] Etapas de cultivo ${id_cultivo} obtenidas: ${etapas.length}`);
        return etapas;
    }
}
