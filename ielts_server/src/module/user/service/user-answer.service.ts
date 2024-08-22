import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import { UserAnswerRepository } from '../repository/user-answer.repository';
import { CreateUserAnswerDto } from '../dto/create-user-answer.dto';
import { UserService } from './user.service';
import { UpdateUserAnswerDto } from '../dto/update-user-ansert.dto';
import { ExamService } from 'src/module/exam/service/exam.service';

@Injectable()
export class UserAnswerService {
	constructor(
		private readonly userAnswerRepository: UserAnswerRepository,
		private readonly userService: UserService,
		private readonly examService: ExamService,
	) {}

	async findAll(): Promise<UserAnswer[]> {
		return this.userAnswerRepository.findAll();
	}

	async findAllWithRelation() {
		return this.userAnswerRepository.findAllWithRelation();
	}

	async findAllWithRelationByExam(code: string) {
		return this.userAnswerRepository.findAllWithRelationByExam(code);
	}

	async findOne(id: string): Promise<UserAnswer | null> {
		const userAnswer = await this.userAnswerRepository.findOne(id);
		if (!userAnswer) {
			throw new NotFoundException('User answer not found');
		}
		return userAnswer;
	}

	async findOneRecent(codeExam: string) {
		const exam = await this.examService.findOneBase(codeExam);
		const skillExamIds = exam.skillsExam.map((skillExam) => skillExam.id);
		const processes =
			await this.userAnswerRepository.findOneRecentBySkillExamId(skillExamIds);
		return processes;
	}

	async findByUserId(userId: string) {
		return this.userAnswerRepository.findByUserId(userId);
	}

	async getTop(code: string, numOf: number) {
		const data: { totalScore: number | null; userAnswer: UserAnswer }[] = (
			await this.userAnswerRepository.findAllByExam(code)
		)
			.map((item) => {
				const totalScore = item.processes.reduce(
					(acc: number | null, element) => {
						if (
							(acc !== 0 && !acc) ||
							(element.totalScore !== 0 && !element.totalScore)
						)
							return null;
						acc += element.totalScore;
						return acc;
					},
					0,
				);
				return {
					totalScore: totalScore,
					userAnswer: item,
				};
			})
			.sort((a, b) => b.totalScore - a.totalScore)
			.filter((e, index) => index < numOf);
		return data.map((e) => e.userAnswer);
	}

	async create(userAnswer: CreateUserAnswerDto): Promise<UserAnswer> {
		const userAnswerData = new UserAnswer();
		const date = new Date(userAnswer.timeStart);
		userAnswerData.timeStart = date;
		userAnswerData.user = await this.userService.findOne(userAnswer.userId);
		return this.userAnswerRepository.create(userAnswerData);
	}

	async update(
		id: string,
		updateUserAnswer: Partial<UserAnswer>,
	): Promise<UserAnswer> {
		const updateInfo: Record<string, any> = {};
		if ('avgScore' in updateUserAnswer)
			updateInfo.avgScore = updateUserAnswer.avgScore;
		if ('isSendByMail' in updateUserAnswer)
			updateInfo.isSendByMail = updateUserAnswer.isSendByMail;
		if ('submittedAt' in updateUserAnswer)
			updateInfo.submittedAt = updateUserAnswer.submittedAt;
		if ('timeStart' in updateUserAnswer.timeStart)
			updateInfo.timeStart = updateUserAnswer.timeStart;
		// const updateInfo = await this.userAnswerRepository.findOne(id);
		// updateInfo.timeStart = new Date(updateUserAnswer.timeStart);
		// updateInfo.user = await this.userService.findOne(updateUserAnswer.userId);
		return this.userAnswerRepository.update(id, updateInfo);
	}

	async remove(id: string): Promise<void> {
		return this.userAnswerRepository.remove(id);
	}

	async statisticExam() {
		return this.userAnswerRepository.statisticExam();
	}
}
