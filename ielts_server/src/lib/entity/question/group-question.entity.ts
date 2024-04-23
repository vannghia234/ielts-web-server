import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PartOfExam } from '../exam/part-of-exam.entity';
import { Question } from './question.entity';
import { QuestionType } from 'src/shared/enum/enum_database';

@Entity()
export class GroupQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => PartOfExam, (type) => type.groupQuestion)
  partOfExam: PartOfExam;

  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.OneChoice })
  type: QuestionType;

  @OneToMany(() => Question, (type) => type.groupQuestion)
  question: Question[];
}
