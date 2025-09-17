import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { PlantaEntity } from "../Planta/PlantaEntity";

@Entity({ name: "etapas" })
export class EtapaEntity {
    @PrimaryGeneratedColumn()
    id_etapa!: number;

    @ManyToOne(() => PlantaEntity) @JoinColumn({ name: "id_planta" })
    planta!: PlantaEntity;

    @Column({ type: "character varying", length: 100 })
    nombre_etapa!: string;

    @Column({ type: "int" })
    duracion_dias!: number;

    @Column({ type: "int" })
    orden!: number;
}
