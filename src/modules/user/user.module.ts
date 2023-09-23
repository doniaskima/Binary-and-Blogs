import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { VerifyEntity } from '../verify/verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, VerifyEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
