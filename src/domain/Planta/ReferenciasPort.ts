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
