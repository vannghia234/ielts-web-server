import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionType } from 'src/shared/constant/enum_database';
import {
	Dropdown,
	FillTheBlank,
	Matching,
	MatchingFillBlank,
	MatchingHeading,
	MultipleChoice,
	MultipleResponse,
} from 'src/shared/constant/group-question_data_type';
import { Part } from '../part/Part.entity';

@Entity()
export class GroupQuestion {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'jsonb' })
	data:
		| MultipleChoice[]
		| MultipleResponse[]
		| Matching[]
		| MatchingHeading
		| FillTheBlank
		| MatchingFillBlank = [];

	@Column({
		type: 'enum',
		enum: QuestionType,
	})
	type: QuestionType;

	@ManyToOne(() => Part, (type) => type.groupQuestions)
	partOfExam: Part;
}
