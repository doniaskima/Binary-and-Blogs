import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../user/user.entity';
import { WsChatGateway } from './chat.getaway';
import { ChatService } from './chat.service';
import { MessageEntity } from './message.entity';
import { RoomEntity } from './room.entity';
import { chatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity, RoomEntity])],
  providers: [WsChatGateway, ChatService],
  controllers: [chatController],
})
export class ChatModule {
  constructor() {}
}
