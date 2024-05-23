import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	Headers,
	InternalServerErrorException,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HeaderUserDTO } from 'src/module/auth/dto/header-user.dto';
import { ResponseBase } from 'src/shared/constant/response_base';
import { UserExamProcessService } from '../service/user-exam-process.service';

@ApiTags('user-exam-process')
@Controller('user-exam-process')
export class UserExamProcessController {
	constructor(
		private readonly userExamProcessService: UserExamProcessService,
	) {}

	@Get()
	async getGroup(@Query('userAnswerId') userAnswerId: string) {
		try {
			if (userAnswerId.length === 0)
				return new BadRequestException(new ResponseBase('400', 'Bad Request'));

			const userExamProcess = await this.userExamProcessService.findGroup(
				userAnswerId,
			);
			return userExamProcess;
		} catch (error) {
			return new InternalServerErrorException(
				new ResponseBase('500', 'An Error occurred!'),
			);
		}
	}

	@Delete('/delete')
	async delete(@Query('id') userAnswerId: string) {
		try {
			if (userAnswerId.length === 0) {
				return new BadRequestException(new ResponseBase('400', 'Bad Request'));
			}
			const result = await this.userExamProcessService.deleteGroup(
				userAnswerId,
			);
			return 'Completed';
		} catch (error) {
			return new InternalServerErrorException(
				new ResponseBase('500', 'An error occurred!'),
			);
		}
	}
}
