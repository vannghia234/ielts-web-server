import { IsNumber, IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAnswerDetailDtoBase {
	@IsNotEmpty()
	@ApiProperty({ type: 'jsonb' })
	answers: IReqCreateUserAnswerDetail[];

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	@IsUUID()
	examSkillDetailId: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	@IsUUID()
	processId: string;
}

export interface IReqCreateUserAnswerDetail {
	examSkillDetailId: string;
	groupQuestionId: string;
	id: string;
	value: string[];
	updateAt: number; // milliseconds
}
