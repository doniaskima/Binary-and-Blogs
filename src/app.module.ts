import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { UserModule } from './modules/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nest-modules/mailer';
import { VerifyModule } from './modules/verify/verify.module';
import { ArticleModule } from './modules/article/article.module';
import { TagModule } from './modules/tag/tag.module';
import { CommentModule } from './modules/comment/comment.module';
import { TypeModule } from './modules/type/type.module';
import { ProjectModule } from './modules/project/project.module';
import { ResourceModule } from './modules/ressource/ressource.module';
import { ResourceTypeModule } from './modules/resource-type/resource-type.module';
import { FriendLinksModule } from './modules/friend-links/friend-links.module';
import { EmailModule } from './modules/email/email.module';
import { ChatModule } from './modules/chat/chat.module';

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
    TagModule,
    CommentModule,
    TypeModule,
    ProjectModule,
    ResourceModule,
    ResourceTypeModule,
    FriendLinksModule,
    EmailModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
