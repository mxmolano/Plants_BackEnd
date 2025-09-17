import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "temporadas" })
export class TemporadaEntity {
    @PrimaryGeneratedColumn()
    id_temporada!: number;

    @Column({ type: "character varying", length: 100 })
    nombre!: string;

    @Column({ type: "text", nullable: true })
    descripcion!: string;

    @Column({ type: "character varying", length: 20 })
    tipo!: 'siembra' | 'cosecha';
}
