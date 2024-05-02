import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { UserAnswerDetailService } from '../service/user-answer-detail.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/constant/meta-data';
import { CreateUserAnswerDetailDto } from '../dto/create-user-detail.dto';
import { UpdateUserAnswerDetailDto } from '../dto/update-user-answer-detail.dto';

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
@Public()
export class UserAnswerDetailController {
  constructor(
    private readonly userAnswerDetailService: UserAnswerDetailService,
  ) {}

  @Get()
  async findAll(): Promise<UserAnswerDetail[]> {
    return this.userAnswerDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserAnswerDetail> {
    return this.userAnswerDetailService.findOne(id);
  }

  @Post()
  async create(
    @Body() userAnswerDetail: CreateUserAnswerDetailDto,
  ): Promise<UserAnswerDetail> {
    return this.userAnswerDetailService.create(userAnswerDetail);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserAnswerDetail: UpdateUserAnswerDetailDto,
  ): Promise<UserAnswerDetail> {
    return this.userAnswerDetailService.update(id, updateUserAnswerDetail);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userAnswerDetailService.remove(id);
  }
}
