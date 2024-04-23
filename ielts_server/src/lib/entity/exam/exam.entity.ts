import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SkillExam } from './skill-exam.entity';
import { TestStatus } from 'src/shared/enum/enum_database';

@Entity()
export class Exam {
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

  @Column({ type: 'enum', enum: TestStatus, default: TestStatus.DRAFT })
  status: TestStatus;

  @Column()
  password: string;

  @OneToMany(() => SkillExam, (type) => type.exam)
  skillExam: SkillExam[];
}
