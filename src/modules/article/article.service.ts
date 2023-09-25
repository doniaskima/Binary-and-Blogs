import { Repository, LessThan } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly ArticleModel: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
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
    const { orderId = 99 } = await this.ArticleModel.findOne({
      where: { orderId: LessThan(5000) },
      order: { orderId: 'DESC' },
      select: ['id', 'orderId'],
    });

    !params.orderId && (params.orderId = orderId + 10);
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
}
