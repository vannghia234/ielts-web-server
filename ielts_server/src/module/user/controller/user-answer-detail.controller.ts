import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { UserAnswerDetailService } from '../service/user-answer-detail.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/constant/meta-data';
import { CreateUserAnswerDetailDto } from '../dto/create-user-detail.dto';
import { UpdateUserAnswerDetailDto } from '../dto/update-user-answer-detail.dto';
import { PermissionLectureGuard } from 'src/module/auth/guard/permission.guard';
import { CreateUserAnswerDetailDtoBase } from '../dto/create-user-detail-base.dto';

@ApiTags('user-answer-detail')
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
@Controller('user-answer-detail')
export class UserAnswerDetailController {
	constructor(
		private readonly userAnswerDetailService: UserAnswerDetailService,
	) {}

	@Get()
	@Public()
	@UseGuards(PermissionLectureGuard)
	async findAll(): Promise<UserAnswerDetail[]> {
		return this.userAnswerDetailService.findAll();
	}

	@Get(':id')
	@Public()
	async findOne(@Param('id') id: string): Promise<UserAnswerDetail> {
		return this.userAnswerDetailService.findOne(id);
	}

	@Post()
	@Public()
	@UseGuards(PermissionLectureGuard)
	async create(
		@Body() userAnswerDetail: CreateUserAnswerDetailDto,
	): Promise<UserAnswerDetail> {
		return this.userAnswerDetailService.create(userAnswerDetail);
	}

	@Post('/submitExam')
	@Public()
	async submitExam(@Body() userAnswerDetail: CreateUserAnswerDetailDtoBase) {
		try {
			return this.userAnswerDetailService.createBaseAnswer(userAnswerDetail);
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	@Put(':id')
	@Public()
	@UseGuards(PermissionLectureGuard)
	async update(
		@Param('id') id: string,
		@Body() updateUserAnswerDetail: UpdateUserAnswerDetailDto,
	): Promise<UserAnswerDetail> {
		return this.userAnswerDetailService.update(id, updateUserAnswerDetail);
	}

	@Public()
	@UseGuards(PermissionLectureGuard)
	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return this.userAnswerDetailService.remove(id);
	}
}
