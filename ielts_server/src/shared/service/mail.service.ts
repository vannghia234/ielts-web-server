import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from '../dto/send-mail.dto';
import { ResponseBase } from '../constant/response_base';
@Injectable()
export class MailService {
	private transporter: nodemailer.Transporter;

	constructor(private readonly configService: ConfigService) {
		// Tạo một transporter cho nodemailer
		this.transporter = nodemailer.createTransport({
			host: this.configService.get('SMTP_HOST'),
			port: this.configService.get('SMTP_PORT'),
			secure: this.configService.get('SMTP_SECURE'),
			auth: {
				user: this.configService.get('SMTP_USERNAME'),
				pass: this.configService.get('SMTP_PASSWORD'),
			},
		});
	}

	async sendEmail(sendMailDto: SendMailDto): Promise<any> {
		const body = `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto;">
            <p>Dear ${sendMailDto.name},</p>
            <p style="margin: 0 0 20px 0;">I hope this email finds you well. I am writing to inform you of the IELTS score results.</p>
            
            <h3 style="color: #333333; margin-top: 30px;">IELTS Score:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th style="background-color: #333333; color: #ffffff; padding: 10px; text-align: left;">Skill</th>
                        <th style="background-color: #333333; color: #ffffff; padding: 10px; text-align: left;">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background-color: #dddddd;">
                        <td style="padding: 10px; text-align: left;">Listening</td>
                        <td style="padding: 10px; text-align: left;">${sendMailDto.listening_score.toFixed(
													1,
												)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: left;">Reading</td>
                        <td style="padding: 10px; text-align: left;">${sendMailDto.reading_score.toFixed(
													1,
												)}</td>
                    </tr>
                    <tr style="background-color: #dddddd;">
                        <td style="padding: 10px; text-align: left;">Writing</td>
                        <td style="padding: 10px; text-align: left;">${sendMailDto.writing_score.toFixed(
													1,
												)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: left;">Speaking</td>
                        <td style="padding: 10px; text-align: left;">${sendMailDto.speaking_score.toFixed(
													1,
												)}</td>
                    </tr>
                </tbody>
            </table>
            
            <p style="margin: 20px 0;">If you have any questions or need further information, please feel free to reach out to us. We congratulate you on your achievements and wish you continued success in your language journey.</p>
            
            <p style="margin: 20px 0;">Thank you for your attention.</p>
            
            <p style="margin: 20px 0;">Best regards,</p>
            <p style="margin: 20px 0;">Preps IELTS</p>

            <p style="margin: 20px 0;">Admin</p>

            <p style="margin: 20px 0;">0931 42 8899</p>

            <p style="margin: 0;">https://prepedu.com/vi</p>

        </div>
    </body>
    </html>`;
		const mailOptions = {
			from: this.configService.get('SMTP_FROM_EMAIL'),
			to: sendMailDto.to,
			subject: sendMailDto.subject,
			html: body,
		};
		try {
			await this.transporter.sendMail(mailOptions);
			return new ResponseBase('200', 'Successfully sent mail!');
		} catch (error) {
			throw new BadRequestException(
				'Đã xảy ra lỗi trong quá trình truyền tải dữ liệu',
			);
		}
	}
}
