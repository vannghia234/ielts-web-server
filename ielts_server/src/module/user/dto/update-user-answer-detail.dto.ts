import {
  IsNumber,
  IsString,
  IsUUID,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAnswerDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  score: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  answer: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  feedback: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsUUID()
  examDetailId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsUUID()
  userAnswerId: string;
}
