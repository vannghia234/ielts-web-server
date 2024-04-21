import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestDetail } from './test-detail.entity';
import { UserAnswer } from './user-answer.entity';

@Entity()
export class UserAnswerDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

  @Column()
  answer: string;

  @Column({ type: 'text' })
  feedback: string;

  @ManyToOne(() => TestDetail, (type) => type.id)
  testDetail: TestDetail;

  @ManyToOne(() => UserAnswer, (type) => type.id)
  userAnswer: UserAnswer;
}
