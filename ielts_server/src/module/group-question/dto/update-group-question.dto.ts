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
import { ApiProperty } from '@nestjs/swagger';

type DataUnion =
	| MultipleChoice[]
	| MultipleResponse[]
	| Dropdown[]
	| Matching[]
	| MatchingHeading[]
	| FillTheBlank[]
	| MatchingFillBlank[];

export class UpdateGroupQuestionDto {
	@IsOptional()
	@IsNotEmpty()
	@ApiProperty()
	instruction?: string;

	@IsOptional()
	@IsEnum(QuestionType)
	@ApiProperty({ enum: QuestionType })
	questionType?: QuestionType;

	@IsOptional()
	@IsNotEmpty()
	@ApiProperty({ type: () => Object })
	@ValidateNested({ each: true })
	data?: DataUnion;

	@IsOptional()
	@IsUUID()
	partId?: string;
}
