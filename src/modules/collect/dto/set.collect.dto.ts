import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CollectSetDto {
  @ApiProperty({
    example: '1',
    description: 'Type of the thing being collected',
  })
  @IsNotEmpty({ message: 'Collection type cannot be empty!' })
  typeId: number;

  @ApiProperty({ example: '1', description: 'Article Id', required: false })
  articleId: number;

  @ApiProperty({ example: '1', description: 'Tool Id', required: false })
  toolId: number;

  @ApiProperty({
    example: '1',
    description: 'Resource navigation Id',
    required: false,
  })
  resourceId: number;

  @ApiProperty({ example: '1', description: 'Project Id', required: false })
  projectId: number;

  @ApiProperty({
    example: '1',
    description: 'Like or unlike (1 or 0)',
    required: false,
  })
  @IsOptional()
  @IsEnum([1, 0], { message: 'Invalid status parameter' })
  @Type(() => Number)
  isLike: number;
}
