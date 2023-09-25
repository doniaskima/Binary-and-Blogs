import { IsNotEmpty, IsInt, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ArticleSetDto {
  @ApiProperty({ example: 'Summary about xxx', description: 'Article title' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({
    example: 'This is a summary about xx, mainly about...',
    description: 'Article description',
  })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  desc: string;

  //   @ApiProperty({
  //     example: 'http://xxxxx.png',
  //     description: 'Article cover image',
  //   })
  //   @IsNotEmpty({ message: 'Cover image cannot be empty' })
  //   coverImg: string;

  @ApiProperty({
    example: 'http://xxxxx.mp3',
    description: 'URL',
    required: false,
  })
  bgMusic: string;

  @ApiProperty({ example: 1, description: 'Author ID' })
  @IsInt({ message: 'Invalid author ID parameter type' })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Sorting ID, larger numbers come first',
    required: false,
  })
  orderId: number;

  //   @ApiProperty({ example: 1, description: 'Category ID' })
  //   @IsInt({ message: 'Invalid category ID parameter type' })
  //   typeId: number;

  @ApiProperty({
    example: 'About xxxxx',
    description: 'Main content of the article',
  })
  content: string;

  @ApiProperty({
    example: 1,
    description: 'Article status, 1: Published, 2: Draft',
    required: true,
    enum: [1, -1],
    name: 'status',
  })
  @IsOptional()
  @IsEnum([1, -1], { message: 'Invalid status parameter' })
  @Type(() => Number)
  status: number;
}
