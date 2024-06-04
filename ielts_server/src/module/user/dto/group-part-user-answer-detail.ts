import { IUserAnswerDetailAnswer } from 'src/lib/entity/user/user-answer-detail-answer.interface';

export interface IUserAnswerDetailForExamSkillDetail {
	examSkillDetailId: string;
	answers: IUserAnswerDetailAnswer[];
}
