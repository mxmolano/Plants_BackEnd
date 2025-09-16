export interface Temporada {
  id_temporada: number;
  nombre: string;
  descripcion: string;
  tipo: 'siembra' | 'cosecha';
}