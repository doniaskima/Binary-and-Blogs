import { UserEntity } from '../user/user.entity';
import { MessageEntity } from './message.entity';
import { RoomEntity } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly MessageModel: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly UserModel: Repository<UserEntity>,
    @InjectRepository(RoomEntity)
    private readonly RoomModel: Repository<RoomEntity>,
  ) {}
}
