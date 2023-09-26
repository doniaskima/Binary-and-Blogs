import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceSetDto {
  @ApiProperty({
    example: 1,
    description: 'Resource category',
    name: 'resourceId',
  })
  @IsNotEmpty({ message: 'Resource category cannot be empty' })
  resourceId: number;

  @ApiProperty({
    example: 'http://xxxx.png',
    description: 'Resource LOGO',
    name: 'logo',
    required: false,
  })
  logo: string;

  @ApiProperty({
    example: 'vue',
    description: 'Add resource name',
    name: 'name',
  })
  @IsNotEmpty({ message: 'Resource name cannot be empty' })
  name: string;

  @ApiProperty({
    example: 'This is a frontend framework',
    description: 'Add resource description',
    name: 'desc',
  })
  @IsNotEmpty({ message: 'Resource description cannot be empty' })
  desc: string;

  @ApiProperty({
    example: 'www.baidu.com',
    description: 'Add resource URL',
    name: 'url',
  })
  @IsNotEmpty({ message: 'Resource URL cannot be empty' })
  url: string;

  @ApiProperty({
    example: 1,
    description: 'Custom sort number',
    name: 'orderId',
    required: false,
  })
  orderId: number;
}
