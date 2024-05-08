import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
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

type DataUnion =
  | MultipleChoice[]
  | MultipleResponse[]
  | Dropdown[]
  | Matching[]
  | MatchingHeading[]
  | FillTheBlank[]
  | MatchingFillBlank[];

export class UpdateGroupQuestionDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsNotEmpty()
  instruction?: string;

  @IsOptional()
  @IsEnum(QuestionType)
  questionType?: QuestionType;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  data?: DataUnion;

  @IsOptional()
  @IsUUID()
  partId?: string;
}
