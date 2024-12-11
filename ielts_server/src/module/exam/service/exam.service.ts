import { Injectable } from '@nestjs/common';
import { Exam } from 'src/lib/entity/exam/exam.entity';
import { ExamRepository } from '../repository/exam.repository';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { ResBaseExam } from '../dto/res-base-exam';
import { TestStatus } from 'src/shared/constant/enum_database';
import { PathService } from 'src/shared/service/path.service';

@Injectable()
export class ExamService {
	constructor(
		private readonly examRepository: ExamRepository,
		private readonly pathService: PathService,
	) {}

	initFullPath(exam: Exam): string {
		const slashPosition = exam.src.search(/[\/,\\]/);
		if (slashPosition !== -1 && slashPosition === 0) {
			return this.pathService.initFullPath(exam.src)
		}
		return exam.src
	}

	async findAll(): Promise<Exam[]> {
		const exams = await this.examRepository.findAll();
		exams.map((exam) => {
			exam.src = this.initFullPath(exam)
		});
		return exams;
	}

	async findOne(id: string): Promise<Exam> {
		const exam = await this.examRepository.findOne(id);
		exam.src = this.initFullPath(exam)
		return exam
	}

	async findAllBase(): Promise<ResBaseExam[]> {
		const exams = await this.examRepository.findAllWithRelation();
		exams.map((exam) => {
			exam.src = this.initFullPath(exam)
		});
		return exams.map((exam) => new ResBaseExam(exam));
	}

	async findOneBase(code: string): Promise<ResBaseExam> {
		const exam = await this.examRepository.findOneWithRelation(code);
		exam.src = this.initFullPath(exam)
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
		examInfo.title = exam.title;
		return this.examRepository.create(examInfo);
	}

	async update(id: string, updateExam: UpdateExamDto): Promise<Exam> {
		const update = await this.examRepository.findOne(id);
		if (updateExam?.code) {
			update.code = updateExam.code;
		}
		if (updateExam?.description) {
			update.description = updateExam.description;
		}
		if (updateExam?.name) {
			update.name = updateExam.name;
		}
		if (updateExam?.password) {
			update.password = updateExam.password;
		}
		if (updateExam?.src) {
			update.src = updateExam.src;
		}
		if (updateExam?.status) {
			update.status = updateExam.status;
		}
		if (updateExam?.time) {
			update.time = updateExam.time;
		}
		if (updateExam?.title) {
			update.title = updateExam.title;
		}
		return this.examRepository.update(id, update);
	}

	async remove(id: string): Promise<void> {
		return this.examRepository.remove(id);
	}
}
