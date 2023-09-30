import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';
import { TypeEntity } from '../type/type.entity';
import { UserEntity } from '../user/user.entity';
import MergeArticleInfo from './type';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
    @InjectRepository(TypeEntity)
    private readonly TypeModel: Repository<TypeEntity>,
    @InjectRepository(TagEntity)
    private readonly TagModel: Repository<TagEntity>,
  ) {}

  //Get all user names mapped back.
  async findUserMap(ids) {
    return await this.UserModel.find({
      where: { id: In(ids) },
      select: ['id', 'username', 'nickname'],
    }).then((res) => {
      return res;
    });
  }

  //Get all category names mapped back.
  async findTypeMap(ids) {
    return await this.TypeModel.find({
      where: { id: In(ids) },
      select: ['id', 'name'],
    }).then((res) => {
      return res;
    });
  }

  //Get all tags mapped back
  async findTagMap(ids) {
    return await this.TagModel.find({
      where: { id: In(ids) },
      select: ['id', 'name'],
    }).then((res) => {
      return res;
    });
  }

  //Merge data back, assemble names, tags, and category names.
  async mergeArticleInfo(mergeArticleInfo: MergeArticleInfo) {
    const { data, users, types, tags } = mergeArticleInfo;
    if (!data.length) return;
    data.forEach((item: any) => {
      users &&
        (item.nickname = users.find((t: any) => t.id == item.userId)[
          'nickname'
        ]);
      types &&
        (item.typeName = types.find((t: any) => t.id == item.typeId)['name']);
      const tagIdArr = item.tagId.split(',');
      item.tagArr = [];
      tagIdArr.forEach((k) =>
        item.tagArr.push(tags.find((t: any) => t.id == k)),
      );
      delete item.content;
    });
  }
}
