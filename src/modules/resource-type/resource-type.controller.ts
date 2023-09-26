import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResourceTypeSetDto } from './dto/resourceType.set.dto';
import { ResourceTypeService } from './resource-type.service';

@Controller('/resourceType')
export class ResourceTypeController {
  constructor(private readonly resourceTypeService: ResourceTypeService) {}

  @Post('/set')
  set(@Body() params: ResourceTypeSetDto) {
    return this.resourceTypeService.set(params);
  }

  @Get('/query')
  query(@Query() params) {
    return this.resourceTypeService.query(params);
  }

  @Get('/queryAll')
  queryAll(@Query() params) {
    return this.resourceTypeService.queryAll(params);
  }

  @Post('/del')
  del(@Body() params) {
    return this.resourceTypeService.del(params);
  }
}
