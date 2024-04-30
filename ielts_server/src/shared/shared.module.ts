import { Module } from '@nestjs/common';
import { GenerateJwtService } from './jwt/generate-jwt.service';
@Module({
  imports: [],
  controllers: [],
  providers: [GenerateJwtService],
  exports: [],
})
export class SharedModule {}
