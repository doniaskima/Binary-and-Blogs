import { UserEntity } from './../user/user.entity';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Repository, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOperator, In } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly CommentModel: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
  ) {}

  async set(params, payload) {
    const { userId: id } = payload;
    const data = { ...params, id };
    return await this.CommentModel.save(data);
  }

  async query(params) {
    const {page = 1 , pageSize =10 , status , articleId} = params
    const variable: any = { upId: null };
    status && (variable.status = status);    
    articleId && (variable.articleId = articleId);
    !articleId && (variable.articleId= IsNull());
    const rows = await this.CommentModel.find({
      order : {id:'DESC'},
      where:variable,
      skip: (page - 1) * pageSize,
      take: pageSize,
      cache: true,
    })
    const commentIds = rows.map((t)=>t.id);
    const childComment = await this.CommentModel.find({
      where: { upId: In([...new Set(commentIds)]) }, 
    });
    const upperIds = [...new Set(rows.map((t) => t.userId))];
		const lowerIds = [...new Set(childComment.map((t) => t.userId))];
		const userIds = [...new Set([...upperIds, ...lowerIds])];
    const userInfo= await this.UserModel.find({
      where: {
        id: In(userIds),
      }
    })
    rows.forEach((t:any) =>{
      t.nickname = userInfo.find((k) => k.id === t.userId)['nickname'];
      t.avatar = userInfo.find((k) => k.id === t.userId)['avatar'];
      t.role = userInfo.find((k) => k.id === t.userId)['role'];
      t.chlidComment = childComment.filter((k) => t.id === k.upId);

    })
    const count = await this.CommentModel.count(variable)
    return { rows, count}
  }
}
