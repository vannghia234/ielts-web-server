import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { UserAnswerDetailRepository } from '../repository/user-answer-detail.repository';

@Injectable()
export class UserAnswerDetailService {
  constructor(private readonly userAnswerDetailRepository: UserAnswerDetailRepository) {}

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

  async create(userAnswerDetail: Partial<UserAnswerDetail>): Promise<UserAnswerDetail> {
    return this.userAnswerDetailRepository.create(userAnswerDetail);
  }

  async update(id: string, updateUserAnswerDetail: Partial<UserAnswerDetail>): Promise<UserAnswerDetail> {
    return this.userAnswerDetailRepository.update(id, updateUserAnswerDetail);
  }

  async remove(id: string): Promise<void> {
    return this.userAnswerDetailRepository.remove(id);
  }
}
