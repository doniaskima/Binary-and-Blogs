import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentSetDto {
  @ApiProperty({
    example:
      'The blogger wrote this article very well, but there are a few points xxxx',
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
