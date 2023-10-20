import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagSetDto } from './dto/set.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/set')
  set(@Body() params: TagSetDto) {
    return this.tagService.set(params);
  }
  
  @Get('/query')
  query(@Query() params) {
    return this.tagService.query(params);
  }

  @Post('/del')
  del(@Body() params) {
    return this.tagService.del(params);
  }
}
