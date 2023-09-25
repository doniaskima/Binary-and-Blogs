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
}
