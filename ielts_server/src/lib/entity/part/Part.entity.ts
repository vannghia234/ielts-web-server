import { Skill, PartNumber } from 'src/shared/constant/enum_database';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  getRepository,
} from 'typeorm';
import { GroupQuestion } from '../groupQuestion/GroupQuestion.entity';

@Entity()
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column({ unique: true })
  publicId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  resource: string;

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
