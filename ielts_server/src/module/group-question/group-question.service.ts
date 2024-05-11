// group-question.service.ts

import {
	Inject,
	Injectable,
	NotFoundException,
	forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupQuestionDto } from './dto/create-group-question.dto';
import { UpdateGroupQuestionDto } from './dto/update-group-question.dto';
import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { PartService } from '../part/part.service';
import { GroupQuestionMapper } from './dto/group-question.mapper';
import { CreateManyGroupQuestionDto } from './dto/ create-many.dto';
import { Part } from 'src/lib/entity/part/Part.entity';
import { UpdateManyGroupQuestionDto } from './dto/update-many.dto';

@Injectable()
export class GroupQuestionService {
	constructor(
		@Inject(forwardRef(() => PartService))
		private partService: PartService,
		@InjectRepository(GroupQuestion)
		private readonly groupQuestionRepository: Repository<GroupQuestion>,
	) {}

	async findAll(): Promise<GroupQuestion[]> {
		return this.groupQuestionRepository.find();
	}

	async findOne(id: string): Promise<GroupQuestion> {
		const groupQuestion = await this.groupQuestionRepository.findOne({
			where: { id },
		});
		if (!groupQuestion) {
			throw new NotFoundException('Group question not found');
		}
		return groupQuestion;
	}
	// async findByPartId(part: Part): Promise<GroupQuestion[]> {
	//   try {
	//     const groupQuestions = await this.groupQuestionRepository.find({
	//       where: { part: part },
	//     });
	//     return groupQuestions;
	//   } catch (error) {
	//     console.log(error);
	//     return error;
	//   }
	// }
	async create(
		createGroupQuestionDto: CreateGroupQuestionDto,
	): Promise<GroupQuestion> {
		try {
			const part = await this.partService.findOne(
				createGroupQuestionDto.partId,
			);
			const groupQuestion = this.groupQuestionRepository.create(
				GroupQuestionMapper.createGroupQuestion(createGroupQuestionDto, part),
			);
			return this.groupQuestionRepository.save(groupQuestion);
		} catch {
			return null;
		}
	}

	async createMany(
		createManyGroupQuestionsDto: CreateManyGroupQuestionDto,
	): Promise<GroupQuestion[]> {
		const createdGroupQuestions: GroupQuestion[] = [];
		const part = await this.partService.findOne(
			createManyGroupQuestionsDto.partId,
		);
		for (const createGroupQuestionDto of createManyGroupQuestionsDto.groupQuestions) {
			try {
				const groupQuestion = this.groupQuestionRepository.create(
					GroupQuestionMapper.createGroupQuestion(createGroupQuestionDto, part),
				);
				const createdGroupQuestion = await this.groupQuestionRepository.save(
					groupQuestion,
				);
				createdGroupQuestions.push(createdGroupQuestion);
			} catch {
				// Handle error
			}
		}
		return createdGroupQuestions;
	}
	async updateMany(
		updateManyGroupQuestionsDto: UpdateManyGroupQuestionDto,
	): Promise<GroupQuestion[]> {
		const part = await this.partService.findOne(
			updateManyGroupQuestionsDto.partId,
		);
		this.groupQuestionRepository.delete({ part: part });
		const updatedGroupQuestion: GroupQuestion[] = [];
		for (const updateGroupQuestionDto of updateManyGroupQuestionsDto.groupQuestions) {
			try {
				const groupQuestion = this.groupQuestionRepository.create(
					GroupQuestionMapper.createGroupQuestion(updateGroupQuestionDto, part),
				);
				const createdGroupQuestion = await this.groupQuestionRepository.save(
					groupQuestion,
				);
				updatedGroupQuestion.push(createdGroupQuestion);
			} catch (error) {
				console.log(error);
				return error;
			}
		}
		return updatedGroupQuestion;
	}

	async update(
		id: string,
		updateGroupQuestionDto: UpdateGroupQuestionDto,
	): Promise<GroupQuestion> {
		const groupQuestion = await this.findOne(id);
		// Update fields if they're present in the DTO
		if (updateGroupQuestionDto.instruction !== undefined) {
			groupQuestion.instruction = updateGroupQuestionDto.instruction;
		}
		if (updateGroupQuestionDto.questionType !== undefined) {
			groupQuestion.questionType = updateGroupQuestionDto.questionType;
		}
		if (updateGroupQuestionDto.data !== undefined) {
			groupQuestion.data = updateGroupQuestionDto.data;
		}
		if (updateGroupQuestionDto.partId !== undefined) {
			try {
				const part = await this.partService.findOne(
					updateGroupQuestionDto.partId,
				);
				groupQuestion.part = part;
			} catch (err) {
				return err;
			}
		}
		return this.groupQuestionRepository.save(groupQuestion);
	}

	async remove(id: string): Promise<void> {
		const groupQuestion = await this.findOne(id);
		await this.groupQuestionRepository.remove(groupQuestion);
	}
}
