import { Repository, LessThan, FindManyOptions } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CollectEntity } from '../collect/collect.entity';
import { CommonService } from '../common/common.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly ArticleModel: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
    @InjectRepository(CollectEntity)
    private readonly CollectModel: Repository<CollectEntity>,
    private readonly CommonService: CommonService,
  ) {}
  async set(params) {
    const { id, title } = params;
    if (id) return this.ArticleModel.update({ id }, params);

    const article = await this.ArticleModel.findOne({
      where: { title },
    });
    if (article && !id)
      throw new HttpException(
        'This article has already been uploaded!',
        HttpStatus.BAD_REQUEST,
      );

    /* Before adding a new article, query the maximum orderId */
    // const { orderId = 99 } = await this.ArticleModel.findOne({
    //   where: { orderId: LessThan(5000) },
    //   order: { orderId: 'DESC' },
    //   select: ['id', 'orderId'],
    // });

    // !params.orderId && (params.orderId = orderId + 10);
    return this.ArticleModel.save(params);
  }

  async del(params) {
    const { id } = params;
    return await this.ArticleModel.delete({ id });
  }

  async read({ id }) {
    const article = await this.ArticleModel.findOne({
      where: { id },
      select: ['readVolume'],
    });
    const readVolume = article ? article.readVolume + 1 : 1;
    return await this.ArticleModel.update({ id }, { readVolume });
  }

  async hot() {
    return await this.ArticleModel.find({
      order: { readVolume: 'DESC' },
      select: ['id', 'title', 'readVolume'],
      take: 10,
    });
  }

  async detail(params, req) {
    const { id } = params;
    const res: any = await this.ArticleModel.findOne({ where: { id } });
    const { tagId, userId } = res;
    const user: any = await this.UserModel.findOne({
      where: { id: userId },
      select: ['avatar'],
    });
    res.avatar = user.avatar;
    res.tagArray = await this.CommonService.findTagMap(tagId.split(','));
    if (req?.payload?.userId) {
      // Construct FindManyOptions
      const options: FindManyOptions<CollectEntity> = {
        where: { userId, articleId: id, delete: 0 },
      };

      // Use options in count method
      const isLiked = await this.CollectModel.count(options);

      isLiked && (res.isLiked = true);
    }
    return res;
  }
}
