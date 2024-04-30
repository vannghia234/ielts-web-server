import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import { UserAnswerRepository } from '../repository/user-answer.repository';

@Injectable()
export class UserAnswerService {
  constructor(private readonly userAnswerRepository: UserAnswerRepository) {}

  async findAll(): Promise<UserAnswer[]> {
    return this.userAnswerRepository.findAll();
  }

  async findOne(id: string): Promise<UserAnswer | null> {
    const userAnswer = await this.userAnswerRepository.findOne(id);
    if (!userAnswer) {
      throw new NotFoundException('User answer not found');
    }
    return userAnswer;
  }

  async create(userAnswer: Partial<UserAnswer>): Promise<UserAnswer> {
    return this.userAnswerRepository.create(userAnswer);
  }

  async update(id: string, updateUserAnswer: Partial<UserAnswer>): Promise<UserAnswer> {
    return this.userAnswerRepository.update(id, updateUserAnswer);
  }

  async remove(id: string): Promise<void> {
    return this.userAnswerRepository.remove(id);
  }
}
