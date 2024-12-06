import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserAnswer } from './user-answer.entity';
import { SkillExam } from '../exam/skill-exam.entity';
import { UserAnswerDetail } from './user-answer-detail.entity';

@Entity()
export class UserExamProcess {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'float4', nullable: true })
	totalScore: number | null;

	@ManyToOne(() => UserAnswer, (type) => type.id)
	userAnswer: UserAnswer;

	@OneToMany(
		() => UserAnswerDetail,
		(userAnswerDetail) => userAnswerDetail.userExamProcess,
	)
	userAnswerDetails: UserAnswerDetail[];

	@ManyToOne(() => SkillExam, (type) => type.id)
	skillExam: SkillExam;

	@CreateDateColumn({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;
}
