import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
} from '@nestjs/common';
import { UserAnswerService } from '../service/user-answer.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserAnswerDto } from '../dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from '../dto/update-user-ansert.dto';
import { Public } from 'src/shared/constant/meta-data';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';

export const adminOperation = {
	description: `
* Only admin can use this API

* Admin create user and give some specific information`,
};

export const publicOperation = {
	description: `
* Everyone can use this API
`,
};

@ApiTags('user-answer')
@ApiResponse({
	status: 200,
	description: 'OK',
	content: {
		ApiResponse: {
			example: 'OK ',
		},
	},
})
@ApiResponse({ status: 404, description: 'Not Found' })
@ApiResponse({ status: 500, description: 'Server Error' })
@Controller('user-answer')
@Public()
export class UserAnswerController {
	constructor(private readonly userAnswerService: UserAnswerService) {}

	@Get()
	@ApiOperation(publicOperation)
	async findAll(): Promise<UserAnswer[]> {
		return this.userAnswerService.findAll();
	}

	@Get(':id')
	@ApiOperation(publicOperation)
	async findOne(@Param('id') id: string): Promise<UserAnswer> {
		return this.userAnswerService.findOne(id);
	}

	@Post()
	@ApiOperation(publicOperation)
	async create(@Body() userAnswer: CreateUserAnswerDto): Promise<UserAnswer> {
		return this.userAnswerService.create(userAnswer);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserAnswer: UpdateUserAnswerDto,
	): Promise<UserAnswer> {
		return this.userAnswerService.update(id, updateUserAnswer);
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return this.userAnswerService.remove(id);
	}
}
