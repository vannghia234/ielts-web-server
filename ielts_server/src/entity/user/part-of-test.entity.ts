import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SkillTest } from './skill-test.entity';
import { GroupQuestion } from './group-question.entity';

@Entity()
export class PartOfTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  src: string;

  @ManyToOne(() => SkillTest, (type) => type.partOfTest)
  skillTest: SkillTest;

  @OneToMany(()=> GroupQuestion, (type)=> type.partOfTest)
  groupQuestion: GroupQuestion[]
}
