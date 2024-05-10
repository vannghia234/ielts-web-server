import { Optional } from '@nestjs/common';
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

export class CreateExamDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	code: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	title: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	src: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	description: string;

	@IsOptional()
	@ApiProperty({ example: '09:30:00' })
	time: string;

	@IsOptional()
	@IsEnum(TestStatus)
	@IsString()
	@ApiProperty()
	status: TestStatus;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	password: string;
}
