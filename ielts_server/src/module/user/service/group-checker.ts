import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { IReqGroupAnswer } from '../dto/create-user-detail-base.dto';
import { QuestionType } from 'src/shared/constant/enum_database';
import {
	IAnswerData,
	IGroupAnswer,
} from 'src/lib/entity/user/i-user-answer-detail-answer.interface';

export class GroupChecker {
	constructor(
		protected readonly groupQuestion: GroupQuestion,
		protected readonly groupAnswer: IReqGroupAnswer,
	) {}

	instance(): GroupChecker {
		if (this.groupQuestion.questionType === QuestionType.FillInTheBlank) {
			return new GroupCheckerModelFillInTheBlank(
				this.groupQuestion,
				this.groupAnswer,
			);
		}

		return this;
	}

	execute(): IGroupAnswer {
		const groupAnswersResult: IGroupAnswer = {
			id: this.groupQuestion.id,
			answers: [],
		};
		// console.log('questions: ', this.groupQuestion.data);
		// console.log('--------------------------------');
		// console.log('groupAnswer: ', this.groupAnswer.answers);
		if (this.groupAnswer.id !== this.groupQuestion.id)
			return groupAnswersResult;
		for (const question of this.groupQuestion.data) {
			// check user answer is correct
			for (const userAnswer of this.groupAnswer.answers) {
				if (userAnswer.questionId !== question.id) continue;
				// console.log('--------------------------------');
				// console.log('check: ');
				// console.log('userAnswer: ', userAnswer.answer);
				// console.log('question answer: ', question.answers);
				const answer: IAnswerData = {
					answer: userAnswer.answer,
					questionId: question.id,
					isCorrect: false,
				};
				const questionAnswer = question.answers.find(
					(questionAnswer) => questionAnswer.id === userAnswer.answer,
				);
				if (questionAnswer) {
					answer.isCorrect = questionAnswer.isCorrect;
				}
				groupAnswersResult.answers.push(answer);
			}
		}
		// console.log('group result: ', groupAnswersResult);
		// console.log('--------------------------------');
		return groupAnswersResult;
	}
}
export class GroupCheckerModelFillInTheBlank extends GroupChecker {
	constructor(groupQuestion: GroupQuestion, groupAnswer: IReqGroupAnswer) {
		super(groupQuestion, groupAnswer);
	}

	execute(): IGroupAnswer {
		try {
			const groupAnswersResult: IGroupAnswer = {
				id: this.groupQuestion.id,
				answers: [],
			};
			// console.log('questions: ', this.groupQuestion.data);
			// console.log('--------------------------------');
			// console.log('fill blank: ', this.groupAnswer.answers);
			if (this.groupAnswer.id !== this.groupQuestion.id)
				return groupAnswersResult;
			for (const question of this.groupQuestion.data) {
				// check user answer is correct
				for (const userAnswer of this.groupAnswer.answers) {
					const answer: IAnswerData = {
						answer: userAnswer.answer,
						questionId: question.id,
						isCorrect: false,
					};
					const questionAnswer = question.answers.find(
						(questionAnswer) =>
							questionAnswer.content === userAnswer.answer ||
							(questionAnswer.subAnswer &&
								questionAnswer.subAnswer.length > 0 &&
								questionAnswer.subAnswer.find(
									(subAnswer) => subAnswer === userAnswer.answer,
								)),
					);
					if (questionAnswer) {
						answer.isCorrect = questionAnswer.isCorrect;
					}
					groupAnswersResult.answers.push(answer);
				}
			}
			// console.log('group result: ', groupAnswersResult);
			// console.log('--------------------------------');
			return groupAnswersResult;
		} catch (error) {
			console.log(error);
			// throw error;
		}
	}
}
