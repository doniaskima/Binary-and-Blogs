import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(text: string) {
    const res = await this.mailerService.sendMail({
      to: '927898639@qq.com',
      from: '.com',
      subject: 'Registration Verification from Nine Chat Room',
      html: `<span style="padding:15px; display: flex; justify-content: center; flex-direction: column; background: #eee; width: 400px;border-radius: 15px;">
              <b>Nine Team Email Verification</b>
              <p>Please click the link below to activate your account, <a href="https://baidu.com" style="color: #5ead22;">Click here to activate your account</a></p>
              <span style="padding: 0; font-size: 12px; color: #ccc;">From --Little Nine's Blog</span>
            </span>`,
      template: './welcome',
      // context: {
      //   // url: '',
      // },
    });
    return res;
  }
}
