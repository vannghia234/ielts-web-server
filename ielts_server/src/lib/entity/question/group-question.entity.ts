import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PartOfExam } from '../exam/part-of-exam.entity';
import { QuestionType } from 'src/shared/constant/enum_database';
import {
  Dropdown,
  FillTheBlank,
  Matching,
  MatchingFillBlank,
  MatchingHeading,
  MultipleChoice,
  MultipleReponse,
} from 'src/shared/constant/group-question_data_type';

@Entity()
export class GroupQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb' })
  data:  
  | MultipleChoice[]
  | MultipleReponse[]
  | Dropdown[]
  | Matching[]
  | MatchingHeading
  | FillTheBlank
  | MatchingFillBlank = [];

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @ManyToOne(() => PartOfExam, (type) => type.groupQuestion)
  partOfExam: PartOfExam;
}
