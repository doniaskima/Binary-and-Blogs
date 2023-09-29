import { UserEntity } from '../user/user.entity';
import { MessageEntity } from './message.entity';
import { RoomEntity } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { In, Repository } from 'typeorm';

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

  async createRoom(params, payload) {
    const { roomId, userId, avatar } = payload;
    const { roomName, roomId: newRoomId, roomNotice } = params;
    if (roomId) {
      throw new HttpException(
        'Illegal operation, you already have a personal room!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const oldRoom = await this.RoomModel.count({
      where: { roomId: newRoomId },
    });

    if (oldRoom) {
      throw new HttpException(
        'The current room number has already been registered, please choose a different room number!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.RoomModel.save({
      roomName,
      roomId: newRoomId,
      roomNotice,
      roomUserId: userId,
      roomLogo: avatar,
    });

    const res = await this.UserModel.update(
      { id: userId },
      { roomId: newRoomId },
    );

    return res;
  }

  async updateRoom(params, payload) {
    const { userId } = payload;
    const room = await this.RoomModel.findOne({
      where: { roomUserId: userId },
    });
    const { roomId } = room;
    const { roomName, roomNotice, roomLogo } = params;
    const updateData: any = {};
    roomName && (updateData.roomName = roomName);
    roomNotice && (updateData.roomNotice = roomNotice);
    roomLogo && (updateData.roomLogo = roomLogo);
    await this.RoomModel.update({ roomId }, updateData);
    return 'Room information modified successfully';
  }

  async roomInfo(params) {
    const { roomId } = params;
    return await this.RoomModel.findOne({
      where: { roomId },
      select: [
        'roomId',
        'roomName',
        'roomNotice',
        'roomNeedPassword',
        'roomLogo',
        'roomBg',
      ],
    });
  }

  async history(params) {
    const { page = 1, pagesize = 100, roomId } = params;
    const messageInfo = await this.MessageModel.find({
      where: { roomId },
      order: { id: 'DESC' },
      skip: (page - 1) * pagesize,
      take: pagesize,
    });
    const userIds = [];
    messageInfo.forEach(
      (t) => !userIds.includes(t.userId) && userIds.push(t.userId),
    );
    const userInfos = await this.UserModel.find({
      where: { id: In(userIds) },
      select: ['id', 'nickname', 'avatar'],
    });
    userInfos.forEach((t: any) => (t.userId = t.id));
    messageInfo.forEach(
      (t: any) =>
        (t.userInfo = userInfos.find((k: any) => k.userId === t.userId)),
    );
    return messageInfo;
  }
}
