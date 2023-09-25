import { ArticleService } from './article.service';
import { ArticleReadDto } from './dto/read.article';
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
    return this.articleService.set(params);
  }

  @Post('/del')
  del(@Body() params) {
    return this.articleService.del(params);
  }

  @Get('/read')
  read(@Query() params: ArticleReadDto) {
    return this.articleService.read(params);
  }

  @Get('/hot')
  hot(@Query() {}) {
    return this.articleService.hot();
  }
}
