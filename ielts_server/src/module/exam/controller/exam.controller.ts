
import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { SkillExamRepository } from '../repository/skill-exam.repository';
import { SkillExam } from 'src/lib/entity/exam/skill-exam.entity';
import { Skill } from 'src/shared/constant/enum/enum_database';
import { ExamRepository } from '../repository/exam.repository';

@Controller('exam')
export class ExamController {
  constructor(
    private readonly skillExamRepo: SkillExamRepository,
    private readonly examRepo: ExamRepository,
  ) {}

  @Get()
  getAllExam() {
    const user = {
      userId: 2,
      username: 'nghia1231',
      password: 'passw22303',
    };
    const { ...result } = user;
    console.log(result);
    return this.skillExamRepo.findAll();
  }

  @Post()
  async create(@Body() createSkillExamDto: CreateSkillExamDto) {
    const a = new SkillExam();
    const { name, examId } = createSkillExamDto;
    a.name = createSkillExamDto.name;
    a.exam = await this.examRepo.findOne(createSkillExamDto.examId);
    new Logger().debug('name ' + name + 'ExamId ' + examId);

    return this.skillExamRepo.create(a);
  }
}

export interface CreateSkillExamDto {
  name: Skill;
  examId: string;
}
