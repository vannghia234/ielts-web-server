import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { UserAnswerDetailRepository } from '../repository/user-answer-detail.repository';
import { CreateUserAnswerDetailDto } from '../dto/create-user-detail.dto';
import { ExamSkillDetailService } from 'src/module/exam/service/exam-skill-detail.service';
import { UserAnswerService } from './user-answer.service';
import { UpdateUserAnswerDetailDto } from '../dto/update-user-answer-detail.dto';

@Injectable()
export class UserAnswerDetailService {
  constructor(
    private readonly userAnswerDetailRepository: UserAnswerDetailRepository,
    private readonly examSkillService: ExamSkillDetailService,
    private readonly userAnswerService: UserAnswerService,
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
    createInfo.userAnswer = await this.userAnswerService.findOne(
      userAnswerDetail.userAnswerId,
    );

    return this.userAnswerDetailRepository.create(createInfo);
  }

  async update(
    id: string,
    updateUserAnswerDetail: UpdateUserAnswerDetailDto,
  ): Promise<UserAnswerDetail> {
    const updateInfo = new UserAnswerDetail();
    updateInfo.score = updateUserAnswerDetail.score;
    updateInfo.feedback = updateUserAnswerDetail.feedback;
    updateInfo.answer = updateUserAnswerDetail.answer;
    updateInfo.examDetail = await this.examSkillService.findOne(
      updateUserAnswerDetail.examDetailId,
    );
    updateInfo.userAnswer = await this.userAnswerService.findOne(
      updateUserAnswerDetail.userAnswerId,
    );
    return this.userAnswerDetailRepository.update(id, updateUserAnswerDetail);
  }

  async remove(id: string): Promise<void> {
    return this.userAnswerDetailRepository.remove(id);
  }
}
