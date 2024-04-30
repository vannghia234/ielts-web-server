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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';
import { Public } from 'src/shared/constant/meta-data';

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
@Public()
@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Get()
  async findAll(): Promise<Exam[]> {
    return this.examService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Exam> {
    return this.examService.findOne(id);
  }

  @Post()
  async create(@Body() exam: Partial<Exam>): Promise<Exam> {
    return this.examService.create(exam);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExam: Partial<Exam>,
  ): Promise<Exam> {
    return this.examService.update(id, updateExam);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.examService.remove(id);
  }
}