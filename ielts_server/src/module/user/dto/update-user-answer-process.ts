import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
	isNumber,
} from 'class-validator';

export class UpdateUserAnswerProcessDTO {
	@IsNotEmpty()
	@ApiProperty()
	@IsString()
	id: string;

	@ApiProperty()
	@IsNumber()
	totalScore: number;

	@IsArray()
	@IsNotEmpty()
	details: DataScoreOfPartDTO[];
}

export class DataScoreOfPartDTO {
	@IsNotEmpty()
	@ApiProperty()
	id: string;

	@ApiProperty()
	@IsNumber()
	score: number;

	@ApiProperty()
	@IsString()
	feedback: string;
}
