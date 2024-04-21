import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum TestStatus {
  DRAFT = 'DRAFT',
  PUBLISHER = 'PUBLISHER',
  LOCK = 'LOCK',
}
@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  src: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  time: Date;

  @Column({ type: 'enum', enum: TestStatus, default: TestStatus.PUBLISHER })
  status: TestStatus;

  @Column()
  password: string;
}
