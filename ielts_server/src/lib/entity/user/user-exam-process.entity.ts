import {
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswer } from './user-answer.entity';
import { SkillExam } from '../exam/skill-exam.entity';

@Entity()
export class UserExamProcess {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => UserAnswer, (type) => type.id)
	userAnswer: UserAnswer;

	@ManyToOne(() => SkillExam, (type) => type.id)
	skillExam: SkillExam;
}
