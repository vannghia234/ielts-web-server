// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
// } from '@nestjs/common';
// import { Question } from 'src/lib/entity/question/question.entity';
// import { QuestionService } from '../service/question.service';

// @Controller('question')
// export class QuestionController {
//   constructor(private readonly questionService: QuestionService) {}

//   @Get()
//   async findAll(): Promise<Question[]> {
//     return this.questionService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<Question> {
//     return this.questionService.findOne(id);
//   }

//   @Post()
//   async create(@Body() Question: Partial<Question>): Promise<Question> {
//     return this.questionService.create(Question);
//   }

//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() updateQuestion: Partial<Question>,
//   ): Promise<Question> {
//     return this.questionService.update(id, updateQuestion);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string): Promise<void> {
//     return this.questionService.remove(id);
//   }
// }
