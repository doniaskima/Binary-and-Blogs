import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectEntity } from '../collect/collect.entity';
import { TagEntity } from '../tag/tag.entity';
import { TypeEntity } from '../type/type.entity';
import { UserEntity } from '../user/user.entity';
import { CommonService } from './../common/common.service';
import { ArticleController } from './article.controller';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      UserEntity,
      TypeEntity,
      TagEntity,
      CollectEntity,
    ]),
  ],
  providers: [ArticleService, CommonService],
  controllers: [ArticleController],
})
export class ArticleModule {}
