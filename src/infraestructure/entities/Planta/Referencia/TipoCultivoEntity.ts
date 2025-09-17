import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tipos_cultivo" })
export class TipoCultivoEntity {
    @PrimaryGeneratedColumn()
    id_tipos_cultivo!: number;

    @Column({ type: "character varying", length: 100 })
    nombre!: string;

    @Column({ type: "text", nullable: true })
    descripcion!: string;
}
