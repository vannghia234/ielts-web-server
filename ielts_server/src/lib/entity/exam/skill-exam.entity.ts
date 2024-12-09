import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
import { Skill } from 'src/shared/constant/enum_database';
import { ExamSkillDetail } from './exam-skill-detail.entity';

@Entity()
export class SkillExam {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'enum', enum: Skill, default: Skill.LISTENING })
	name: Skill;

	@Column({ type: 'time' })
	time: string;

	@ManyToOne(() => Exam, (type) => type.skillExam)
	exam: Exam;

	@OneToMany(
		() => ExamSkillDetail,
		(examSkillDetail) => examSkillDetail.skillExam,
	)
	details: ExamSkillDetail[];
}
