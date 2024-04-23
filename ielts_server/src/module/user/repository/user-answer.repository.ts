import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import { Repository } from 'typeorm';

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
      where: { id: id },
    });
    if (!userAnswer) {
      throw new NotFoundException('User answer not found');
    }
    return userAnswer;
  }

  async create(userAnswer: Partial<UserAnswer>): Promise<UserAnswer> {
    const newUserAnswer = this.userAnswerRepository.create(userAnswer);
    return this.userAnswerRepository.save(newUserAnswer);
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
