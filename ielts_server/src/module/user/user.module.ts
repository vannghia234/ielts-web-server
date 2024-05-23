import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ExamModule } from 'src/module/exam/exam.module';

import { userEntities } from 'src/lib/entity/user';
import { userRepositories } from 'src/module/user/repository';
import { userServices } from 'src/module/user/service';
import { userControllers } from 'src/module/user/controller';

@Module({
	imports: [ExamModule, TypeOrmModule.forFeature([...userEntities])],
	controllers: [...userControllers],
	providers: [...userServices, ...userRepositories],
	exports: [...userServices, ...userRepositories],
})
export class UserModule {}
