import { IsNumber, IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserAnswerDetailItem } from 'src/lib/entity/user/i-user-answer-detail-answer.interface';

export class CreateUserAnswerDetailDtoBase {
	@IsNotEmpty()
	@ApiProperty({ type: 'jsonb' })
	answersOfParts: IReqGroupExamSkillDetail[];

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	@IsUUID()
	processId: string;
}

export interface IReqGroupExamSkillDetail {
	examSkillDetailId: string;
	groups: IReqGroupAnswer[];
}

export interface IReqGroupAnswer {
	id: string;
	answers: IReqCreateUserAnswerDetail[];
}

export interface IReqCreateUserAnswerDetail extends UserAnswerDetailItem {
	updateAt: number; // milliseconds
}
