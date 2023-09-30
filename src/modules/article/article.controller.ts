import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleReadDto } from './dto/read.article';
import { ArticleSetDto } from './dto/set.article';

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
  @Get('/detail')
  detail(@Query() params, @Request() req) {
    return this.articleService.detail(params, req);
  }
}
