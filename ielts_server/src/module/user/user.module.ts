import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ExamModule } from 'src/module/exam/exam.module';

import { userEntities } from 'src/lib/entity/user';
import { userRepositories } from 'src/module/user/repository';
import { userServices } from 'src/module/user/service';
import { userControllers } from 'src/module/user/controller';
import { BandScoreModule } from '../bandScore/bandScore.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
	imports: [
		BandScoreModule,
		ExamModule,
		TypeOrmModule.forFeature([...userEntities]),
		SharedModule,
	],
	controllers: [...userControllers],
	providers: [...userServices, ...userRepositories],
	exports: [...userServices, ...userRepositories],
})
export class UserModule {}
