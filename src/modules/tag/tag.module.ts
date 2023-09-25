import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '../article/article.entity';
import { TagEntity } from './tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, ArticleEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
