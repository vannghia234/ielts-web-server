import { Module, forwardRef } from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';
import { GroupQuestionController } from './group-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { PartModule } from '../part/part.module';

@Module({
  imports: [TypeOrmModule.forFeature([GroupQuestion]), PartModule],
  controllers: [GroupQuestionController],
  providers: [GroupQuestionService],
  exports: [GroupQuestionService],
})
export class GroupQuestionModule {}
