import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { formatOnlineUser } from 'src/utils/utils-tools';
import { verifyToken } from 'src/utils/verifyToken';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { MessageEntity } from './message.entity';
import { RoomEntity } from './room.entity';

@WebSocketGateway(3002, {
  path: '/chat',
  allowEIO3: true,
  // cors: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class WsChatGateway {
  private logger: Logger = new Logger('ChatGateway');
  @WebSocketServer() private socket: Server;
  @InjectRepository(MessageEntity)
  private readonly MessageMode: Repository<MessageEntity>;
  @InjectRepository(UserEntity)
  private readonly UserModel: Repository<UserEntity>;
  @InjectRepository(RoomEntity)
  private readonly RoomModel: Repository<RoomEntity>;
  private clientIdMap: any = {};
  private onlineUserInfo: any = {};
  private roomList: any = {};

  /**
   * @desc After the client established a connection it first validates whether the token is valid
   * After successful token validation , it checks if the user is online and records all the information associted with the user and the room .
   * @param client
   * @returns
   */

  async handleConnection(client: Socket): Promise<any> {
    //The client.handshake.query object is typically used in Socket.IO applications to extract information from the client's handshake request. This information can then be used to personalize the user experience or to implement specific features
    const { token, address, roomId } = client.handshake.query;
    const payload = await verifyToken(token);
    const { userId } = payload;
    if (userId === -1 || !token) {
      client.emit('authFail', {
        code: -1,
        msg: 'Authorization validation failed, please log in again',
      });
      return client.disconnect();
    }
    const u = await this.UserModel.findOne({ where: { id: userId } });
    const { username, nickname, email, role, avatar, sign, roomBg } = u;
    const userInfo = {
      username,
      nickname,
      email,
      role,
      avatar,
      sign,
      roomBg,
      userId,
    };
    const isHasUser = this.onlineUserInfo[userId];
    /* If this user exists, inform the old user that they have been logged out and kick the previously joined user */
    if (isHasUser) {
      const { uuid } = isHasUser;
      /* Notify the new and old users */
      this.socket.to(uuid).emit('tips', {
        code: -2,
        msg: 'Your account has been logged in elsewhere, and you have been forcibly logged out',
      });
      client.emit('tips', {
        code: -1,
        msg: 'Your account has been logged in elsewhere and has been logged in for you!',
      });
      /* Kick out the old user */
      this.socket.in(uuid).disconnectSockets(true);
    }
    const roomInfo = await this.RoomModel.findOne({
      where: { roomId: Number(roomId) },
    });

    if (!roomInfo) {
      client.emit('tips', {
        code: -1,
        msg: 'You are trying to join a non-existent room, an illegal operation!!!',
      });
      return client.disconnect();
    }

    const onlineRoomIds: any = Object.keys(this.roomList).map((roomId) =>
      Number(roomId),
    );
    if (onlineRoomIds.length > 5 && !onlineRoomIds.includes(Number(roomId))) {
      client.emit('disableJoin', {
        code: -1,
        msg: "Due to limited server resources, the host restricts a maximum of five rooms online. Please be patient or join someone else's room!",
      });
      return client.disconnect();
    }
    client.join(roomId);
    //record room information
    !this.roomList[Number(roomId)] &&
      (await this.initBasicRoomInfo(roomId, roomInfo));
    this.roomList[Number(roomId)].onlineUserList.push(userInfo);

    /* uuid: unique communication ID */
    this.onlineUserInfo[userId] = { userInfo, roomId, uuid: client.id }; // Record room number along with online information
    this.clientIdMap[client.id] = userId; // Map to userId through clientId
    this.joinRoomSuccess(client, userId, nickname, address, roomId);
  }

  /**
   * @desc  Informs the client that it has successfully joined the room and returns specific information about the current room.
   * The client requests basic room information for integration.
   * @param userId User ID
   * @param nickname User nickname
   * @param roomId Room ID
   */
  joinRoomSuccess(client, userId, nickname, address, roomId) {
    const { onlineUserList } = this.roomList[Number(roomId)];
    const formattedUserList = formatOnlineUser(onlineUserList);
    client.emit('joinRoomSuccess', {
      userId,
      onlineUserList: formattedUserList,
      msg: `Welcome ${nickname} to the room!`,
    });
    /* Notify other users in the room about the new user's online status */
    this.socket.to(roomId).emit('newUserOnline', {
      onlineUserList: formattedUserList,
      msg: `${nickname} from ${address} has entered the room`,
    });
    const roomList = this.formatRoomList();
    this.socket.emit('recommendRoom', roomList);
  }
  formatRoomList() {
    const cloneData = JSON.parse(JSON.stringify(this.roomList));
    const formatRoomList = [];
    Object.keys(cloneData).forEach((roomId) => {
      const { onlineUserList, roomAdminInfo, roomInfo } = cloneData[roomId];
      const { roomName, roomNotice, roomNeedPassword, roomLogo } = roomInfo;
      formatRoomList.push({
        onlineUserNums: onlineUserList.length,
        roomName,
        roomNotice,
        roomLogo,
        roomId,
        isNeedPassword: roomNeedPassword,
        roomAdminNick: roomAdminInfo.nickname,
      });
    });
    return formatRoomList;
  }

  async initBasicRoomInfo(roomId, roomInfo) {
    delete roomInfo.createdAt;
    delete roomInfo.updatedAt;
    delete roomInfo.deletedAt;
    delete roomInfo.id;
    const { roomUserId } = roomInfo;
    const roomAdminInfo = await this.UserModel.findOne({
      where: { id: roomUserId },
      select: ['nickname', 'avatar'],
    });
    this.roomList[Number(roomId)] = {
      onlineUserList: [],
      musicQueueList: [],
      currentMusicInfo: [],
      [`timer${roomId}`]: null,
      roomInfo,
      roomAdminInfo,
    };
  }

  /**
   * @desc What to do when disconnecting
   * 	1. Obtain user information and the room information the user is in, and remove the user from the global online information.
   * 	2. Remove this user and update the online user information for the current room.
   * 	3. Check the current room's remaining number of people. If the current room has no people, delete the room's online status.
   * 		 If there are people in the room, update the room's online list again.
   * @param client
   */

  handleDisconnect(client: Socket) {
    const userId = this.clientIdMap[client.id];
    const user = this.onlineUserInfo[userId];
    if (!user) return;
    const { userInfo, roomId } = user;
    const { nickname } = userInfo;
    const delUserIndex = this.roomList[Number(roomId)].onlineUserList.findIndex(
      (t) => t.userId === userId,
    );
    this.roomList[Number(roomId)].onlineUserList.splice(delUserIndex, 1);
    delete this.onlineUserInfo[userId];
    if (
      !this.roomList[Number(roomId)].onlineUserList.length &&
      Number(roomId) !== 888
    ) {
      return delete this.roomList[Number(roomId)];
    }
    const onLineUserInfo = formatOnlineUser(
      this.roomList[Number(roomId)].onlineUserList,
    );
    this.socket.to(roomId).emit('offline', {
      code: 1,
      data: onLineUserInfo,
      msg: `${nickname} left the room`,
    });
  }

  /* Query online users */
  @SubscribeMessage('query')
  handleQueryOnline(client: Socket, data: any): void {
    const onlineUserInfo = formatOnlineUser(this.onlineUserInfo);
    client.emit('query', {
      data: onlineUserInfo,
      type: data,
      msg: 'Query complete',
    });
  }

  /* Receive messages from the client */
  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: any) {
    const { type, content } = data;
    const userId = this.clientIdMap[client.id];
    const user = this.onlineUserInfo[userId];
    const { userInfo, roomId } = user;
    const params = { userId, content, type, roomId };
    const result = await this.MessageMode.save(params);
    const { id } = result;
    this.socket.to(roomId).emit('message', {
      data: { type, content, userId, id, userInfo, createdAt: new Date() },
      msg: 'There is a new message',
    });
  }

  @SubscribeMessage('updateUserInfo')
  async handleUpdateUserInfo(client: Socket, data: any) {
    const userId = this.clientIdMap[client.id];
    const user = this.onlineUserInfo[userId];
    const { roomId } = user;
    const u = await this.UserModel.findOne({
      where: { id: userId },
      select: [
        'username',
        'nickname',
        'email',
        'avatar',
        'role',
        'roomBg',
        'sign',
      ],
    });
    const { username, nickname, email, avatar, role, roomBg, sign } = u;
    this.onlineUserInfo[userId] = {
      username,
      nickname,
      email,
      avatar,
      role,
      roomBg,
      sign,
    };
    const onlineUserInfo = formatOnlineUser(this.onlineUserInfo);
    this.socket.to(roomId).emit('online', {
      code: 1,
      data: onlineUserInfo,
      msg: `${nickname} updated personal information`,
    });
  }

  @SubscribeMessage('updateRoomInfo')
  async handlerUpdateRoomInfo(client: Socket, roomId) {
    const roomInfo = await this.RoomModel.findOne({ where: { roomId } });
    delete roomInfo.createdAt;
    delete roomInfo.updatedAt;
    delete roomInfo.deletedAt;
    if (!this.roomList[roomId]) return;
    this.roomList[roomId].roomInfo = roomInfo;
    const roomList = this.formatRoomList();
    client.emit('recommendRoom', roomList);
  }

  /**
   * @desc Send a global notification or announcement to the client.
   * @param param0
   */
  sendNotice(roomId, { type, content }) {
    this.socket.to(roomId).emit('notice', { type, content });
  }
}
