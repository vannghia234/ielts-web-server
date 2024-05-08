// group-question.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';
import { CreateGroupQuestionDto } from './dto/create-group-question.dto';
import { UpdateGroupQuestionDto } from './dto/update-group-question.dto';
import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { Public } from 'src/shared/constant/meta-data';
import { CreateManyGroupQuestionDto } from './dto/ create-many.dto';
import { UpdateManyGroupQuestionDto } from './dto/update-many.dto';

@Controller('group-questions')
@Public()
export class GroupQuestionController {
  constructor(private readonly groupQuestionService: GroupQuestionService) {}

  @Get()
  async findAll(): Promise<GroupQuestion[]> {
    return this.groupQuestionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GroupQuestion> {
    return this.groupQuestionService.findOne(id);
  }

  @Post()
  async create(
    @Body() createGroupQuestionDto: CreateGroupQuestionDto,
  ): Promise<GroupQuestion> {
    return this.groupQuestionService.create(createGroupQuestionDto);
  }
  @Post('bulk')
  async createMany(
    @Body() createManyGroupQuestionsDto: CreateManyGroupQuestionDto,
  ): Promise<GroupQuestion[]> {
    console.log(createManyGroupQuestionsDto);
    return this.groupQuestionService.createMany(createManyGroupQuestionsDto);
  }
  @Put('bulk')
  async updateMany(
    @Body() updateManyGroupQuestionDto: UpdateManyGroupQuestionDto,
  ): Promise<GroupQuestion[]> {
    console.log(1);
    return this.groupQuestionService.updateMany(updateManyGroupQuestionDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupQuestionDto: UpdateGroupQuestionDto,
  ): Promise<GroupQuestion> {
    return this.groupQuestionService.update(id, updateGroupQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.groupQuestionService.remove(id);
  }
}
