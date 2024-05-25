import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsDate,
	IsDateString,
	IsNotEmpty,
	IsString,
	IsUUID,
} from 'class-validator';
import { CreateUserAnswerDto } from './create-user-answer.dto';

export class ReqCreateUserAnswerDto extends CreateUserAnswerDto {
	@IsNotEmpty()
	@IsArray()
	examSkills: IReqExamSkill[];
}

export interface IReqExamSkill {
	id: string;
	name: string;
}
