import {
  IsNumber,
  IsString,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAnswerDetailDto {
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
