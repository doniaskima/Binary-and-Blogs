import { MailerService } from '@nest-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync, compareSync } from 'bcryptjs';
import { randomAvatar } from 'src/constants/avatar';
import { randomCode } from 'src/utils/tools';
import { Repository } from 'typeorm';
import { VerifyEntity } from '../verify/verify.entity';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
    private readonly VerifyModel: Repository<VerifyEntity>,
    private readonly mailerService: MailerService,
  ) {}

  async register(params) {
    const { username, password, email, avatar, isUseEmailVer } = params;
    params.password = hashSync(password);

    if (!avatar) {
      params.avatar = randomAvatar();
    }

    const u: any = await this.UserModel.findOne({
      where: [{ username }, { email }],
    });

    if (u) {
      const tips = username == u.username ? 'username' : 'email';
      throw new HttpException(
        { message: `This ${tips} already exists!` },
        HttpStatus.BAD_REQUEST,
      );
    }

    !isUseEmailVer && (params.status = 0);

    const newUser = await this.UserModel.save(params);

    if (!isUseEmailVer) {
      const code = randomCode(8);
      const expirationTime = (new Date().getTime() + 60 * 5 * 1000).toString();
      const verifyParams = { code, email, type: 'register', expirationTime };
      await this.VerifyModel.save(verifyParams);

      const baseApi = 'http://localhost:3000/';
      await this.mailerService.sendMail({
        to: email,
        from: 'doniasblog@gmail.com',
        subject: 'Registration Verification from Nine Chat Room',
        html: `<span style="padding:15px; display: flex; justify-content: center; flex-direction: column; background: #eee; width: 400px;border-radius: 15px;">
                  <b>Nine Team Email Verification Code</b>
                  <p>Please click the link below to activate your account, <a href="${baseApi}/api/verify/accountActive?code=${code}&email=${email}" style="color: #5ead22;">Click here to activate your account</a></p>
                  <span style="padding: 0; font-size: 12px; color: #ccc;">From --Nine's Blog</span>
                </span>`,
        template: './welcome',
      });
      return 'Please go to your email to activate your account and log in to the system!';
    } else {
      return newUser;
    }
  }
  async validateUser(username: string, password: string) {
    const u: any = await this.UserModel.findOne({
        where: { username },
    });
    const bool = compareSync(password, u.password);
    if (bool) {
        return u;
    } else {
        return false;
    }
}
}
