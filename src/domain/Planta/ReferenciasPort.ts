// Exportar todos los tipos de referencia
export { Clima } from './Referencia/Clima';
export { CultivoAsociado } from './Referencia/CultivoAsociado';
export { Epoca } from './Referencia/Epoca';
export { LuzSolar } from './Referencia/LuzSolar';
export { Plaga } from './Referencia/Plaga';
export { ResistenciaFrio } from './Referencia/ResistenciaFrio';
export { Temporada } from './Referencia/Temporada';
export { TipoContenedor } from './Referencia/TipoContenedor';
export { TipoCultivo } from './Referencia/TipoCultivo';
export { TipoSiembra } from './Referencia/TipoSiembra';

// Interfaz del puerto de referencias
import { Clima } from './Referencia/Clima';
import { CultivoAsociado } from './Referencia/CultivoAsociado';
import { Epoca } from './Referencia/Epoca';
import { LuzSolar } from './Referencia/LuzSolar';
import { Plaga } from './Referencia/Plaga';
import { ResistenciaFrio } from './Referencia/ResistenciaFrio';
import { Temporada } from './Referencia/Temporada';
import { TipoContenedor } from './Referencia/TipoContenedor';
import { TipoCultivo } from './Referencia/TipoCultivo';
import { TipoSiembra } from './Referencia/TipoSiembra';

export interface ReferenciaPort {
  getClimas(): Promise<Clima[]>;
  getTiposCultivo(): Promise<TipoCultivo[]>;
  getTemporadas(): Promise<Temporada[]>;
  getEpocas(): Promise<Epoca[]>;
  getTiposSiembra(): Promise<TipoSiembra[]>;
  getResistenciasFrio(): Promise<ResistenciaFrio[]>;
  getLuzSolar(): Promise<LuzSolar[]>;
  getPlagas(): Promise<Plaga[]>;
  getCultivosAsociados(): Promise<CultivoAsociado[]>;
  getTiposContenedores(): Promise<TipoContenedor[]>;
}
