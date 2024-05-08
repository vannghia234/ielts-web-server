import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exam } from './exam.entity';
import { SkillExam } from './skill-exam.entity';
import { Part } from '../part/Part.entity';

@Entity()
export class ExamSkillDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Part, (type) => type.id)
  parts: Part;

  @ManyToOne(() => SkillExam, (type) => type.id)
  skillExam: SkillExam;

  @Column({ type: 'timestamp' })
  time: Date;
}
