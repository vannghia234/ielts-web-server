import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupQuestion } from './group-question.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  src: string;

  @ManyToOne(() => GroupQuestion, (type) => type.question)
  groupQuestion: GroupQuestion;

  @OneToMany(() => Answer, (type) => type.question)
  answer: Answer[];
}
