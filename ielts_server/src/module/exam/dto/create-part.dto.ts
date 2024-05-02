import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, Length, IsString } from 'class-validator';
import { Skill } from 'src/shared/constant/enum_database';

export class CreatePartOfExamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  src: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsEnum(Skill)
  skill: Skill;
}


export class UpdatePartOfExamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  src: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsEnum(Skill)
  skill: Skill;
}
