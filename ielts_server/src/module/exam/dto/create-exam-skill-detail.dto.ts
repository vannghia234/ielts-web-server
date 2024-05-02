import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsUUID, IsString } from 'class-validator';

export class CreateExamSkillDetailDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  partOfTestId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  skillExamId: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @ApiProperty()
  time: string;
}

export class UpdateExamSkillDetailDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  partOfTestId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  skillExamId: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @ApiProperty()
  time: string;
}
