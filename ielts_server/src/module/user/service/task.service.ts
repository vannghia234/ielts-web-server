// tasks.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/lib/entity/user/user.entity';
import { UserRole } from 'src/shared/constant/enum_database';
import { Repository, LessThan } from 'typeorm';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async handleCron() {
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

		const tempUsers = await this.userRepository.find({
			where: {
				role: UserRole.TEMP_USER,
				createdAt: LessThan(oneWeekAgo),
			},
		});

		if (tempUsers.length > 0) {
			await this.userRepository.remove(tempUsers);
			console.log(`Deleted ${tempUsers.length} temporary users.`);
		}
	}
}
