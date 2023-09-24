import { ApiProperty } from '@nestjs/swagger';

export class ArticleReadDto {
  @ApiProperty({ example: 1, description: 'Article ID' })
  id: number;
}
