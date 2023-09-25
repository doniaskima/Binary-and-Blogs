import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagSetDto {
  @ApiProperty({ example: 'Vue', description: 'Tag name' })
  @IsNotEmpty({ message: 'Tag name cannot be empty' })
  @MaxLength(9, { message: 'Tag name cannot exceed 9 characters' })
  name: string;
}
