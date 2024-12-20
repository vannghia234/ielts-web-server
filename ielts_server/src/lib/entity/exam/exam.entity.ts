import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SkillExam } from './skill-exam.entity';
import { TestStatus } from 'src/shared/constant/enum_database';

@Entity()
export class Exam {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	code: string;

	@Column()
	name: string;

	@Column()
	title: string;

	@Column()
	src: string;

	@Column({ type: 'text', default: '' })
	description: string;

	@Column({ type: 'time', default: '00:00:00' })
	time: string;

	@Column({ type: 'enum', enum: TestStatus, default: TestStatus.DRAFT })
	status: TestStatus;

	@Column({ default: '' })
	password: string;

	@OneToMany(() => SkillExam, (type) => type.exam)
	skillExam: SkillExam[];

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
