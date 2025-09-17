import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CultivoEntity } from "../Cultivo/CultivoEntity";
import { EtapaEntity } from "./EtapaEntity";

export enum EstadoEtapaEnum {
    PENDIENTE = "pendiente",
    EN_PROGRESO = "en-progreso",
    COMPLETADA = "completada"
}

@Entity({ name: "cultivos_etapas" })
export class EtapaCultivoEntity {
    @PrimaryGeneratedColumn({ name: "id_cultivo_estapa" })
    id_cultivo_etapa!: number;

    @ManyToOne(() => CultivoEntity) @JoinColumn({ name: "id_cultivo" })
    cultivo!: CultivoEntity;

    @ManyToOne(() => EtapaEntity) @JoinColumn({ name: "id_etapa" })
    etapa!: EtapaEntity;

    @Column({ type: "date" })
    fecha_inicio!: Date;

    @Column({ type: "date", nullable: true })
    fecha_fin!: Date;

    @Column({ type: "boolean", default: true })
    estado!: boolean;

    @Column({ type: "enum", enum: EstadoEtapaEnum, default: EstadoEtapaEnum.PENDIENTE })
    estado_etapa!: EstadoEtapaEnum;
}
