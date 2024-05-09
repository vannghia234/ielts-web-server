/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EventGateWay } from './event.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [EventGateWay],
})
export class EventModule {}
