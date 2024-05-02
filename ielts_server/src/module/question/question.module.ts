// import { QuestionController } from './controller/QuestionController';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { questionRepositories } from './repository';
import { GroupQuestion } from 'src/lib/entity/question/group-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { questionServices } from './service';
import { GroupQuestionController } from './controller/group-question.controller';
import { ExamModule } from '../exam/exam.module';

@Module({
  imports: [
    ExamModule,
    TypeOrmModule.forFeature([GroupQuestion])],
  controllers: [GroupQuestionController],
  providers: [...questionServices, ...questionRepositories],
  exports: [...questionRepositories, ...questionServices],
})
export class QuestionModule {}
