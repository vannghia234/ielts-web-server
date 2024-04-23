import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupQuestion } from '../question/group-question.entity';
import { Skill } from 'src/shared/enum/enum_database';

@Entity()
export class PartOfExam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  src: string;

  @Column({ type: 'enum', enum: Skill, default: Skill.Listening })
  skill: Skill;

  @OneToMany(() => GroupQuestion, (type) => type.partOfExam)
  groupQuestion: GroupQuestion[];
}
