import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEnum,
  Length,
  IsString,
} from 'class-validator';
import { TestStatus } from 'src/shared/constant/enum_database';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  src: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({example: "2024-02-02 19"})
  time: string;

  @IsOptional()
  @IsEnum(TestStatus)
  @IsString()
  @ApiProperty()
  status: TestStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
