import { ApiProperty } from '@nestjs/swagger';
import { UpdateGroupQuestionDto } from './update-group-question.dto';
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';

export class UpdateManyGroupQuestionDto {
	@ApiProperty()
	@IsUUID()
	@IsNotEmpty()
	partId: string;

	@ApiProperty({ type: () => UpdateGroupQuestionDto })
	@ValidateNested({ each: true })
	groupQuestions: UpdateGroupQuestionDto[];
}
