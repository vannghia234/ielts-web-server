/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { SkillExamRepository } from '../repository/skill-exam.repository';

@Controller('exam')
export class ExamController {
  constructor(private readonly skillExamRepo: SkillExamRepository) {}

  @Get()
  getAllExam() {
    return this.skillExamRepo.findAll();
  }
}
