import { ExamService } from './service/exam.service';
import { ExamController } from './controller/exam.controller';

import { Module } from '@nestjs/common';
import { examRepositories } from './repository';
import { Exam } from 'src/lib/entity/exam/exam.entity';
import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { SkillExam } from 'src/lib/entity/exam/skill-exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSkillDetailController } from './controller/exam-skill-detail.controller';
import { SkillExamController } from './controller/skill-exam.controller';
import { examServices } from './service';
import { ApiResponse } from '@nestjs/swagger';
import { SkillExamService } from './service/skill-exam.service';
import { PartModule } from '../part/part.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Exam, ExamSkillDetail, SkillExam]),
		PartModule,
		SharedModule,
	],
	controllers: [ExamController, ExamSkillDetailController, SkillExamController],
	providers: [
		...examServices,
		...examRepositories,
		ExamService,
		SkillExamService,
	],
	exports: [...examServices, ...examRepositories],
})
export class ExamModule {}
