import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsOptional,
	IsDateString,
	IsEnum,
	Length,
	IsString,
} from 'class-validator';
import { TestStatus } from 'src/shared/constant/enum_database';

export class UpdateExamDto {
	@IsOptional()
	@IsString()
	@ApiProperty()
	code: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	name: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	title: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	src: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	description: string;

	@IsOptional()
	@IsDateString()
	@ApiProperty({ example: '09:30:00' })
	time: string;

	@IsOptional()
	@IsEnum(TestStatus)
	@IsString()
	@ApiProperty()
	status: TestStatus;

	@IsOptional()
	@IsString()
	@ApiProperty()
	password: string;
}
