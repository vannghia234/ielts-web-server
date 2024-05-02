import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupQuestion } from 'src/lib/entity/question/group-question.entity';
import { QuestionType } from 'src/shared/constant/enum_database';
import { Repository } from 'typeorm';

@Injectable()
export class GroupQuestionRepository {
  constructor(
    @InjectRepository(GroupQuestion)
    private groupQuestionRepository: Repository<GroupQuestion>,
  ) {}

  async findAll(): Promise<GroupQuestion[]> {
    return this.groupQuestionRepository.find();
  }

  async findOne(id: string): Promise<GroupQuestion | null> {
    const groupQuestion = await this.groupQuestionRepository.findOne({
      where: { id: id },
    });
    if (!groupQuestion) {
      throw new NotFoundException('Group question not found');
    }
    return groupQuestion;
  }

  async create(groupQuestion: Partial<GroupQuestion>): Promise<GroupQuestion> {
    const newGroupQuestion = this.groupQuestionRepository.create(groupQuestion);
    return this.groupQuestionRepository.save(newGroupQuestion);
  }

  async update(
    id: string,
    updateGroupQuestion: Partial<GroupQuestion>,
  ): Promise<GroupQuestion> {
    await this.findOne(id); // Ensure group question exists
    await this.groupQuestionRepository.update(id, updateGroupQuestion);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.groupQuestionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Group question not found');
    }
  }
}
