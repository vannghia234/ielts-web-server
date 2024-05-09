import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from 'src/shared/constant/enum_database';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupQuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  data: any;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  @ApiProperty({ enum: QuestionType })
  type: QuestionType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsUUID()
  partOfExamId: string;
}
