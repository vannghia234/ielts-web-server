import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupQuestion } from 'src/lib/entity/question/group-question.entity';
import { GroupQuestionRepository } from '../repository/group-question.repository';
import { QuestionType } from 'src/shared/constant/enum_database';
import { CreateGroupQuestionDto } from '../dto/create-group-quesiton.dto';
import { PartOfExamService } from 'src/module/exam/service/part-of-exam.service';
import { UpdateGroupQuestionDto } from '../dto/update-group-question.dto';

@Injectable()
export class GroupQuestionService {
  constructor(
    private readonly groupQuestionRepository: GroupQuestionRepository,
    private readonly partOfExamService: PartOfExamService,
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

  async create(groupQuestion: CreateGroupQuestionDto): Promise<GroupQuestion> {
    const createInfo = new GroupQuestion();
    createInfo.description = groupQuestion.description;
    createInfo.data = groupQuestion.data;
    createInfo.partOfExam = await this.partOfExamService.findOne(
      groupQuestion.partOfExamId,
    );
    createInfo.type = groupQuestion.type;
    return this.groupQuestionRepository.create(createInfo);
  }

  async update(
    id: string,
    updateGroupQuestion: UpdateGroupQuestionDto,
  ): Promise<GroupQuestion> {
    const updateInfo = await this.groupQuestionRepository.findOne(id);
    updateInfo.description = updateGroupQuestion.description;
    updateInfo.data = updateGroupQuestion.data;
    updateInfo.partOfExam = await this.partOfExamService.findOne(
      updateGroupQuestion.partOfExamId,
    );
    updateInfo.type = updateGroupQuestion.type;
    return this.groupQuestionRepository.update(id, updateInfo);
  }

  async remove(id: string): Promise<void> {
    await this.groupQuestionRepository.remove(id);
  }
}
