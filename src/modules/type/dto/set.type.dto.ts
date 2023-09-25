import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TypeSetDto {
  @ApiProperty({ example: 'Vue', description: 'Category name' })
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  name: string;

  @ApiProperty({
    example: 'vue',
    description: 'Category English abbreviation for beautifying the final URL',
  })
  @IsNotEmpty({ message: 'Category English abbreviation cannot be empty' })
  value: string;

  @ApiProperty({
    example: 'This is a summary of Vue category',
    description: 'Description about the category',
  })
  @IsNotEmpty({ message: 'Description is a required field!' })
  @MaxLength(30, { message: 'Cannot exceed 30 characters!' })
  desc: string;
}
