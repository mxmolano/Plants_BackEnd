export interface Tarea {
  id_tarea: number;
  id_cultivo: number;
  titulo: string;
  descripcion: string;        
  fecha_programada: string;    
  estado: boolean;             
  completada: boolean;         
}