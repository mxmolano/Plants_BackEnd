import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "epocas" })
export class EpocaEntity {
    @PrimaryGeneratedColumn()
    id_epoca!: number;

    @Column({ type: "character varying", length: 100 })
    nombre!: string;

    @Column({ type: "text", nullable: true })
    descripcion!: string;

    @Column({ type: "character varying", length: 20 })
    tipo!: 'siembra' | 'cosecha';
}
