import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({ example: 'admin', description: 'Username' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @ApiProperty({ example: 'Donia', description: 'User nickname' })
  @IsNotEmpty({ message: 'User nickname cannot be empty' })
  @MaxLength(8, { message: 'User nickname cannot exceed 8 characters' })
  nickname: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(30, { message: 'Password cannot exceed 30 characters' })
  password: string;

  @ApiProperty({ example: '123456@qq.com', description: 'Email' })
  @IsEmail({}, { message: 'Please provide a valid email format' })
  email: string;

  @ApiProperty({
    example: true,
    description: 'Whether to skip email verification',
  })
  isUseEmailVer: boolean;

  @ApiProperty({
    example: 'https://www.xxxx.png',
    description: 'Avatar',
    required: false,
  })
  avatar: string;

  @ApiProperty({
    example: 1,
    description: 'Account status',
    required: false,
    enum: [1, 2],
  })
  @IsOptional()
  @IsEnum([1, 2], { message: 'Status can only be 1 or 2' })
  status: number;
}
