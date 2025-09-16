import { CultivoPort } from "../domain/Cultivo/CultivoPort";
import { Cultivo } from "../domain/Cultivo/Cultivo";

export class CultivoApplicationService {
    private port!: CultivoPort;

    constructor(port: CultivoPort) {
        this.port = port;
    }

    async createCultivo(cultivo: Omit<Cultivo, "id_cultivo">): Promise<number> {
        if (!cultivo.fecha_inicio || isNaN(Date.parse(cultivo.fecha_inicio))) {
            throw new Error("La fecha de inicio no es válida.");
        }

        const id = await this.port.createCultivo(cultivo);
        console.log(`[CREATE] Cultivo ${id} creado para usuario ${cultivo.id_usuario}, planta ${cultivo.id_planta}`);
        return id;
    }

    async updateCultivo(id_cultivo: number, cultivo: Partial<Cultivo>): Promise<boolean> {
        const existing = await this.port.getCultivoById(id_cultivo);
        if (!existing) throw new Error("Cultivo no encontrado");

        if (cultivo.fecha_inicio && isNaN(Date.parse(cultivo.fecha_inicio))) {
            throw new Error("La fecha de inicio no es válida.");
        }

        const updated = await this.port.updateCultivo(id_cultivo, cultivo);
        if (updated) console.log(`[UPDATE] Cultivo ${id_cultivo} actualizado`);
        return updated;
    }

    async deleteCultivoById(id_cultivo: number): Promise<boolean> {
        const existing = await this.port.getCultivoById(id_cultivo);
        if (!existing) throw new Error("Cultivo no encontrado");

        const deleted = await this.port.deleteCultivo(id_cultivo);
        if (deleted) console.log(`[DELETE] Cultivo ${id_cultivo} eliminado`);
        return deleted;
    }

    async getCultivoById(id_cultivo: number): Promise<Cultivo | null> {
        const cultivo = await this.port.getCultivoById(id_cultivo);
        console.log(`[GET] Cultivo ${id_cultivo} obtenido`);
        return cultivo;
    }

    async getUserCultivos(id_usuario: number): Promise<Cultivo[]> {
        const cultivos = await this.port.getUserCultivos(id_usuario);
        console.log(`[GET] Cultivos del usuario ${id_usuario} obtenidos: ${cultivos.length}`);
        return cultivos;
    }
}
