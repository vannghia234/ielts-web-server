import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupQuestion } from 'src/lib/entity/question/group-question.entity';
import { GroupQuestionRepository } from '../repository/group-question.repository';

@Injectable()
export class GroupQuestionService {
  constructor(
    private readonly groupQuestionRepository: GroupQuestionRepository,
  ) {}

  async findAll(): Promise<GroupQuestion[]> {
    return this.groupQuestionRepository.findAll();
  }

  async findOne(id: string): Promise<GroupQuestion | null> {
    const groupQuestion = await this.groupQuestionRepository.findOne(id);
    if (!groupQuestion) {
      throw new NotFoundException('Group question not found');
    }
    return groupQuestion;
  }

  async create(groupQuestion: Partial<GroupQuestion>): Promise<GroupQuestion> {
    return this.groupQuestionRepository.create(groupQuestion);
  }

  async update(
    id: string,
    updateGroupQuestion: Partial<GroupQuestion>,
  ): Promise<GroupQuestion> {
    return this.groupQuestionRepository.update(id, updateGroupQuestion);
  }

  async remove(id: string): Promise<void> {
    await this.groupQuestionRepository.remove(id);
  }
}
