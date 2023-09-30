import { Controller, Post, Get, Body, Query, Request } from '@nestjs/common';
import { CollectSetDto } from './dto/set.collect.dto';
import { CollectService } from './collect.service';

@Controller('collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Post('/set')
  set(@Body() params: CollectSetDto, @Request() req) {
    return this.collectService.set(params, req);
  }
}
