import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FriendLinksService } from './friend-links.service';
import { LinksSetDto } from './dto/links.set.dto';

@Controller('friend-links')
export class FriendLinksController {
  constructor(private readonly friendLinksService: FriendLinksService) {}

  @Post('/set')
  set(@Body() params: LinksSetDto) {
    return this.friendLinksService.set(params);
  }


  @Post('/del')
  del(@Body() params) {
      return this.friendLinksService.del(params);
  }

  @Get('/query')
  query(@Query() params) {
      return this.friendLinksService.query(params);
  }
}
