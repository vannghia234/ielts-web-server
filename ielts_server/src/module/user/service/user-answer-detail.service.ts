import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { UserAnswerDetailRepository } from '../repository/user-answer-detail.repository';
import { CreateUserAnswerDetailDto } from '../dto/create-user-detail.dto';
import { ExamSkillDetailService } from 'src/module/exam/service/exam-skill-detail.service';
import { UserAnswerService } from './user-answer.service';
import { UpdateUserAnswerDetailDto } from '../dto/update-user-answer-detail.dto';
import { UserExamProcessService } from './user-exam-process.service';
import {
	CreateUserAnswerDetailDtoBase,
	IReqCreateUserAnswerDetail,
} from '../dto/create-user-detail-base.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Part } from 'src/lib/entity/part/Part.entity';
import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { Skill } from 'src/shared/constant/enum_database';
import { HandleCreateUserAnswersDetail } from './handle-create-user-answers-detail.manager';

@Injectable()
export class UserAnswerDetailService {
	constructor(
		private readonly userAnswerDetailRepository: UserAnswerDetailRepository,
		private readonly examSkillService: ExamSkillDetailService,
		private readonly userExamProcessService: UserExamProcessService,
	) {}

	async findAll(): Promise<UserAnswerDetail[]> {
		return this.userAnswerDetailRepository.findAll();
	}

	async findOne(id: string): Promise<UserAnswerDetail | null> {
		const userAnswerDetail = await this.userAnswerDetailRepository.findOne(id);
		if (!userAnswerDetail) {
			throw new NotFoundException('User answer detail not found');
		}
		return userAnswerDetail;
	}

	async create(
		userAnswerDetail: CreateUserAnswerDetailDto,
	): Promise<UserAnswerDetail> {
		const createInfo = new UserAnswerDetail();
		createInfo.score = userAnswerDetail.score;
		createInfo.feedback = userAnswerDetail.feedback;
		createInfo.answer = userAnswerDetail.answer;
		createInfo.examDetail = await this.examSkillService.findOne(
			userAnswerDetail.examDetailId,
		);
		createInfo.userExamProcess = await this.userExamProcessService.findOne(
			userAnswerDetail.userExamProcessId,
		);

		return this.userAnswerDetailRepository.create(createInfo);
	}

	async createBaseAnswer(
		userAnswerDetail: CreateUserAnswerDetailDtoBase,
	): Promise<UserAnswerDetail[]> {
		const process = await this.userExamProcessService.findOne(
			userAnswerDetail.processId,
		);
		const parts = userAnswerDetail.answersOfParts;

		const userAnswersDetails: UserAnswerDetail[] = []; // <=> every parts
		for (const part of parts) {
			const partDetail = await this.examSkillService.findOneWithRelation(
				part.examSkillDetailId,
			);
			const skillName = partDetail.skillExam.name;
			const userAnswersDetail = new HandleCreateUserAnswersDetail(
				skillName,
				part.groups,
				partDetail,
			)
				.instance()
				.execute();
			userAnswersDetail.feedback = '';
			userAnswersDetail.examDetail = partDetail;
			userAnswersDetail.userExamProcess = process;

			userAnswersDetails.push(userAnswersDetail);
		}
		console.log('result score: ', userAnswersDetails);

		const data: UserAnswerDetail[] = [];
		for (const userAnswersDetailItem of userAnswersDetails) {
			const d = await this.userAnswerDetailRepository.create(
				userAnswersDetailItem,
			);
			data.push(d);
		}

		return data;
	}

	async update(
		id: string,
		updateUserAnswerDetail: UpdateUserAnswerDetailDto,
	): Promise<UserAnswerDetail> {
		const updateInfo = await this.userAnswerDetailRepository.findOne(id);
		updateInfo.score = updateUserAnswerDetail.score;
		updateInfo.feedback = updateUserAnswerDetail.feedback;
		updateInfo.answer = updateUserAnswerDetail.answer;
		updateInfo.examDetail = await this.examSkillService.findOne(
			updateUserAnswerDetail.examDetailId,
		);
		updateInfo.userExamProcess = await this.userExamProcessService.findOne(
			updateUserAnswerDetail.userExamProcessId,
		);
		return this.userAnswerDetailRepository.update(id, updateInfo);
	}

	async remove(id: string): Promise<void> {
		return this.userAnswerDetailRepository.remove(id);
	}
}
