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
import { BandScoreEntity } from '../bandScore/bandScore.entity';

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

	@Column({ type: 'float4', nullable: true })
	avgScore: number;

	@ManyToOne(() => User, (type) => type.userAnswer)
	user: User;

	@OneToMany(() => UserExamProcess, (type) => type.userAnswer)
	processes: UserExamProcess[];

	calcAvg(numberOfSkillExam: number) {
		let totalScore = 0;
		const curNumberOfProcessFinished = this.processes.reduce(
			(total, process) => {
				if (Number.isFinite(process.totalScore)) {
					total += 1;
					totalScore += process.totalScore;
				}
				return total;
			},
			0,
		);
		if (curNumberOfProcessFinished !== numberOfSkillExam) return;

		this.avgScore = new BandScoreEntity().round(totalScore / numberOfSkillExam);
	}
}
