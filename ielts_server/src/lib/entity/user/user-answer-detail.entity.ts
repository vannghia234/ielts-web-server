import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamSkillDetail } from '../exam/exam-skill-detail.entity';
import { UserAnswer } from './user-answer.entity';
import {
<<<<<<< HEAD
	MultipleChoice,
	MultipleResponse,
	Dropdown,
	DragAndDrop,
	MatchingHeading,
	FillTheBlank,
	MatchingFillBlank,
=======
  MultipleChoice,
  MultipleResponse,
  Dropdown,
  DragAndDrop,
  MatchingHeading,
  FillTheBlank,
  MatchingFillBlank,
>>>>>>> c3ba1a2 (fix)
} from '../groupQuestion/QuestionType';
import { Matching } from 'src/shared/constant/group-question_data_type';
@Entity()
export class UserAnswerDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

<<<<<<< HEAD
	@Column({ type: 'jsonb' })
	answer:
		| MultipleChoice[]
		| MultipleResponse[]
		| Dropdown[]
		| DragAndDrop[]
		| MatchingHeading[]
		| FillTheBlank[]
		| MatchingFillBlank[];
=======
  @Column({ type: 'jsonb' })
  answer:
    | MultipleChoice[]
    | MultipleResponse[]
    | Dropdown[]
    | DragAndDrop[]
    | MatchingHeading[]
    | FillTheBlank[]
    | MatchingFillBlank[];
>>>>>>> c3ba1a2 (fix)

  @Column({ type: 'text' })
  feedback: string;

  @ManyToOne(() => ExamSkillDetail, (type) => type.id)
  examDetail: ExamSkillDetail;

  @ManyToOne(() => UserAnswer, (type) => type.id)
  userAnswer: UserAnswer;
}
