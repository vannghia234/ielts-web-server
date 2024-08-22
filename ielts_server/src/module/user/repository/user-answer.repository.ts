import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import {
	And,
	Between,
	FindOperator,
	In,
	LessThan,
	LessThanOrEqual,
	MoreThanOrEqual,
	Repository,
} from 'typeorm';
import { ConvertUser } from '../dto/user.convert';

@Injectable()
export class UserAnswerRepository {
	constructor(
		@InjectRepository(UserAnswer)
		private userAnswerRepository: Repository<UserAnswer>,
	) {}

	async findAll(): Promise<UserAnswer[]> {
		return this.userAnswerRepository.find();
	}

	async findAllWithRelation(): Promise<UserAnswer[]> {
		return await this.userAnswerRepository.find({
			relations: {
				processes: {
					skillExam: {
						exam: true,
					},
					userAnswerDetails: {
						examDetail: {
							skillExam: {
								exam: true,
							},
							part: {
								groupQuestions: true,
							},
						},
					},
				},
				user: true,
			},
			order: {
				submittedAt: 'desc',
			},
			select: {
				user: {
					id: true,
					name: true,
					mail: true,
					role: true,
					createdAt: true,
				},
			},
			take: 50,
		});
	}

	async findAllWithRelationByExam(code: string): Promise<UserAnswer[]> {
		return this.userAnswerRepository.find({
			relations: {
				user: true,
				processes: {
					skillExam: {
						exam: true,
					},
					userAnswerDetails: {
						examDetail: {
							skillExam: {
								exam: true,
							},
							part: {
								groupQuestions: true,
							},
						},
					},
				},
			},
			where: {
				processes: {
					userAnswerDetails: {
						examDetail: {
							skillExam: {
								exam: {
									code: code,
								},
							},
							part: {
								groupQuestions: true,
							},
						},
					},
				},
			},
			order: {
				submittedAt: 'desc',
			},
		});
	}

	async findAllByExam(code: string): Promise<UserAnswer[]> {
		return await this.userAnswerRepository.find({
			relations: {
				processes: {
					skillExam: {
						exam: true,
					},
				},
			},
			where: {
				processes: {
					skillExam: {
						exam: {
							code: code,
						},
					},
				},
			},
		});
	}

	async findByUserId(userId: string) {
		return this.userAnswerRepository.find({
			relations: {
				user: true,
				processes: {
					skillExam: {
						exam: true,
					},
					userAnswerDetails: {
						examDetail: {
							part: {
								groupQuestions: true,
							},
						},
					},
				},
			},
			where: {
				user: {
					id: userId,
				},
			},
		});
	}

	async findOne(id: string): Promise<UserAnswer | null> {
		const userAnswer = await this.userAnswerRepository.findOne({
			relations: {
				processes: {
					userAnswerDetails: {
						examDetail: {
							part: {
								groupQuestions: true,
							},
						},
					},
					skillExam: true,
				},
			},
			where: { id: id },
		});
		if (!userAnswer) {
			throw new NotFoundException('User answer not found');
		}
		return userAnswer;
	}

	async findOneByProcess(answerProcessId: string) {
		const userAnswer = await this.userAnswerRepository.findOne({
			where: {
				processes: {
					id: answerProcessId,
				},
			},
		});
		if (!userAnswer) {
			throw new NotFoundException('User answer not found');
		}
		return userAnswer;
	}

	async findOneRecentBySkillExamId(
		skillExamIds: string[],
	): Promise<UserAnswer> | null {
		const data = await this.userAnswerRepository.find({
			relations: {
				processes: {
					userAnswerDetails: true,
					skillExam: true,
				},
			},
			where: {
				processes: {
					skillExam: {
						id: In(skillExamIds),
					},
				},
			},
			order: {
				timeStart: 'DESC',
			},
		});
		// console.log(data);

		if (data.length > 0) return data[0];
		return null;
	}

	async create(userAnswer: Partial<UserAnswer>): Promise<UserAnswer> {
		const result = await this.userAnswerRepository.save(userAnswer);
		result.processes = [];
		return result;
	}

	async update(
		id: string,
		updateUserAnswer: Partial<UserAnswer>,
	): Promise<UserAnswer> {
		await this.findOne(id); // Ensure user answer exists
		await this.userAnswerRepository.update(id, updateUserAnswer);
		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const result = await this.userAnswerRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException('User answer not found');
		}
	}

	async statisticExam() {
		const date = new Date();
		const currentMonth = date.toLocaleString('default', { month: 'numeric' });
		const currentYear = date.toLocaleString('default', { year: 'numeric' });
		const startDate = new Date(
			Number.parseInt(currentYear),
			Number.parseInt(currentMonth) - 1,
			1,
		);
		const endDate = new Date(
			Number.parseInt(currentYear),
			Number.parseInt(currentMonth),
			1,
		);
		const data = await this.userAnswerRepository.find({
			relations: {
				user: true,
				processes: {
					skillExam: {
						exam: true,
					},
				},
			},
			where: {
				timeStart: Between(startDate, endDate),
			},
			select: {
				user: {
					id: true,
					mail: true,
					name: true,
				},
			},
		});
		return data;
	}
}
