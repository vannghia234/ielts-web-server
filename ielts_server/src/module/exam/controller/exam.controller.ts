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
import { Exam } from 'src/lib/entity/exam/exam.entity';
import { ExamService } from '../service/exam.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';
import { Public } from 'src/shared/constant/meta-data';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { publicOperation } from 'src/module/user/controller/user-answer.controller';
import { ResBaseExam } from '../dto/res-base-exam';

@ApiTags('exam')
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
@Controller('exam')
export class ExamController {
	constructor(private examService: ExamService) {}

	@Get()
	@Public()
	@ApiOperation(publicOperation)
	async findAll(): Promise<Exam[]> {
		return this.examService.findAll();
	}

	@Get('/all')
	@Public()
	@ApiOperation(publicOperation)
	async findAllBase(): Promise<ResBaseExam[]> {
		return this.examService.findAllBase();
	}

	@Get('/one/:code')
	@Public()
	@ApiOperation(publicOperation)
	async findOneBase(@Param('code') code: string): Promise<ResBaseExam> {
		return this.examService.findOneBase(code);
	}

	@Get(':id')
	@Public()
	@ApiOperation(publicOperation)
	async findOne(@Param('id') id: string): Promise<Exam> {
		return this.examService.findOne(id);
	}

	@Post()
	async create(@Body() exam: CreateExamDto): Promise<Exam> {
		return this.examService.create(exam);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateExam: UpdateExamDto,
	): Promise<Exam> {
		return this.examService.update(id, updateExam);
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return this.examService.remove(id);
	}
}
