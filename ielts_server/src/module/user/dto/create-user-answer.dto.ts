import { ApiProperty } from '@nestjs/swagger';
import {
	IsDate,
	IsDateString,
	IsNotEmpty,
	IsString,
	IsUUID,
} from 'class-validator';

export class CreateUserAnswerDto {
	@IsNotEmpty()
	@ApiProperty({ example: '2024-05-10 12:34:56' })
	@IsDateString()
	timeStart: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	@IsUUID()
	userId: string;
}
