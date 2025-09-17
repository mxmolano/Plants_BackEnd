import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";

import { ClimaEntity } from "./Referencia/ClimaEntity";
import { CultivoAsociadoEntity } from "./Referencia/CultivoAsociadoEntity";
import { EpocaEntity } from "./Referencia/EpocaEntity ";
import { LuzSolarEntity } from "./Referencia/LuzSolarEntity ";
import { PlagaEntity } from "./Referencia/PlagaEntity";
import { ResistenciaFrioEntity } from "./Referencia/ResistenciaFrioEntity";
import { TemporadaEntity } from "./Referencia/TemporadaEntity";
import { TipoContenedorEntity } from "./Referencia/TipoContenedorEntity";
import { TipoCultivoEntity } from "./Referencia/TipoCultivoEntity";
import { TipoSiembraEntity } from "./Referencia/TipoSiembraEntity";



@Entity({ name: "plantas" })
export class PlantaEntity {
    @PrimaryGeneratedColumn()
    id_planta!: number;

    @Column({ type: "text", nullable: true })
    descripcion_planta!: string;

    @Column({ type: "character varying", length: 255 })
    nombre_planta!: string;

    @Column({ type: "character varying", length: 255, nullable: true })
    nombre_cientifico!: string;

    // Relaciones ManyToOne
    @ManyToOne(() => TipoCultivoEntity) @JoinColumn({ name: "id_tipo_cultivo" })
    tipo_cultivo!: TipoCultivoEntity;

    @ManyToOne(() => TemporadaEntity) @JoinColumn({ name: "id_temporada" })
    temporada!: TemporadaEntity;

    @ManyToOne(() => EpocaEntity) @JoinColumn({ name: "id_epoca" })
    epoca!: EpocaEntity;

    @ManyToOne(() => TipoSiembraEntity) @JoinColumn({ name: "id_tipo_siembra" })
    tipo_siembra!: TipoSiembraEntity;

    @ManyToOne(() => ClimaEntity) @JoinColumn({ name: "id_clima" })
    clima!: ClimaEntity;

    @ManyToOne(() => ResistenciaFrioEntity) @JoinColumn({ name: "id_resistencia_frio" })
    resistencia_frio!: ResistenciaFrioEntity;

    @ManyToOne(() => LuzSolarEntity) @JoinColumn({ name: "id_luz_solar" })
    luz_solar!: LuzSolarEntity;

    // Datos numéricos
    @Column({ type: "decimal", precision: 5, scale: 2 })
    temperatura_max!: number;

    @Column({ type: "decimal", precision: 5, scale: 2 })
    temperatura_mini!: number;

    @Column({ type: "text", nullable: true })
    descripcion_cli_temp!: string;

    @Column({ type: "text", nullable: true })
    descripcion_siembra!: string;

    @Column({ type: "text", nullable: true })
    profundidad_siembra!: string;

    @Column({ type: "text", nullable: true })
    distancia_siembra!: string;

    @Column({ type: "text", nullable: true })
    descripcion_mantenimiento!: string;

    @Column({ type: "int", nullable: true })
    dias_riego!: number;

    @Column({ type: "text", nullable: true })
    descripcion_cosecha!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    tiempo_cosecha!: string;

    @Column({ type: "boolean", default: true })
    estado!: boolean;

    // Relaciones ManyToMany
    @ManyToMany(() => PlagaEntity) @JoinTable({ name: "plantas_plagas" })
    plagas!: PlagaEntity[];

    @ManyToMany(() => CultivoAsociadoEntity) @JoinTable({ name: "plantas_cultivos_asociados" })
    cultivos_asociados!: CultivoAsociadoEntity[];

    @ManyToMany(() => TipoContenedorEntity) @JoinTable({ name: "plantas_contenedores" })
    contenedores!: TipoContenedorEntity[];
}
