import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { Type } from 'class-transformer';

export class UserRegisterDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @IsNotEmpty({ message: 'User nickname cannot be empty' })
  @MaxLength(8, { message: 'User nickname cannot exceed 8 characters' })
  nickname: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(30, { message: 'Password cannot exceed 30 characters' })
  password: string;

  @IsEmail({}, { message: 'Please provide a valid email format' })
  email: string;

  isUseEmailVer: boolean;

  avatar: string;

  @IsOptional()
  @IsEnum([1, 2], { message: 'Status can only be 1 or 2' })
  status: number;
}
