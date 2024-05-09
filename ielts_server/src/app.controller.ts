import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './shared/service/mail.service';
import { Public } from './shared/constant/meta-data';
import { SendMailDto } from './shared/dto/send-mail.dto';

@Controller('app')
@Public()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Post('email')
  async sendMail(@Body() sendMailDto: SendMailDto) {
    return this.mailService.sendEmail(sendMailDto);
  }
}
