import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TypeDelDto {
  @ApiProperty({
    example: 1,
    description: 'Category ID for deletion',
    name: 'Category ID',
  })
  @IsInt({ message: 'Incorrect parameter type passed!' })
  id: string;
}
