import { ArticleEntity } from './../article/article.entity';
import { TypeEntity } from './type.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(TypeEntity)
    private readonly TypeModel: Repository<TypeEntity>,
    @InjectRepository(ArticleEntity)
    private readonly ArticleModel: Repository<ArticleEntity>,
  ) {}

  async set(params) {
    const { name, desc, value, id } = params;
    const type = await this.TypeModel.findOne({ where: { name } });
    if (type) {
      return await this.TypeModel.update(
        { id: type.id },
        { name, desc, value },
      );
    }
    if (id) {
      return await this.TypeModel.update({ id }, { name, desc, value });
    }
    return await this.TypeModel.save({ name, desc, value });
  }
  async del(params) {
    const { id } = params;
    const count = await this.ArticleModel.count({ where: { typeId: id } });
    if (count > 0) {
      throw new HttpException(
        'This category is being used by some articles!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.TypeModel.delete({ id });
  }

  async query(params) {
    const { page = 1, pageSize = 10 } = params;
    const rows = await this.TypeModel.find({
      order: { id: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      cache: true,
    });
    const count = await this.TypeModel.count();
    return { rows, count };
  }
}
