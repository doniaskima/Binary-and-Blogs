import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../user/user.entity';
import { VerifyEntity } from './verify.entity';

@Injectable()
export class VerifyService {
  constructor(
    @InjectRepository(VerifyEntity)
    private readonly VerifyModel: Repository<VerifyEntity>,
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
  ) {}

  async accountActive(params, res) {
    const { code, email } = params;
    const verify = await this.VerifyModel.findOne({
      where: { code, email },
    });
    const user = await this.UserModel.findOne({ where: { email } });
    const { nickname, id } = user;
    if (!verify) {
      await this.UserModel.delete({ id });
      res.redirect(`/api/verify/verifyError`);
    } else {
      const { expirationTime } = verify;
      const now = new Date().getTime();
      const isExpired = now - Number(expirationTime) < 0;
      if (isExpired) {
        await this.UserModel.update({ id }, { status: 1 });
        res.redirect(
          `/api/verify/verifySuccess?nickname=${nickname}&count=${id}`,
        );
      } else {
        await this.UserModel.delete({ id });
        res.redirect(`/api/verify/verifyError`);
      }
    }
  }
}
