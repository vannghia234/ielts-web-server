import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillExam } from 'src/lib/entity/exam/skill-exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillExamRepository {
	constructor(
		@InjectRepository(SkillExam)
		private skillExamRepository: Repository<SkillExam>,
	) {}

	async findAll(): Promise<SkillExam[]> {
		return this.skillExamRepository.find();
	}

	async findOne(id: string): Promise<SkillExam | null> {
		const skillExam = await this.skillExamRepository.findOne({
			relations: ['details.part.groupQuestions'],
			where: { id: id },
		});
		if (!skillExam) {
			throw new NotFoundException('Skill exam not found');
		}
		return skillExam;
	}

	async findOneToSend(id: string): Promise<SkillExam | null> {
		const skillExam = await this.skillExamRepository.findOne({
			relations: {
				exam: true,
				details: {
					part: {
						groupQuestions: true,
					},
				},
			},
			where: { id: id },
			order: {
				details: {
					part: {
						partNumber: 'ASC',
					},
				},
			},
		});
		if (!skillExam) {
			throw new NotFoundException('Skill exam not found');
		}
		return skillExam;
	}

	async create(skillExam: Partial<SkillExam>): Promise<SkillExam> {
		const newSkillExam = this.skillExamRepository.create(skillExam);
		return this.skillExamRepository.save(newSkillExam);
	}

	async update(
		id: string,
		updateSkillExam: Partial<SkillExam>,
	): Promise<SkillExam> {
		await this.findOne(id); // Ensure skill exam exists
		await this.skillExamRepository.update(id, updateSkillExam);
		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const result = await this.skillExamRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException('Skill exam not found');
		}
	}
}
