import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PartOfTest } from './part-of-test.entity';
import { Question } from './question.entity';

@Entity()
export class GroupQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => PartOfTest, (type) => type.groupQuestion)
  partOfTest: PartOfTest;

  @OneToMany(() => Question, (type) => type.groupQuestion)
  question: Question[];
  
}
