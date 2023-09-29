import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from '../user/user.entity';
import { verifyToken } from 'src/utils/verifyToken';
import { formatOnlineUser } from 'src/utils/utils-tools';

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
    const roomInfo = await this.RoomModel.findOne({ where: { roomId } });
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
}