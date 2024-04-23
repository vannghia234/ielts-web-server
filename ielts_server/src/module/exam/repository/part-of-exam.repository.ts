import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartOfExam } from 'src/lib/entity/exam/part-of-exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartOfExamRepository {
  constructor(
    @InjectRepository(PartOfExam)
    private partOfExamRepository: Repository<PartOfExam>,
  ) {}

  async findAll(): Promise<PartOfExam[]> {
    return this.partOfExamRepository.find();
  }

  async findOne(id: string): Promise<PartOfExam | null> {
    const partOfExam = await this.partOfExamRepository.findOne({
      where: { id: id },
    });
    if (!partOfExam) {
      throw new NotFoundException('Part of exam not found');
    }
    return partOfExam;
  }

  async create(partOfExam: Partial<PartOfExam>): Promise<PartOfExam> {
    const newPartOfExam = this.partOfExamRepository.create(partOfExam);
    return this.partOfExamRepository.save(newPartOfExam);
  }

  async update(
    id: string,
    updatePartOfExam: Partial<PartOfExam>,
  ): Promise<PartOfExam> {
    await this.findOne(id); // Ensure part of exam exists
    await this.partOfExamRepository.update(id, updatePartOfExam);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.partOfExamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Part of exam not found');
    }
  }
}
