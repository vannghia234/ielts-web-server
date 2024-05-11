import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { CreateGroupQuestionDto } from './create-group-question.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateManyGroupQuestionDto {
	@IsUUID()
	@ApiProperty()
	@IsNotEmpty()
	partId: string;

	@IsNotEmpty()
	@ValidateNested({ each: true })
	@ApiProperty({ type: () => CreateGroupQuestionDto })
	groupQuestions: CreateGroupQuestionDto[];
}
