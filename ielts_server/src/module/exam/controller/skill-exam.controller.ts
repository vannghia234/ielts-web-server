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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/constant/meta-data';

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
@Public()
export class SkillExamController {
  constructor(private skillExamService: SkillExamService) {}

  @Get()
  async findAll(): Promise<SkillExam[]> {
    return this.skillExamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SkillExam> {
    return this.skillExamService.findOne(id);
  }

  @Post()
  async create(@Body() skillExam: Partial<SkillExam>): Promise<SkillExam> {
    return this.skillExamService.create(skillExam);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillExam: Partial<SkillExam>,
  ): Promise<SkillExam> {
    return this.skillExamService.update(id, updateSkillExam);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.skillExamService.remove(id);
  }
}
