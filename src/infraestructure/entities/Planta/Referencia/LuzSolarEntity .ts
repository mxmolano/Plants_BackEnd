import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "luz_solar" })
export class LuzSolarEntity {
    @PrimaryGeneratedColumn()
    id_luz_solar!: number;

    @Column({ type: "character varying", length: 100 })
    nombre!: string;

    @Column({ type: "text", nullable: true })
    descripcion!: string;
}
