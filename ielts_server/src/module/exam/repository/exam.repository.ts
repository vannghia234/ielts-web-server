import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/lib/entity/exam/exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamRepository {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  async findOne(id: string): Promise<Exam | null> {
    const exam = await this.examRepository.findOne({ where: { id: id } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  async create(exam: Partial<Exam>): Promise<Exam> {
    const newExam = this.examRepository.create(exam);
    return this.examRepository.save(newExam);
  }

  async update(id: string, updateExam: Partial<Exam>): Promise<Exam> {
    await this.findOne(id); // Ensure exam exists
    await this.examRepository.update(id, updateExam);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.examRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Exam not found');
    }
  }
}
