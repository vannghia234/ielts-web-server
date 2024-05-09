import { AppService } from './app.service';
import { MailService } from './shared/service/mail.service';
import { SendMailDto } from './shared/dto/send-mail.dto';
export declare class AppController {
    private readonly appService;
    private readonly mailService;
    constructor(appService: AppService, mailService: MailService);
    sendMail(sendMailDto: SendMailDto): Promise<any>;
}
