import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import { UserAnswerRepository } from '../repository/user-answer.repository';
import { CreateUserAnswerDto } from '../dto/create-user-answer.dto';
import { UserService } from './user.service';
import { UpdateUserAnswerDto } from '../dto/update-user-ansert.dto';

@Injectable()
export class UserAnswerService {
	constructor(
		private readonly userAnswerRepository: UserAnswerRepository,
		private readonly userService: UserService,
	) {}

	async findAll(): Promise<UserAnswer[]> {
		return this.userAnswerRepository.findAll();
	}

	async findOne(id: string): Promise<UserAnswer | null> {
		const userAnswer = await this.userAnswerRepository.findOne(id);
		if (!userAnswer) {
			throw new NotFoundException('User answer not found');
		}
		return userAnswer;
	}

	async create(userAnswer: CreateUserAnswerDto): Promise<UserAnswer> {
		const userAnswerData = new UserAnswer();
		const date = new Date(userAnswer.timeStart);
		userAnswerData.timeStart = date;
		userAnswerData.user = await this.userService.findOne(userAnswer.userId);
		return this.userAnswerRepository.create(userAnswerData);
	}

	async update(
		id: string,
		updateUserAnswer: UpdateUserAnswerDto,
	): Promise<UserAnswer> {
		const updateInfo = await this.userAnswerRepository.findOne(id);
		updateInfo.timeStart = new Date(updateUserAnswer.timeStart);
		updateInfo.user = await this.userService.findOne(updateUserAnswer.userId);
		return this.userAnswerRepository.update(id, updateInfo);
	}

	async remove(id: string): Promise<void> {
		return this.userAnswerRepository.remove(id);
	}
}
