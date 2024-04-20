import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
