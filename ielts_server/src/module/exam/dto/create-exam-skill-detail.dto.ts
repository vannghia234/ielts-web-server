import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsDateString,
	IsUUID,
	IsString,
	IsTimeZone,
	IsOptional,
} from 'class-validator';

export class CreateExamSkillDetailDto {
	@IsNotEmpty()
	@IsUUID()
	@ApiProperty()
	partOfTestId: string;

	@IsNotEmpty()
	@IsUUID()
	@ApiProperty()
	skillExamId: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ example: '09:30:00' })
	time: string;
}

export class UpdateExamSkillDetailDto {
	@IsNotEmpty()
	@IsUUID()
	@ApiProperty()
	partOfTestId: string;

	@IsNotEmpty()
	@IsUUID()
	@ApiProperty()
	skillExamId: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: '09:30:00' })
	time: string;
}
