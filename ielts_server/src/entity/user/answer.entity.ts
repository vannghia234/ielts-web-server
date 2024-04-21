import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isCorrect: boolean;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Question, (type) => type.answer)
  question: Question;
}
