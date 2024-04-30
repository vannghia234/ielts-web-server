import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { ExamSkillDetailService } from '../service/exam-skill-detail.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/constant/meta-data';

@ApiTags('exam-skill-detail')
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
@Controller('exam-skill-detail')
@Public()
export class ExamSkillDetailController {
  constructor(private examSkillDetailService: ExamSkillDetailService) {}

  @Get()
  async findAll(): Promise<ExamSkillDetail[]> {
    return this.examSkillDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExamSkillDetail> {
    return this.examSkillDetailService.findOne(id);
  }

  @Post()
  async create(
    @Body() examSkillDetail: Partial<ExamSkillDetail>,
  ): Promise<ExamSkillDetail> {
    return this.examSkillDetailService.create(examSkillDetail);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExamSkillDetail: Partial<ExamSkillDetail>,
  ): Promise<ExamSkillDetail> {
    return this.examSkillDetailService.update(id, updateExamSkillDetail);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.examSkillDetailService.remove(id);
  }
}