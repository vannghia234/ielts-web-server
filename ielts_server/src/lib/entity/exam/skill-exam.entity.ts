import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
import { Skill } from 'src/shared/enum/enum_database';

@Entity()
export class SkillExam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Skill, default: Skill.Listening })
  name: Skill;

  @ManyToOne(() => Exam, (type) => type.skillExam)
  exam: Exam;
}
