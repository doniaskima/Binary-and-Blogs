import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResourceService } from './ressource.service';
import { ResourceSetDto } from './dto/ressource.set.dto';

@Controller('/resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Post('/set')
  set(@Body() params: ResourceSetDto) {
    return this.resourceService.set(params);
  }

  @Post('/del')
  del(@Body() params) {
    return this.resourceService.del(params);
  }

  @Get('/query')
  query(@Query() params) {
    return this.resourceService.query(params);
  }
}
