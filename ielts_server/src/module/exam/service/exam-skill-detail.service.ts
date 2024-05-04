import { Injectable } from '@nestjs/common';
import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { ExamSkillDetailRepository } from '../repository/exam-skill-detail.repository';
import {
  CreateExamSkillDetailDto,
  UpdateExamSkillDetailDto,
} from '../dto/create-exam-skill-detail.dto';
import { PartOfExamService } from './part-of-exam.service';
import { SkillExamService } from './skill-exam.service';

@Injectable()
export class ExamSkillDetailService {
  constructor(
    private examSkillDetailRepository: ExamSkillDetailRepository,
    private readonly skillExamService: SkillExamService,
    private readonly PartService: PartOfExamService,
  ) {}

  async findAll(): Promise<ExamSkillDetail[]> {
    return this.examSkillDetailRepository.findAll();
  }

  async findOne(id: string): Promise<ExamSkillDetail> {
    return this.examSkillDetailRepository.findOne(id);
  }

  async create(
    examSkillDetail: CreateExamSkillDetailDto,
  ): Promise<ExamSkillDetail> {
    const create = new ExamSkillDetail();
    create.time = new Date(examSkillDetail.time);
    create.partOfTest = await this.PartService.findOne(
      examSkillDetail.partOfTestId,
    );
    create.skillExam = await this.skillExamService.findOne(
      examSkillDetail.skillExamId,
    );
    return this.examSkillDetailRepository.create(create);
  }

  async update(
    id: string,
    updateExamSkillDetail: UpdateExamSkillDetailDto,
  ): Promise<ExamSkillDetail> {
    const update = await this.examSkillDetailRepository.findOne(id);
    update.time = new Date(updateExamSkillDetail.time);
    update.partOfTest = await this.PartService.findOne(
      updateExamSkillDetail.partOfTestId,
    );
    update.skillExam = await this.skillExamService.findOne(
      updateExamSkillDetail.skillExamId,
    );
    return this.examSkillDetailRepository.update(id, update);
  }

  async remove(id: string): Promise<void> {
    return this.examSkillDetailRepository.remove(id);
  }
}
