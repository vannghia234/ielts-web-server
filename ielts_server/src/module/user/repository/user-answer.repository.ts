import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import {
	FindOperator,
	FindOperators,
	FindOptionsUtils,
	In,
	Repository,
} from 'typeorm';

@Injectable()
export class UserAnswerRepository {
	constructor(
		@InjectRepository(UserAnswer)
		private userAnswerRepository: Repository<UserAnswer>,
	) {}

	async findAll(): Promise<UserAnswer[]> {
		return this.userAnswerRepository.find();
	}

	async findOne(id: string): Promise<UserAnswer | null> {
		const userAnswer = await this.userAnswerRepository.findOne({
			relations: ['processes'],
			where: { id: id },
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
}
