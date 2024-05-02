import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PartOfExam } from '../exam/part-of-exam.entity';
import { QuestionType } from 'src/shared/constant/enum_database';
import {} from 'src/shared/constant/interface';
import {
  DragAndDrop,
  MultipleAnswer,
  MultipleChoice,
  ShortAnswer,
} from 'src/shared/constant/object';

@Entity()
export class GroupQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb' })
  data: MultipleChoice | DragAndDrop | ShortAnswer | MultipleAnswer;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @ManyToOne(() => PartOfExam, (type) => type.groupQuestion)
  partOfExam: PartOfExam;
}
