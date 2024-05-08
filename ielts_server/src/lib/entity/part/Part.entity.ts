import { Skill, PartNumber } from 'src/shared/constant/enum_database';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupQuestion } from '../groupQuestion/GroupQuestion.entity';

@Entity()
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: Skill,
    default: Skill.LISTENING,
  })
  skill: Skill;

  @Column({
    type: 'enum',
    enum: PartNumber,
    default: PartNumber.Part1,
  })
  partNumber: PartNumber;

  @OneToMany(() => GroupQuestion, (groupQuestion) => groupQuestion.part)
  groupQuestions: GroupQuestion[];
}
