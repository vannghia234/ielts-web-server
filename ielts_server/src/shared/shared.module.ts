import { Module } from '@nestjs/common';
import { WordService } from './file-upload/word/word.service';
import { GenerateJwtService } from './jwt/generate-jwt.service';
@Module({
  imports: [],
  controllers: [],
  providers: [WordService, GenerateJwtService],
  exports: [],
})
export class SharedModule {}
