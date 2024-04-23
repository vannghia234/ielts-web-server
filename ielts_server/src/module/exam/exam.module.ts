import { ExamService } from './service/exam.service';
import { ExamController } from './controller/exam.controller';

import { Module } from '@nestjs/common';
import { examRepositories } from './repository';
import { Exam } from 'src/lib/entity/exam/exam.entity';
import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { PartOfExam } from 'src/lib/entity/exam/part-of-exam.entity';
import { SkillExam } from 'src/lib/entity/exam/skill-exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam, ExamSkillDetail, PartOfExam, SkillExam]),
  ],
  controllers: [ExamController],
  providers: [ExamService, ...examRepositories],
  exports: [ExamService, ...examRepositories],
})
export class ExamModule {}
