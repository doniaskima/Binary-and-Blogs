import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { UserModule } from './modules/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nest-modules/mailer';
import { VerifyModule } from './modules/verify/verify.module';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('email'),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    ArticleModule,
    VerifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
