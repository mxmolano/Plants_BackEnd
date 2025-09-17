import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cultivos_asociados" })
export class CultivoAsociadoEntity {
    @PrimaryGeneratedColumn()
    id_cultivo_asociado!: number;

    @Column({ type: "character varying", length: 255 })
    nombre!: string;

    @Column({ type: "character varying", length: 20 })
    tipo!: 'beneficioso' | 'perjudicial';
}
