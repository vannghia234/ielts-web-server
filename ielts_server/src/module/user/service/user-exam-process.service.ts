import { Injectable } from '@nestjs/common';
import { UserExamProcessRepository } from '../repository/user-exam-process.repository';
import { UserAnswerRepository } from '../repository/user-answer.repository';
import { SkillExamRepository } from 'src/module/exam/repository/skill-exam.repository';
import { UserExamProcess } from 'src/lib/entity/user/user-exam-process.entity';
import { UpdateUserExamProcessDTO } from '../dto/update-user-exam-process.dto';
import { UserAnswerDetailRepository } from '../repository/user-answer-detail.repository';
import { UpdateUserAnswerProcessDTO } from '../dto/update-user-answer-process';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { BandScoreEntity } from 'src/lib/entity/bandScore/bandScore.entity';
import { MailService } from 'src/shared/service/mail.service';

@Injectable()
export class UserExamProcessService {
	constructor(
		private readonly userExamProcessRepository: UserExamProcessRepository,
		private readonly userAnswerRepository: UserAnswerRepository,
		private readonly examSkillRepository: SkillExamRepository,
		private readonly userAnswerDetailRepository: UserAnswerDetailRepository,
		private readonly mailService: MailService,
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

	async updateScore(id: string, score: number) {
		return this.userExamProcessRepository.update(id, { totalScore: score });
	}

	async updateScoreDeep(data: UpdateUserAnswerProcessDTO) {
		const bandsScore = new BandScoreEntity();
		for (const detail of data.details) {
			const updateData = new UserAnswerDetail();
			updateData.score = detail.score;
			updateData.feedback = detail.feedback;
			await this.userAnswerDetailRepository.update(detail.id, updateData);
		}
		const totalScore = bandsScore.round(data.totalScore);
		const userAnswer = await this.userAnswerRepository.findOneByProcess(
			data.id,
		);
		const avgTotalScore = userAnswer.avgScore + totalScore / 4;
		await this.userAnswerRepository.update(userAnswer.id, {
			avgScore: avgTotalScore,
		});
		return this.userExamProcessRepository.update(data.id, {
			totalScore: totalScore,
		});
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
