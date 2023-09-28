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

@Controller('chat')
export class chatController {
  constructor(private readonly ChatService: ChatService) {}

  @Post('/createRoom')
  createRoom(@Body() params: CreateUpdateRoomInfoDto, @Request() req) {
    // return this.ChatService.createRoom(params, req.payload);
  }
}
