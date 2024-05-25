import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamSkillDetail } from '../exam/exam-skill-detail.entity';
import {
	MultipleChoice,
	MultipleResponse,
	Dropdown,
	DragAndDrop,
	MatchingHeading,
	FillTheBlank,
	MatchingFillBlank,
} from '../groupQuestion/QuestionType';
import { UserExamProcess } from './user-exam-process.entity';
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
		| DragAndDrop[]
		| MatchingHeading[]
		| FillTheBlank[]
		| MatchingFillBlank[];

	@Column({ type: 'text' })
	feedback: string;

	@ManyToOne(() => ExamSkillDetail, (type) => type.id)
	examDetail: ExamSkillDetail;

	@ManyToOne(() => UserExamProcess, (type) => type.id)
	userExamProcess: UserExamProcess;
}
