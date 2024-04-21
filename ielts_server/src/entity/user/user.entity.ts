import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswer } from './user-answer.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  LECTURE = 'LECTURE',
  USER = 'USER',
  TEMPUSER = 'TEMPUSER',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  mail: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TEMPUSER,
  })
  role: UserRole;

  @OneToMany(() => UserAnswer, (type) => type.user)
  userAnswer: UserAnswer[];
}
