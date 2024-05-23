import { Injectable } from '@nestjs/common';
import { UserExamProcessRepository } from '../repository/user-exam-process.repository';
import { UserAnswerRepository } from '../repository/user-answer.repository';
import { SkillExamRepository } from 'src/module/exam/repository/skill-exam.repository';
import { UserExamProcess } from 'src/lib/entity/user/user-exam-process.entity';
import { UpdateUserExamProcessDTO } from '../dto/update-user-exam-process.dto';

@Injectable()
export class UserExamProcessService {
	constructor(
		private readonly userExamProcessRepository: UserExamProcessRepository,
		private readonly userAnswerRepository: UserAnswerRepository,
		private readonly examSkillRepository: SkillExamRepository,
	) {}

	async findAll(): Promise<UserExamProcess[]> {
		return this.userExamProcessRepository.findAll();
	}

	async findGroup(userAnswerId: string) {
		try {
			return this.userExamProcessRepository.findByUserAnswerId(userAnswerId);
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: string): Promise<UserExamProcess> {
		try {
			const data = await this.userExamProcessRepository.findOne(id);
			return data;
		} catch (error) {
			throw error;
		}
	}

	async create(data: UpdateUserExamProcessDTO): Promise<UserExamProcess> {
		try {
			const examProcess = new UserExamProcess();
			examProcess.userAnswer = await this.userAnswerRepository.findOne(
				data.userAnswerId,
			);
			examProcess.skillExam = await this.examSkillRepository.findOne(
				data.skillExamId,
			);
			const result = await this.userExamProcessRepository.create(examProcess);

			return result;
		} catch (error) {
			throw error;
		}
	}

	async update(
		id: string,
		data: UpdateUserExamProcessDTO,
	): Promise<UserExamProcess> {
		try {
			const userExamProcess = await this.userExamProcessRepository.findOne(id);
			userExamProcess.skillExam = await this.examSkillRepository.findOne(
				data.skillExamId,
			);
			userExamProcess.userAnswer = await this.userAnswerRepository.findOne(
				data.userAnswerId,
			);

			const result = await this.userExamProcessRepository.update(
				id,
				userExamProcess,
			);
			return result;
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<number> {
		try {
			const result = await this.userExamProcessRepository.delete(id);
			return result;
		} catch (error) {
			throw error;
		}
	}

	async deleteGroup(userAnswerId: string) {
		try {
			const result = await this.userExamProcessRepository.deleteByUserAnswerId(
				userAnswerId,
			);
			return result;
		} catch (error) {
			throw error;
		}
	}
}
