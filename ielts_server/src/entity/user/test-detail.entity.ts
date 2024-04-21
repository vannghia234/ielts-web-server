import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PartOfTest } from './part-of-test.entity';
import { Test } from './test.entity';
export enum TestStatus {
  RELEASE = 'RELEASE',
  NOT_RELEASE = 'RELEASE',
}
@Entity()
export class TestDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=> PartOfTest, (type)=> type.id)
  partOfTest: PartOfTest
  
  @ManyToOne(()=> Test, (type)=> type.id)
  test: Test

  @Column({ type: 'timestamp' })
  time: Date;
}
