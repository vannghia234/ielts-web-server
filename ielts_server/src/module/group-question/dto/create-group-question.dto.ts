import { IsEnum, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from 'src/shared/constant/enum_database';
import {
  MultipleChoice,
  MultipleResponse,
  Dropdown,
  Matching,
  MatchingHeading,
  FillTheBlank,
  MatchingFillBlank,
} from 'src/lib/entity/groupQuestion/QuestionType';

// Create a union type of all possible data types
type DataUnion =
  | MultipleChoice[]
  | MultipleResponse[]
  | Dropdown[]
  | Matching[]
  | MatchingHeading[]
  | FillTheBlank[]
  | MatchingFillBlank[];

export class CreateGroupQuestionDto {
  @IsNotEmpty()
  instruction: string;

  @IsEnum(QuestionType)
  questionType: QuestionType;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  data: DataUnion; // Use the union type here

  @IsNotEmpty()
  @IsUUID()
  partId: string;
}
