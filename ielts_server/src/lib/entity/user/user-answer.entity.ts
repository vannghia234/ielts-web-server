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

	@Column({ type: 'timestamp', nullable: true })
	submittedAt: Date | null;

	@Column({ type: 'boolean', default: false })
	isSendByMail: boolean;

	@ManyToOne(() => User, (type) => type.userAnswer)
	user: User;

	@OneToMany(() => UserExamProcess, (type) => type.userAnswer)
	processes: UserExamProcess[];
}
