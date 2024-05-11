import {
	IsEnum,
	IsNotEmpty,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator';
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
import { ApiProperty } from '@nestjs/swagger';

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
	@IsString()
	@ApiProperty()
	instruction: string;

	@IsEnum(QuestionType)
	@IsNotEmpty()
	@ApiProperty()
	questionType: QuestionType;

	@IsNotEmpty()
	@ApiProperty()
	@ValidateNested({ each: true })
	data: DataUnion; // Use the union type here

	@IsNotEmpty()
	@ApiProperty()
	@IsUUID()
	partId: string;
}
