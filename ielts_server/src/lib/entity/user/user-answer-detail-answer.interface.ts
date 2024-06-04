import { IReqCreateUserAnswerDetail } from 'src/module/user/dto/create-user-detail-base.dto';

export interface IUserAnswerDetailAnswer {
	groupQuestionId: string;
	answerId: string;
	value: string[];
	isCorrect: boolean;
}

export class UserAnswerDetailAnswer implements IUserAnswerDetailAnswer {
	groupQuestionId: string;
	answerId: string;
	value: string[];
	isCorrect: boolean;
	constructor(data: IReqCreateUserAnswerDetail) {
		this.groupQuestionId = data.groupQuestionId;
		this.answerId = data.id;
		this.value = data.value;
		this.isCorrect = false;
	}
}
