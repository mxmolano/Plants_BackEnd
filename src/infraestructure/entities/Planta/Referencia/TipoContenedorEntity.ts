import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tipos_de_contenedor" })
export class TipoContenedorEntity {
    @PrimaryGeneratedColumn()
    id_tipo_de_contenedor!: number;

    @Column({ type: "character varying", length: 100 })
    nombre!: string;
}
