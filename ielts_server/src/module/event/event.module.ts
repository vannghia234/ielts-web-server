/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EventGateWay } from './event.gateway';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ExamModule } from '../exam/exam.module';

@Module({
	imports: [AuthModule, UserModule, ExamModule],
	controllers: [],
	providers: [EventGateWay],
})
export class EventModule {}
