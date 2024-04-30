import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PartOfExam } from 'src/lib/entity/exam/part-of-exam.entity';
import { PartOfExamService } from '../service/part-of-exam.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/constant/meta-data';


@ApiTags('Part-of-exam')
@ApiResponse({
  status: 200,
  description: 'OK',
  content: {
    ApiResponse: {
      example: 'OK '
    },
  },
})
@ApiResponse({ status: 404, description: 'Not Found' })
@ApiResponse({ status: 500, description: 'Server Error' })
@Controller('part-of-exam')
@Public()

export class PartOfExamController {
  constructor(private partOfExamService: PartOfExamService) {}

  @Get()
  async findAll(): Promise<PartOfExam[]> {
    return this.partOfExamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PartOfExam> {
    return this.partOfExamService.findOne(id);
  }

  @Post()
  async create(@Body() partOfExam: Partial<PartOfExam>): Promise<PartOfExam> {
    return this.partOfExamService.create(partOfExam);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePartOfExam: Partial<PartOfExam>,
  ): Promise<PartOfExam> {
    return this.partOfExamService.update(id, updatePartOfExam);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.partOfExamService.remove(id);
  }
}