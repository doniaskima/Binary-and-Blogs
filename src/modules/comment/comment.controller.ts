import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentSetDto } from './dto/comment.set.dto';

@ApiTags('Comment')
@Controller('/comment')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post('/set')
  set(@Body() params: CommentSetDto, @Request() req) {
    return this.CommentService.set(params, req);
  }
}
