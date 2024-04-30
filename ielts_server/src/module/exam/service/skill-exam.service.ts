import { Injectable } from '@nestjs/common';
import { SkillExam } from 'src/lib/entity/exam/skill-exam.entity';
import { SkillExamRepository } from '../repository/skill-exam.repository';

@Injectable()
export class SkillExamService {
  constructor(private skillExamRepository: SkillExamRepository) {}

  async findAll(): Promise<SkillExam[]> {
    return this.skillExamRepository.findAll();
  }

  async findOne(id: string): Promise<SkillExam> {
    return this.skillExamRepository.findOne(id);
  }

  async create(skillExam: Partial<SkillExam>): Promise<SkillExam> {
    return this.skillExamRepository.create(skillExam);
  }

  async update(
    id: string,
    updateSkillExam: Partial<SkillExam>,
  ): Promise<SkillExam> {
    return this.skillExamRepository.update(id, updateSkillExam);
  }

  async remove(id: string): Promise<void> {
    return this.skillExamRepository.remove(id);
  }
}
