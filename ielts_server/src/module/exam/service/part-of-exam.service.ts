import { Injectable } from '@nestjs/common';
import { PartOfExam } from 'src/lib/entity/exam/part-of-exam.entity';
import { PartOfExamRepository } from '../repository/part-of-exam.repository';

@Injectable()
export class PartOfExamService {
  constructor(private partOfExamRepository: PartOfExamRepository) {}

  async findAll(): Promise<PartOfExam[]> {
    return this.partOfExamRepository.findAll();
  }

  async findOne(id: string): Promise<PartOfExam> {
    return this.partOfExamRepository.findOne(id);
  }

  async create(partOfExam: Partial<PartOfExam>): Promise<PartOfExam> {
    return this.partOfExamRepository.create(partOfExam);
  }

  async update(
    id: string,
    updatePartOfExam: Partial<PartOfExam>,
  ): Promise<PartOfExam> {
    return this.partOfExamRepository.update(id, updatePartOfExam);
  }

  async remove(id: string): Promise<void> {
    return this.partOfExamRepository.remove(id);
  }
}
