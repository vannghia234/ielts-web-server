import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { questionRepositories } from './repository';
import { GroupQuestion } from 'src/lib/entity/question/group-question.entity';
import { Question } from 'src/lib/entity/question/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GroupQuestion, Question])],
  controllers: [QuestionController],
  providers: [QuestionService, ...questionRepositories],
  exports: [...questionRepositories, QuestionService],
})
export class QuestionModule {}
