import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserAnswerDto {
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
