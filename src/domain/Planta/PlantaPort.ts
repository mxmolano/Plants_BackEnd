import { Planta } from './Planta';

export interface PlantaPort {
  // CRUD de plantas
  createPlanta(planta: Omit<Planta, "id_planta">): Promise<number>;
  updatePlanta(id_planta: number, planta: Partial<Planta>): Promise<boolean>;
  deactivatePlanta(id_planta: number): Promise<boolean>; // soft delete
  
  getPlantaById(id_planta: number): Promise<Planta | null>;
  getPlantasByName(nombre: string): Promise<Planta[]>;
  getAllPlantas(): Promise<Planta[]>;
  

}
