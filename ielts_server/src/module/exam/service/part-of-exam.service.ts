import { Injectable } from '@nestjs/common';
import { PartOfExam } from 'src/lib/entity/exam/part-of-exam.entity';
import { PartOfExamRepository } from '../repository/part-of-exam.repository';
import { CreatePartOfExamDto, UpdatePartOfExamDto } from '../dto/create-part.dto';

@Injectable()
export class PartOfExamService {
  constructor(private partOfExamRepository: PartOfExamRepository) {}

  async findAll(): Promise<PartOfExam[]> {
    return this.partOfExamRepository.findAll();
  }

  async findOne(id: string): Promise<PartOfExam> {
    return this.partOfExamRepository.findOne(id);
  }

  async create(partOfExam: CreatePartOfExamDto): Promise<PartOfExam> {
    const createInfo = new PartOfExam();
    createInfo.description = partOfExam.description;
    createInfo.skill = partOfExam.skill;
    createInfo.src = partOfExam.src;
    return this.partOfExamRepository.create(createInfo);
  }

  async update(
    id: string,
    updatePartOfExam: UpdatePartOfExamDto,
  ): Promise<PartOfExam> {
    const update = new PartOfExam();
    update.description = updatePartOfExam.description;
    update.skill = updatePartOfExam.skill;
    update.src = updatePartOfExam.src;
    return this.partOfExamRepository.update(id, update);
  }

  async remove(id: string): Promise<void> {
    return this.partOfExamRepository.remove(id);
  }
}
