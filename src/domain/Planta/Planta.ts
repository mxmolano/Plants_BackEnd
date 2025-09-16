export interface Planta {
  // Identificación
  id_planta: number;
  nombre_planta: string;
  nombre_cientifico: string;
  descripcion_planta: string;

  // Siembra
  id_tipo_cultivo: number;
  id_tipo_siembra: number;
  id_temporada: number;        
  id_epoca: number;     
  descripcion_siembra: string;
  profundidad_siembra: string;
  distancia_siembra: string;

  // Condiciones ambientales
  id_clima: number;
  id_resistencia_frio: number;
  temperatura_mini: number;
  temperatura_max: number;
  id_luz_solar: number;
  descripcion_cli_temp: string;

  // Mantenimiento
  descripcion_mantenimiento: string;
  dias_riego: number;

  // Cosecha
  descripcion_cosecha: string;
  tiempo_cosecha: string;

  // Estado
  estado: boolean; // borrada lógicamente

  // Relaciones múltiples (N:M)
  plagas: number[];
  cultivos_asociados: number[];
  contenedores: number[];
}
