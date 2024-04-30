import { Injectable } from '@nestjs/common';
import { Exam } from 'src/lib/entity/exam/exam.entity';
import { ExamRepository } from '../repository/exam.repository';

@Injectable()
export class ExamService {
  constructor(private examRepository: ExamRepository) {}

  async findAll(): Promise<Exam[]> {
    return this.examRepository.findAll();
  }

  async findOne(id: string): Promise<Exam> {
    return this.examRepository.findOne(id);
  }

  async create(exam: Partial<Exam>): Promise<Exam> {
    return this.examRepository.create(exam);
  }

  async update(id: string, updateExam: Partial<Exam>): Promise<Exam> {
    return this.examRepository.update(id, updateExam);
  }

  async remove(id: string): Promise<void> {
    return this.examRepository.remove(id);
  }
}