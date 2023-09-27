import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CreateUpdateRoomInfoDto {
  // @ApiProperty({ example: '555', description: 'Room ID', required: false })
  // @MinLength(3, { message: 'Minimum length for Room ID is 3' })
  // @MaxLength(3, { message: 'Maximum length for Room ID is 3' })
  // roomId: number;

  @ApiProperty({ example: '555', description: 'Room Name', required: false })
  @MinLength(2, { message: 'Minimum length for Room Name is 2' })
  @MaxLength(14, { message: 'Maximum length for Room Name is 14' })
  roomName: string;

  @ApiProperty({
    example: '555',
    description: 'Room Announcement',
    required: false,
  })
  @MaxLength(300, { message: 'Maximum length for Room Announcement is 300' })
  roomNotice: string;
}
