import { Controller, Post, Get, Body, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentSetDto } from './dto/comment.set.dto';
import { CommentService } from './comment.service';

@ApiTags('Comment')
@Controller('/comment')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post('/set')
  set(@Body() params: CommentSetDto, @Request() req) {
    return this.CommentService.set(params, req);
  }

  @Get('/query')
  query(@Query() params) {
    return this.CommentService.query(params);
  }
}
