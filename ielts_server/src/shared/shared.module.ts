import { Module } from '@nestjs/common';
import { GenerateJwtService } from './service/generate-jwt.service';
import { MailService } from './service/mail.service';
import { ParseService } from './service/parse.service';
import { PathService } from './service/path.service';
@Module({
	imports: [],
	controllers: [],
	providers: [GenerateJwtService, MailService, ParseService, PathService],
	exports: [MailService, GenerateJwtService, ParseService, PathService],
})
export class SharedModule {}
