import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamSkillDetail } from '../exam/exam-skill-detail.entity';
import { UserAnswer } from './user-answer.entity';
import {
	MultipleChoice,
	MultipleResponse,
	Dropdown,
	MatchingHeading,
	FillTheBlank,
	MatchingFillBlank,
} from '../groupQuestion/QuestionType';
import { Matching } from 'src/shared/constant/group-question_data_type';
@Entity()
export class UserAnswerDetail {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	score: number;

	@Column({ type: 'jsonb' })
	answer:
		| MultipleChoice[]
		| MultipleResponse[]
		| Dropdown[]
		| Matching[]
		| MatchingHeading[]
		| FillTheBlank[]
		| MatchingFillBlank[];

	@Column({ type: 'text' })
	feedback: string;

	@ManyToOne(() => ExamSkillDetail, (type) => type.id)
	examDetail: ExamSkillDetail;

	@ManyToOne(() => UserAnswer, (type) => type.id)
	userAnswer: UserAnswer;
}
