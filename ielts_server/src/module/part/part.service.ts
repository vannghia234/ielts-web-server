import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from 'src/lib/entity/part/Part.entity';
import { ILike, Like, Repository, Not, FindOperator, In, DeleteDateColumn } from 'typeorm';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PartNumber, Skill } from 'src/shared/constant/enum_database';

@Injectable()
export class PartService {
	constructor(
		@InjectRepository(Part)
		private readonly partRepository: Repository<Part>,
	) {}
	async find(
		search?: string,
		limit?: number,
		page?: number,
		skill?: string,
		partNumber?: string,
		notInCode?: string,
	): Promise<{ parts: Part[]; totalPage: number }> {
		const offset = limit * (page - 1);

		const part: PartNumber = PartNumber[partNumber as keyof typeof PartNumber];
		const skillChosen: Skill = Skill[skill as keyof typeof Skill];

		const customWhere: Record<string, FindOperator<string>> = {}

		if (notInCode.length > 0) {
			const listPartContained = await this.partRepository.find({
				where: {
					skill: skillChosen,
					examSkillDetail: {
						skillExam: {
							exam: {
								code: notInCode
							}
						}
					}
				}
			})
			customWhere['id'] = Not(In(listPartContained.map(item => item.id)))
		}

		const [parts, totalCount] = await this.partRepository.findAndCount({
			take: limit,
			skip: offset,
			where: {
				title: ILike(`%${search}%`),
				partNumber: part,
				skill: skillChosen,
				...customWhere,
			},
		});

		const totalPage = Math.ceil(totalCount / limit);

		return { parts, totalPage };
	}

	async findOne(id: string): Promise<Part> {
		return this.partRepository.findOne({
			where: { id },
			relations: ['groupQuestions'],
		});
	}
	async findBySkill(skill: Skill): Promise<Part[]> {
		return this.partRepository.find({
			where: { skill: skill },
			relations: ['groupQuestions'],
		});
	}

	async create(partCreate: CreatePartDto): Promise<Part> {
		const part = new Part();
		part.title = partCreate.title;
		part.partNumber = partCreate.partNumber;
		part.skill = partCreate.skill;
		part.content = partCreate.content;
		part.resource = partCreate.resource;
		return this.partRepository.save(part);
	}

	async update(id: string, partUpdate: UpdatePartDto): Promise<Part> {
		const existingPart = await this.partRepository.findOne({ where: { id } });
		if (!existingPart) {
			throw new Error(`Part with id ${id} not found`);
		}
		const part = new Part();
		part.title = partUpdate.title;
		part.partNumber = partUpdate.partNumber;
		part.skill = partUpdate.skill;
		if (
			part.skill === Skill.LISTENING ||
			(part.skill === Skill.SPEAKING &&
				(part.partNumber === PartNumber.Part1 ||
					part.partNumber === PartNumber.Part3))
		) {
			part.content = null;
			part.resource = partUpdate.resource;
		} else {
			part.content = partUpdate.content;
			part.resource = null;
		}
		await this.partRepository.update(id, part);
		return this.partRepository.findOne({ where: { id } });
	}
	async findAll(): Promise<Part[]> {
		return await this.partRepository.find();
	}

	async remove(id: string): Promise<Part[]> {
		const deleted = await this.partRepository.delete(id);
		if (!deleted) console.log(`Part with ID ${id} not found`);
		return this.findAll();
	}
}
