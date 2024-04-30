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

@Module({
  imports: [TypeOrmModule.forFeature([GroupQuestion])],
  controllers: [GroupQuestionController],
  providers: [...questionServices, ...questionRepositories],
  exports: [...questionRepositories, ...questionServices],
})
export class QuestionModule {}
