import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentSetDto {
  @ApiProperty({
    example:
      'The author did an excellent job with this article, although there are a few aspects that could be improved.',
    description: 'Comment content',
  })
  @IsNotEmpty({ message: 'Comment content cannot be empty' })
  comment: string;

  @ApiProperty({
    example: 1,
    description: 'Parent comment id, for first-level comments',
    required: false,
  })
  upId: string;

  @ApiProperty({ example: 1, description: 'Article id', required: false })
  articleId: number;
}
