/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WordService } from './file-upload/word/word.service';

@Module({
  imports: [],
  controllers: [],
  providers: [WordService],
})
export class SharedModule {}
