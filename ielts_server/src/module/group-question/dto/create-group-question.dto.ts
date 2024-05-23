import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
	MultipleChoice,
	MultipleResponse,
	Dropdown,
	DragAndDrop,
	MatchingHeading,
	FillTheBlank,
	MatchingFillBlank,
} from 'src/lib/entity/groupQuestion/QuestionType';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from 'src/shared/constant/enum_database';

// Create a union type of all possible data types
type DataUnion =
	| MultipleChoice[]
	| MultipleResponse[]
	| Dropdown[]
	| DragAndDrop[]
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

	@ApiProperty()
	@IsOptional()
	@IsUUID()
	partId?: string;
}
