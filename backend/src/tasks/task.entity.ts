import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: "pending" })
  status: string;
  @Column({ default: "medium" })
  priority: string;
  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  user: User;
}
