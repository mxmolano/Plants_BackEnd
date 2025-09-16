import { Tarea } from './Tarea';

export interface TareaPort {
  createTarea(tarea: Omit<Tarea, "id_tarea">): Promise<number>;
  updateTarea(id_tarea: number, tarea: Partial<Tarea>): Promise<boolean>;
  deleteTarea(id_tarea: number): Promise<boolean>;
  getTareaById(id_tarea: number): Promise<Tarea | null>;
  getCultivoTareas(id_cultivo: number): Promise<Tarea[]>;
  getTareasByFecha(fecha: string): Promise<Tarea[]>;

}
