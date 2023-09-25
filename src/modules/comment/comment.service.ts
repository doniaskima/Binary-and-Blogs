import { UserEntity } from './../user/user.entity';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Repository, In, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly CommentModel: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
  ) {}

  async set(params, req) {
    const { userId } = req.payload;
    const data = { ...params, userId };
    return await this.CommentModel.save(data);
  }

  async query(params) {
    // // Destructure parameters with default values
    // const { page = 1, pageSize = 10, status, articleId } = params;

    // // Define a condition object for the database query
    // const where = { upId: null };

    // // Apply status and articleId as conditions if provided
    // status && (where.status = status);
    // articleId && (where.articleId = articleId);
    // !articleId && (where.articleId = IsNull());

    // // Query the CommentModel to retrieve comments based on conditions
    // const rows = await this.CommentModel.find({
    //   order: { id: 'DESC' },
    //   where,
    //   skip: (page - 1) * pageSize,
    //   take: pageSize,
    //   cache: true,
    // });

    // // Retrieve IDs of comments and child comments
    // const commentIds = rows.map((t) => t.id);
    // const childComment = await this.CommentModel.find({
    //   upId: In([...new Set(commentIds)]),
    // });

    // // Get unique user IDs from main comments and child comments
    // const upperIds = [...new Set(rows.map((t) => t.userId))];
    // const lowerIds = [...new Set(childComment.map((t) => t.userId))];
    // const userIds = [...new Set([...upperIds, ...lowerIds])];

    // // Retrieve user information based on user IDs
    // const userInfo = await this.UserModel.find({ id: In(userIds) });

    // // Assign user information to child comments
    // childComment.forEach((t) => {
    //   t.nickname = userInfo.find((k) => k.id === t.userId)['nickname'];
    //   t.avatar = userInfo.find((k) => k.id === t.userId)['avatar'];
    //   t.role = userInfo.find((k) => k.id === t.userId)['role'];
    // });

    // // Assign user information and child comments to main comments
    // rows.forEach((t) => {
    //   t.nickname = userInfo.find((k) => k.id === t.userId)['nickname'];
    //   t.avatar = userInfo.find((k) => k.id === t.userId)['avatar'];
    //   t.role = userInfo.find((k) => k.id === t.userId)['role'];
    //   t.childComment = childComment.filter((k) => t.id === k.upId);
    // });

    // const count = await this.CommentModel.count(where);
    // return { rows, count };
  }
}
