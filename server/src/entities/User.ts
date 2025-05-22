import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string; // New email field

  @Column({ unique: true })
  username: string; // Username field

  @Column()
  password: string;

  @Column()
  role: 'Employee' | 'Manager' | 'Admin';
}
