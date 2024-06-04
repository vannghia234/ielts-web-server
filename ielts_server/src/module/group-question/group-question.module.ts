import { Module, forwardRef } from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';
import { GroupQuestionController } from './group-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { PartModule } from '../part/part.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([GroupQuestion]),
		PartModule,
		SharedModule,
	],
	controllers: [GroupQuestionController],
	providers: [GroupQuestionService],
	exports: [GroupQuestionService],
})
export class GroupQuestionModule {}
