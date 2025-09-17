import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CultivoEntity } from "../Cultivo/CultivoEntity";

@Entity({ name: "tareas" })
export class TareaEntity {
    @PrimaryGeneratedColumn()
    id_tarea!: number;

    @ManyToOne(() => CultivoEntity) @JoinColumn({ name: "id_cultivo" })
    cultivo!: CultivoEntity;

    @Column({ type: "character varying", length: 255 })
    titulo!: string;

    @Column({ type: "text", nullable: true })
    descripcion!: string;

    @Column({ type: "date" })
    fecha_programada!: Date;

    @Column({ type: "boolean", default: true })
    estado!: boolean;

    @Column({ type: "boolean", default: false })
    completada!: boolean;
}
