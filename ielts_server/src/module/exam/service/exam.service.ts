import { Injectable } from '@nestjs/common';
import { Exam } from 'src/lib/entity/exam/exam.entity';
import { ExamRepository } from '../repository/exam.repository';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { ResBaseExam } from '../dto/res-base-exam';
import { TestStatus } from 'src/shared/constant/enum_database';

@Injectable()
export class ExamService {
	constructor(private examRepository: ExamRepository) {}

	async findAll(): Promise<Exam[]> {
		return this.examRepository.findAll();
	}

	async findOne(id: string): Promise<Exam> {
		return this.examRepository.findOne(id);
	}

	async findAllBase(): Promise<ResBaseExam[]> {
		const exams = await this.examRepository.findAllWithRelation();
		return exams.map((exam) => new ResBaseExam(exam));
	}

	async findOneBase(code: string): Promise<ResBaseExam> {
		const exam = await this.examRepository.findOneWithRelation(code);
		return new ResBaseExam(exam);
	}

	async create(exam: CreateExamDto): Promise<Exam> {
		const examInfo = new Exam();
		examInfo.code = exam.code;
		examInfo.description = exam.description;
		examInfo.name = exam.title;
		if (exam?.password) {
			examInfo.password = exam.password;
		}
		examInfo.src = exam.src;
		examInfo.time = exam.time;
		examInfo.title = exam.title;
		return this.examRepository.create(examInfo);
	}

	async update(id: string, updateExam: UpdateExamDto): Promise<Exam> {
		const update = await this.examRepository.findOne(id);
		update.code = updateExam.code;
		update.description = updateExam.description;
		update.name = updateExam.name;
		update.password = updateExam.password;
		update.src = updateExam.src;
		update.status = updateExam.status;
		update.time = updateExam.time;
		update.title = updateExam.title;
		return this.examRepository.update(id, update);
	}

	async remove(id: string): Promise<void> {
		return this.examRepository.remove(id);
	}
}
