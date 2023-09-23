import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(30, { message: 'Password cannot exceed 30 characters' })
  password: string;
}
