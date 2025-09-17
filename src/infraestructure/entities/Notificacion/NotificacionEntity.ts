import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UsuarioEntity } from "../usuario/UsuarioEntity";

@Entity({ name: "notificaciones" })
export class NotificacionEntity {
    @PrimaryGeneratedColumn()
    id_notificacion!: number;

    @ManyToOne(() => UsuarioEntity) @JoinColumn({ name: "id_usuario" })
    usuario!: UsuarioEntity;

    @Column({ type: "text" })
    mensaje!: string;

    @Column({ type: "character varying", length: 50, nullable: true })
    tipo!: string;

    @Column({ type: "boolean", default: true })
    estado!: boolean;

    @Column({ type: "boolean", default: false })
    visto!: boolean;

    @Column({ type: "varchar", length: 255, nullable: true })
    enlace!: string;

    @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
    fecha_creacion!: Date;
}
