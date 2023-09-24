import { ArticleService } from './article.service';
import { ArticleSetDto } from './dto/set.article';
import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Request,
  Response,
} from '@nestjs/common';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/set')
  set(@Body() params: ArticleSetDto) {
    // set(@Body() params) {
    return this.articleService.set(params);
  }

  @Post('/del')
  del(@Body() params) {
    return this.articleService.del(params);
  }
}
