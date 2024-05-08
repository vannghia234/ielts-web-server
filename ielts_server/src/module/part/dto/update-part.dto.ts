import { PartialType } from '@nestjs/mapped-types';
import { CreatePartDto } from './create-part.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Skill, PartNumber } from 'src/shared/constant/enum_database';

export class UpdatePartDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ enum: Skill, default: Skill.LISTENING })
  skill: Skill;

  @ApiProperty({ enum: PartNumber, default: PartNumber.Part1 })
  partNumber: PartNumber;
}
