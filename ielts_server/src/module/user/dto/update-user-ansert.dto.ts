import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUserAnswerDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  timeStart: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsUUID()
  userId: string;
}
