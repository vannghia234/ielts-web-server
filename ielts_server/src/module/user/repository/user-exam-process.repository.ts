import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExamProcess } from 'src/lib/entity/user/user-exam-process.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserExamProcessRepository {
	constructor(
		@InjectRepository(UserExamProcess)
		private readonly userExamProcess: Repository<UserExamProcess>,
	) {}

	async findAll(): Promise<UserExamProcess[]> {
		return this.userExamProcess.find({
			relations: {
				skillExam: true,
				userAnswer: true,
				userAnswerDetails: true,
			},
		});
	}

	async findByUserAnswerId(userAnswerId: string): Promise<UserExamProcess[]> {
		try {
			const userExamProcess = await this.userExamProcess.find({
				relations: {
					skillExam: true,
					userAnswer: true,
					userAnswerDetails: true,
				},
				where: { userAnswer: { id: userAnswerId } },
			});

			return userExamProcess;
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: string): Promise<UserExamProcess | null> {
		const process = await this.userExamProcess.findOne({
			relations: {
				skillExam: {
					exam: {
						skillExam: true,
					},
				},
				userAnswer: true,
				userAnswerDetails: true,
			},
			where: { id: id },
		});
		if (!process) {
			throw new NotFoundException('Process not found');
		}
		return process;
	}

	async create(data: UserExamProcess): Promise<UserExamProcess> {
		try {
			const result = this.userExamProcess.create(data);
			return this.userExamProcess.save(result);
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, data: any): Promise<UserExamProcess> {
		const instance = await this.findOne(id);
		await this.userExamProcess.update({ id: id }, data);
		return this.findOne(id);
	}

	async delete(id: string): Promise<number> {
		const result = await this.userExamProcess.delete(id);
		return result.affected;
	}

	async deleteByUserAnswerId(userAnswerId: string) {
		try {
			return this.userExamProcess.delete({
				userAnswer: { id: userAnswerId },
			});
		} catch (error) {
			throw error;
		}
	}
}
