import { Injectable } from '@nestjs/common';
import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { ExamSkillDetailRepository } from '../repository/exam-skill-detail.repository';

@Injectable()
export class ExamSkillDetailService {
  constructor(private examSkillDetailRepository: ExamSkillDetailRepository) {}

  async findAll(): Promise<ExamSkillDetail[]> {
    return this.examSkillDetailRepository.findAll();
  }

  async findOne(id: string): Promise<ExamSkillDetail> {
    return this.examSkillDetailRepository.findOne(id);
  }

  async create(
    examSkillDetail: Partial<ExamSkillDetail>,
  ): Promise<ExamSkillDetail> {
    return this.examSkillDetailRepository.create(examSkillDetail);
  }

  async update(
    id: string,
    updateExamSkillDetail: Partial<ExamSkillDetail>,
  ): Promise<ExamSkillDetail> {
    return this.examSkillDetailRepository.update(id, updateExamSkillDetail);
  }

  async remove(id: string): Promise<void> {
    return this.examSkillDetailRepository.remove(id);
  }
}