import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exam } from './exam.entity';
import { SkillExam } from './skill-exam.entity';
import { Part } from '../part/Part.entity';

@Entity()
export class ExamSkillDetail {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'time', default: '00:04:00' })
	time: string;
	
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

	@ManyToOne(() => Part, (type) => type.id)
	part: Part;

	@ManyToOne(() => SkillExam, (type) => type.id)
	skillExam: SkillExam;

}
