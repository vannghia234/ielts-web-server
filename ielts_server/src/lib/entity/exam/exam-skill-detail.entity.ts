import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PartOfExam } from './part-of-exam.entity';
import { Exam } from './exam.entity';
import { SkillExam } from './skill-exam.entity';

@Entity()
export class ExamSkillDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => PartOfExam, (type) => type.id)
  partOfTest: PartOfExam;

  @ManyToOne(() => SkillExam, (type) => type.id)
  skillExam: SkillExam;

  @Column({ type: 'timestamp' })
  time: Date;
}
