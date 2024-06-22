import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamSkillDetail } from '../exam/exam-skill-detail.entity';
import { UserExamProcess } from './user-exam-process.entity';
import { IGroupAnswer } from './i-user-answer-detail-answer.interface';
@Entity()
export class UserAnswerDetail {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'float4', nullable: true })
	score: number | null; // number of correct answers.

	@Column({ type: 'jsonb' })
	answer: IGroupAnswer[];

	@Column({ type: 'text' })
	feedback: string;

	// #region relationship
	@ManyToOne(() => ExamSkillDetail, (type) => type.id)
	examDetail: ExamSkillDetail;

	@ManyToOne(() => UserExamProcess, (type) => type.id)
	userExamProcess: UserExamProcess;
	// #endregion relationship
}
