import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAnswerDetailRepository {
	constructor(
		@InjectRepository(UserAnswerDetail)
		private userAnswerDetailRepository: Repository<UserAnswerDetail>,
	) {}

	async findAll(): Promise<UserAnswerDetail[]> {
		return this.userAnswerDetailRepository.find({
			relations: ['examDetail', 'userAnswer'],
		});
	}

	async findOne(id: string): Promise<UserAnswerDetail | null> {
		const userAnswerDetail = await this.userAnswerDetailRepository.findOne({
			relations: ['examDetail', 'userAnswer'],
			where: { id: id },
		});
		if (!userAnswerDetail) {
			throw new NotFoundException('User answer detail not found');
		}
		return userAnswerDetail;
	}

	async create(
		userAnswerDetail: Partial<UserAnswerDetail>,
	): Promise<UserAnswerDetail> {
		const newUserAnswerDetail =
			this.userAnswerDetailRepository.create(userAnswerDetail);
		return this.userAnswerDetailRepository.save(newUserAnswerDetail);
	}

	async update(
		id: string,
		updateUserAnswerDetail: UserAnswerDetail,
	): Promise<UserAnswerDetail> {
		await this.findOne(id); // Ensure user answer detail exists
		await this.userAnswerDetailRepository.update(id, updateUserAnswerDetail);
		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const result = await this.userAnswerDetailRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException('User answer detail not found');
		}
	}
}
