import { EtapaCultivo } from "./EtapaCultivo";

export interface EtapaCultivoPort {
  createEtapasFromPlanta(id_cultivo: number, id_planta: number): Promise<boolean>;
  getEtapasByCultivo(id_cultivo: number): Promise<EtapaCultivo[]>;
  getEtapaCultivoById(id_cultivo_etapa: number): Promise<EtapaCultivo | null>;

  updateEtapaCultivo(
    id_cultivo_etapa: number,
    etapaCultivo: Partial<EtapaCultivo>
  ): Promise<boolean>;
}
