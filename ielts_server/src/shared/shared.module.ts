import { Module } from '@nestjs/common';
import { GenerateJwtService } from './service/generate-jwt.service';
import { MailService } from './service/mail.service';
@Module({
  imports: [],
  controllers: [],
  providers: [GenerateJwtService, MailService],
  exports: [MailService],
})
export class SharedModule {}
