import { Injectable, Module, HttpException, HttpStatus } from '@nestjs/common';
import { CollectEntity } from './collect.entity';
import { ArticleEntity } from '../article/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { getNotEmptyKey } from 'src/utils/tools';
import { collectModuleMap } from 'src/constants/collect';

@Injectable()
export class CollectService {
  constructor(
    @InjectRepository(CollectEntity)
    private readonly CollectModule: Repository<CollectEntity>,
    @InjectRepository(ArticleEntity)
    private readonly ArticleModule: Repository<ArticleEntity>,
  ) {}

  async set(params, req) {
    const { articleId, toolId, resourceId, typeId, projectId, isLike } = params;
    const { userId } = req.payload;
    const key = getNotEmptyKey({ articleId, toolId, resourceId, projectId });
    const data: any = {};
    data.typeId = typeId;
    data.userId = userId;
    data[key] = params[key];
    /* If liking, add a new record; if disliking, pseudo-delete and retain the record */
    if (isLike == 1) {
      // Construct FindOneOptions
      const options: FindOneOptions<CollectEntity> = {
        where: { userId, delete: 0 },
      };

      // Use options in findOne method
      const isHasOwn = await this.CollectModule.findOne(options);

      if (isHasOwn) {
        throw new HttpException(
          'Already collected this item!',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.CollectModule.save(data);
      const module = collectModuleMap[key];
      const result = await this[module].findOne({
        where: { id: params[key] },
        select: ['collectionVolume'],
      });
      const collectionVolume = result ? result.collectionVolume + 1 : 1;
      await this[module].update({ id: params[key] }, { collectionVolume });
      return true;
    } else {
      const module = collectModuleMap[key];
      const result = await this[module].findOne({
        where: { id: params[key] },
        select: ['collectionVolume'],
      });
      const collectionVolume = result ? result.collectionVolume - 1 : 0;
      await this[module].update({ id: params[key] }, { collectionVolume });
      return await this.CollectModule.update(
        { [key]: params[key], userId },
        { delete: 1 },
      );
    }
  }
}
