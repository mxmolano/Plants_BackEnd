import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tipos_siembra" })
export class TipoSiembraEntity {
    @PrimaryGeneratedColumn()
    id_tipo_siembra!: number;

    @Column({ type: "character varying", length: 100 })
    nombre!: string;

    @Column({ type: "text", nullable: true })
    descripcion!: string;
}
