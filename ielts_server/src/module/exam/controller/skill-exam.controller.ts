import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
} from '@nestjs/common';
import { SkillExam } from 'src/lib/entity/exam/skill-exam.entity';
import { SkillExamService } from '../service/skill-exam.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/constant/meta-data';
import { CreateSkillExamDto } from '../dto/create-skill-exam.dto';
import { UpdateSkillExamDto } from '../dto/update-skill-exam.dto';
import { publicOperation } from 'src/module/user/controller/user-answer.controller';

@ApiTags('skill-exam')
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
@Controller('skill-exam')
export class SkillExamController {
	constructor(private skillExamService: SkillExamService) {}

	@Public()
	@ApiOperation(publicOperation)
	@Get()
	async findAll(): Promise<SkillExam[]> {
		return this.skillExamService.findAll();
	}

	@Public()
	@ApiOperation(publicOperation)
	@ApiOperation(publicOperation)
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<SkillExam> {
		return this.skillExamService.findOne(id);
	}

	@Post()
	async create(@Body() skillExam: CreateSkillExamDto): Promise<SkillExam> {
		return this.skillExamService.create(skillExam);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateSkillExam: UpdateSkillExamDto,
	): Promise<SkillExam> {
		return this.skillExamService.update(id, updateSkillExam);
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return this.skillExamService.remove(id);
	}
}
