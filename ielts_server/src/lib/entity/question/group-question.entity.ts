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
  DragAndDropInterface,
  MultipleAnswerInterface,
  MultipleChoiceInterface,
  ShortAnswerInterface,
} from 'src/shared/constant/interface';

@Entity()
export class GroupQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb' })
  data:
    | MultipleChoiceInterface
    | DragAndDropInterface
    | ShortAnswerInterface
    | MultipleAnswerInterface;

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.MULTIPLE_ANSWER,
  })
  type: QuestionType;

  @ManyToOne(() => PartOfExam, (type) => type.groupQuestion)
  partOfExam: PartOfExam;
}
