import { IsNotEmpty } from 'class-validator';

export class AccountActiveDto {
  @IsNotEmpty({ message: 'verification code must be filled' })
  code: number;

  @IsNotEmpty({ message: 'E-mail can not be empty' })
  email: string;
}
