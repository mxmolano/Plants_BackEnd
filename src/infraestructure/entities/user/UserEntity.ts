import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" }) 
export class UserEntity {
  @PrimaryGeneratedColumn()
  id_user!: number;

  @Column({ type: "character varying", length: 225 })
  name_user!: string;

  @Column({ type: "character varying", length: 225, unique: true })
  email_user!: string;

  @Column({ type: "character varying", length: 225 })
  password_user!: string;

  @Column({ type: "int" })
  status_user!: number;
}
