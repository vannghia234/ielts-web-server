import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from 'src/shared/constant/enum_database';
import { ApiProperty } from '@nestjs/swagger';
import {
  DragAndDrop,
  MultipleAnswer,
  MultipleChoice,
  ShortAnswer,
} from 'src/shared/constant/object';

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
