import { Module } from '@nestjs/common';
import { GenerateJwtService } from './service/generate-jwt.service';
import { MailService } from './service/mail.service';
import { ParseService } from './service/parse.service';
@Module({
	imports: [],
	controllers: [],
	providers: [GenerateJwtService, MailService, ParseService],
	exports: [MailService, GenerateJwtService, ParseService],
})
export class SharedModule {}
