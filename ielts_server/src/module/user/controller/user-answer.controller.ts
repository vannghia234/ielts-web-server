import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import { UserAnswerService } from '../service/user-answer.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/constant/meta-data';

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
  async findAll(): Promise<UserAnswer[]> {
    return this.userAnswerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserAnswer> {
    return this.userAnswerService.findOne(id);
  }

  @Post()
  async create(@Body() userAnswer: Partial<UserAnswer>): Promise<UserAnswer> {
    return this.userAnswerService.create(userAnswer);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserAnswer: Partial<UserAnswer>,
  ): Promise<UserAnswer> {
    return this.userAnswerService.update(id, updateUserAnswer);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userAnswerService.remove(id);
  }
}
