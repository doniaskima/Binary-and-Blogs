import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmoticonSearchDto {
  @ApiProperty({ example: 'Laugh', description: 'Keyword', required: true })
  @IsNotEmpty({
    message: 'Please enter the emoticon pack name you want to search for!',
  })
  keyword: string;
}

export class RoomInfoDto {
  @ApiProperty({ example: 666, description: 'Room ID', required: true })
  @IsNotEmpty({ message: 'Please provide the Room ID!' })
  roomId: string;
}
