export interface IUserAnswerDetailItem {
	groupQuestionId: string;
	questionId: string;
	answer: string;
	isCorrect: boolean;
}

export class UserAnswerDetailItem implements IUserAnswerDetailItem {
	groupQuestionId: string;
	questionId: string;
	answer: string;
	isCorrect: boolean = false;
	constructor(data: IUserAnswerDetailItem) {
		this.groupQuestionId = data.groupQuestionId;
		this.questionId = data.questionId;
		this.answer = data.answer;
	}
}
