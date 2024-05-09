import { QuestionType } from 'src/shared/constant/enum_database';
import {
  Dropdown,
  Matching,
  MatchingHeading,
  FillTheBlank,
  MatchingFillBlank,
  MultipleChoice,
  MultipleResponse,
} from 'src/lib/entity/groupQuestion/QuestionType';
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
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
  data:
    | MultipleChoice[]
    | MultipleResponse[]
    | Dropdown[]
    | Matching[]
    | MatchingHeading[]
    | FillTheBlank[]
    | MatchingFillBlank[];

  @ManyToOne(() => Part, (part) => part.groupQuestions, { onDelete: 'CASCADE' })
  part: Part;
  groupQuestion: Promise<Part>;
}
