import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../user/user.entity';
import { ArticleController } from './article.controller';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { TagEntity } from '../tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, TagEntity])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
