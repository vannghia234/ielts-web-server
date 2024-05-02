import { Injectable } from '@nestjs/common';
import { Exam } from 'src/lib/entity/exam/exam.entity';
import { ExamRepository } from '../repository/exam.repository';
import { CreateExamDto } from '../dto/create-exam.dto';
import { SkillExamService } from './skill-exam.service';
import { UpdateExamDto } from '../dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(private examRepository: ExamRepository) {}

  async findAll(): Promise<Exam[]> {
    return this.examRepository.findAll();
  }

  async findOne(id: string): Promise<Exam> {
    return this.examRepository.findOne(id);
  }

  async create(exam: CreateExamDto): Promise<Exam> {
    const examInfo = new Exam();
    examInfo.code = exam.code;
    examInfo.description = exam.description;
    examInfo.name = exam.name;
    examInfo.password = exam.password;
    examInfo.src = exam.src;
    examInfo.status = exam.status;
    examInfo.time = new Date(exam.time);
    examInfo.title = exam.title;
    return this.examRepository.create(examInfo);
  }

  async update(id: string, updateExam: UpdateExamDto): Promise<Exam> {
    const update = new Exam();
    update.code = updateExam.code;
    update.description = updateExam.description;
    update.name = updateExam.name;
    update.password = updateExam.password;
    update.src = updateExam.src;
    update.status = updateExam.status;
    update.time = new Date(updateExam.time);
    update.title = updateExam.title;
    return this.examRepository.update(id, update);
  }

  async remove(id: string): Promise<void> {
    return this.examRepository.remove(id);
  }
}
