import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamSkillDetailRepository {
	constructor(
		@InjectRepository(ExamSkillDetail)
		private examSkillDetailRepository: Repository<ExamSkillDetail>,
	) {}

	async findAll(): Promise<ExamSkillDetail[]> {
		return this.examSkillDetailRepository.find();
	}

	async findOne(id: string): Promise<ExamSkillDetail | null> {
		const examSkillDetail = await this.examSkillDetailRepository.findOne({
			where: { id: id },
		});
		if (!examSkillDetail) {
			throw new NotFoundException('Exam skill detail not found');
		}
		return examSkillDetail;
	}

	async findOneWithRelation(id: string): Promise<ExamSkillDetail | null> {
		const examSkillDetail = await this.examSkillDetailRepository.findOne({
			relations: {
				part: {
					groupQuestions: true,
				},
				skillExam: true,
			},
			where: { id: id },
		});
		if (!examSkillDetail) {
			throw new NotFoundException('Exam skill detail not found');
		}
		return examSkillDetail;
	}

	async create(
		examSkillDetail: Partial<ExamSkillDetail>,
	): Promise<ExamSkillDetail> {
		const newExamSkillDetail =
			this.examSkillDetailRepository.create(examSkillDetail);
		return this.examSkillDetailRepository.save(newExamSkillDetail);
	}

	async update(
		id: string,
		updateExamSkillDetail: Partial<ExamSkillDetail>,
	): Promise<ExamSkillDetail> {
		await this.findOne(id); // Ensure exam skill detail exists
		await this.examSkillDetailRepository.update(id, updateExamSkillDetail);
		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const result = await this.examSkillDetailRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException('Exam skill detail not found');
		}
	}
}
