import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "resistencia_frio" })
export class ResistenciaFrioEntity {
    @PrimaryGeneratedColumn()
    id_resistencia_frio!: number;

    @Column({ type: "character varying", length: 100 })
    nombre!: string;

    @Column({ type: "text", nullable: true })
    descripcion!: string;
}
