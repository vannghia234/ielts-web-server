import { Skill, PartNumber } from 'src/shared/constant/enum_database';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ enum: Skill, default: Skill.LISTENING })
  skill: Skill;

  @ApiProperty()
  content: string;

  @ApiProperty()
  resource: string;

  @ApiProperty({ enum: PartNumber, default: PartNumber.Part1 })
  partNumber: PartNumber;
}
