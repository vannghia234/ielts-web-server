import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PartOfTest } from './part-of-test.entity';

@Entity()
export class SkillTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(()=> PartOfTest, (type)=> type.skillTest)
  partOfTest: PartOfTest[]
}
