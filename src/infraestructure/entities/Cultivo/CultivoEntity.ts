import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UsuarioEntity } from "../usuario/UsuarioEntity";
import { PlantaEntity } from "../Planta/PlantaEntity";

@Entity({ name: "cultivos" })
export class CultivoEntity {
    @PrimaryGeneratedColumn()
    id_cultivo!: number;

    @ManyToOne(() => UsuarioEntity) @JoinColumn({ name: "id_usuario" })
    usuario!: UsuarioEntity;

    @ManyToOne(() => PlantaEntity) @JoinColumn({ name: "id_planta" })
    planta!: PlantaEntity;

    @Column({ type: "character varying", length: 150 })
    nombre_personalizado!: string;

    @Column({ type: "date" })
    fecha_inicio!: Date;

    @Column({ type: "boolean", default: true })
    estado!: boolean;
}
