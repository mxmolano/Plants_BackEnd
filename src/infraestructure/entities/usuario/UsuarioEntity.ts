import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { RolEntity } from "./RolEntity";

@Entity({ name: "usuarios" })
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id_usuario!: number;

    @Column({ type: "character varying", length: 255 })
    nombre!: string;

    @Column({ type: "character varying", length: 255, unique: true })
    email!: string;

    @Column({ type: "character varying", length: 255 })
    password!: string;

    @Column({ type: "boolean", default: true })
    estado!: boolean;

    @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
    fecha_registro!: Date;

    @ManyToOne(() => RolEntity)
    @JoinColumn({ name: "id_rol" })
    rol!: RolEntity;
}
