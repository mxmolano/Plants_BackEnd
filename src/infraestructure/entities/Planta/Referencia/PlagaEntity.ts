import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "plagas" })
export class PlagaEntity {
    @PrimaryGeneratedColumn()
    id_plaga!: number;

    @Column({ type: "character varying", length: 255 })
    nombre!: string;
}
