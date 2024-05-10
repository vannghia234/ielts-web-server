import { IsNumber, IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAnswerDetailDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty()
	score: number;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	answer: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	feedback: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	@IsUUID()
	examDetailId: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	@IsUUID()
	userAnswerId: string;
}
