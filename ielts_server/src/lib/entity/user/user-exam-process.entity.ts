import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswer } from './user-answer.entity';
import { SkillExam } from '../exam/skill-exam.entity';
import { UserAnswerDetail } from './user-answer-detail.entity';

@Entity()
export class UserExamProcess {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'float4' })
	totalScore: number;

	@ManyToOne(() => UserAnswer, (type) => type.id)
	userAnswer: UserAnswer;

	@OneToMany(
		() => UserAnswerDetail,
		(userAnswerDetail) => userAnswerDetail.userExamProcess,
	)
	userAnswerDetails: UserAnswerDetail[];

	@ManyToOne(() => SkillExam, (type) => type.id)
	skillExam: SkillExam;
}
