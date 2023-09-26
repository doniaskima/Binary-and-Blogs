import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceTypeSetDto {
  @ApiProperty({
    example: 1,
    description: 'Add resource category name',
    name: 'name',
  })
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  name: string;
}
