import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamSkillDetail } from '../exam/exam-skill-detail.entity';
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

  @ManyToOne(() => ExamSkillDetail, (type) => type.id)
  examDetail: ExamSkillDetail;

  @ManyToOne(() => UserAnswer, (type) => type.id)
  userAnswer: UserAnswer;
}
