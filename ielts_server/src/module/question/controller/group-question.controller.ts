import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { GroupQuestion } from 'src/lib/entity/question/group-question.entity';
import { GroupQuestionService } from '../service/group-question.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('group-question')
// @ApiResponse({
//   status: 200,
//   description: 'OK',
//   content: {
//     ApiResponse: {
//       example: 'OK ',
//     },
//   },
// })
// @ApiResponse({ status: 404, description: 'Not Found' })
// @ApiResponse({ status: 500, description: 'Server Error' })
@Controller('group-question')
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
    @Body() groupQuestion: Partial<GroupQuestion>,
  ): Promise<GroupQuestion> {
    return this.groupQuestionService.create(groupQuestion);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupQuestion: Partial<GroupQuestion>,
  ): Promise<GroupQuestion> {
    return this.groupQuestionService.update(id, updateGroupQuestion);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.groupQuestionService.remove(id);
  }
}
