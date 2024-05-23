import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserAnswerDetail } from './user-answer-detail.entity';
import { UserExamProcess } from './user-exam-process.entity';

@Entity()
export class UserAnswer {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamp' })
	timeStart: Date;

	@ManyToOne(() => User, (type) => type.userAnswer)
	user: User;

	@OneToMany(() => UserAnswerDetail, (type) => type.userAnswer)
	userAnswerDetails: UserAnswerDetail[];

	@OneToMany(() => UserExamProcess, (type) => type.userAnswer)
	processes: UserExamProcess[];
}
