import { Etapa } from "./Etapa";

export interface EtapaPort {
  getEtapasByPlanta(id_planta: number): Promise<Etapa[]>;

  createEtapa(etapa: Omit<Etapa, "id_etapa">): Promise<number>;
  updateEtapa(id_etapa: number, etapa: Partial<Etapa>): Promise<boolean>;
  deleteEtapa(id_etapa: number): Promise<boolean>;
}
