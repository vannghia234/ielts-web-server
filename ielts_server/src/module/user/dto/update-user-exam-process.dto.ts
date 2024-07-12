import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserExamProcessDTO {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	userAnswerId: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	skillExamId: string;
}
