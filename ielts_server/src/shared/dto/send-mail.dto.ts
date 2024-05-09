import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class SendMailDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subject: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  listening_score: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  writing_score: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  speaking_score: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  reading_score: number;
}
