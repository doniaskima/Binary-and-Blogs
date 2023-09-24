import { MailerService } from '@nest-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync, compareSync } from 'bcryptjs';
import { randomAvatar } from 'src/constants/avatar';
import { randomCode } from 'src/utils/tools';
import { Repository } from 'typeorm';
import { VerifyEntity } from '../verify/verify.entity';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
    @InjectRepository(VerifyEntity)
    private readonly VerifyModel: Repository<VerifyEntity>,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async register(params) {
    const { username, password, email, avatar, isUseEmailVer } = params;
    console.log(params);
    params.password = hashSync(password);

    if (!avatar) {
      params.avatar = randomAvatar();
    }

    const u: any = await this.UserRepository.findOne({
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

    const newUser = await this.UserRepository.save(params);

    if (!isUseEmailVer) {
      const code = randomCode(8);
      const expirationTime = (new Date().getTime() + 60 * 5 * 1000).toString();
      const verifyParams = { code, email, type: 'register', expirationTime };
      await this.VerifyModel.save(verifyParams);

      const baseApi = 'http://localhost:3000';
      await this.mailerService.sendMail({
        to: email,
        from: 'doniasblog@gmail.com',
        subject: 'Registration Verification from Binary and Blogs',
        html: `<span style="padding:15px; display: flex; justify-content: center; flex-direction: column; background: #eee; width: 400px;border-radius: 15px;">
                  <b>from Binary and Blogs Team Email Verification Code</b>
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
    const u: any = await this.UserRepository.findOne({
      where: { username },
    });
    const bool = compareSync(password, u.password);
    if (bool) {
      return u;
    } else {
      return false;
    }
  }

  async login(params): Promise<any> {
    const { username, password } = params;
    const u: any = await this.UserRepository.findOne({
      where: [{ username }, { email: username }],
    });

    if (!u) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }

    const bool = await compareSync(password, u.password);

    if (bool && u.status === 1) {
      const {
        username,
        email,
        id: userId,
        role,
        nickname,
        avatar,
        sign,
        roomBg,
        roomId,
      } = u;
      return {
        token: this.jwtService.sign({
          username,
          nickname,
          email,
          userId,
          role,
          avatar,
          sign,
          roomBg,
          roomId,
        }),
      };
    } else {
      throw new HttpException(
        {
          message: 'Incorrect username or password, or account not activated!',
          error: 'please try again later.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
