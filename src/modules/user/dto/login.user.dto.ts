import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserLoginDto {
  @ApiProperty({ example: 'admin', description: 'Username', required: true })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @ApiProperty({ example: '123456', description: 'Password', required: true })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(30, { message: 'Password cannot exceed 30 characters' })
  password: string;
}
