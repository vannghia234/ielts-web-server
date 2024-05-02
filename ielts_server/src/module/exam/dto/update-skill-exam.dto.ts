import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString, IsUUID } from 'class-validator';
import { Skill } from 'src/shared/constant/enum_database';

export class UpdateSkillExamDto {
  @IsNotEmpty()
  @ApiProperty({ enum: Skill })
  @IsEnum(Skill)
  name: Skill;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsUUID()
  examId: string;
}
