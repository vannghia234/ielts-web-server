import { QuestionType } from 'src/shared/constant/enum_database';
import {
	Dropdown,
	DragAndDrop,
	MatchingHeading,
	FillTheBlank,
	MatchingFillBlank,
	MultipleChoice,
	MultipleResponse,
	IQuestion,
} from 'src/lib/entity/groupQuestion/QuestionType';
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Part } from '../part/Part.entity';
@Entity()
export class GroupQuestion {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column()
	instruction: string;
	@Column({
		type: 'enum',
		enum: QuestionType,
		default: QuestionType.MultipleChoice,
	})
	questionType: QuestionType;

	@Column('json')
	data: IQuestion[];

	@ManyToOne(() => Part, (part) => part.groupQuestions)
	part: Part;

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
