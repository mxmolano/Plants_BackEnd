import { Cultivo } from './Cultivo';

export interface CultivoPort {

  createCultivo(cultivo: Omit<Cultivo, "id_cultivo">): Promise<number>;
  updateCultivo(id_cultivo: number, cultivo: Partial<Cultivo>): Promise<boolean>;
  deleteCultivo(id_cultivo: number): Promise<boolean>;
  getCultivoById(id_cultivo: number): Promise<Cultivo | null>;
  getUserCultivos(id_usuario: number): Promise<Cultivo[]>;

}
