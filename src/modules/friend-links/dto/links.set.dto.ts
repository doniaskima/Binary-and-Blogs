import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class LinksSetDto {
  @IsNotEmpty({ message: 'Link cannot be empty' })
  name: string;

  avatar: string;

  @IsNotEmpty({ message: 'Link address cannot be empty' })
  url: string;

  @IsNotEmpty({ message: 'Please Provide a brief link description' })
  desc: string;

  @IsOptional()
  @IsEnum([1, -1], { message: 'Invalid status parameter' })
  @Type(() => Number)
  status: number;

  orderId: number;
}
