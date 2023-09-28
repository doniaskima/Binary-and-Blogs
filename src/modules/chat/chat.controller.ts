import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Req,
  Request,
} from '@nestjs/common';
import { CreateUpdateRoomInfoDto } from './dto/room.dto';
import { ChatService } from './chat.service';
import { RoomInfoDto } from './dto/search.dto';

@Controller('chat')
export class chatController {
  constructor(private readonly ChatService: ChatService) {}

  @Post('/createRoom')
  createRoom(@Body() params: CreateUpdateRoomInfoDto, @Request() req) {
    return this.ChatService.createRoom(params, req.payload);
  }

  @Post('/updateRoom')
  updateRoom(@Body() params, @Request() req) {
    return this.ChatService.updateRoom(params, req.payload);
  }

  @Get('/roomInfo')
  roomInfo(@Query() params: RoomInfoDto) {
    return this.ChatService.roomInfo(params);
  }
}
