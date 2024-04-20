/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WordModule } from './file-upload/word/word.module';

@Module({
  imports: [WordModule],
  controllers: [],
  providers: [],
})
export class SharedModule {}
