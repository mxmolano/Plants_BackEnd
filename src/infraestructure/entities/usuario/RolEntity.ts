import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "roles" })
export class RolEntity {
    @PrimaryGeneratedColumn()
    id_rol!: number;

    @Column({ type: "character varying", length: 50, unique: true })
    nombre_rol!: string;
}
