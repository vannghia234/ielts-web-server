import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { QuestionType, Skill } from 'src/shared/constant/enum_database';
import { IReqGroupAnswer } from '../dto/create-user-detail-base.dto';
import { IUserAnswerDetailItem } from 'src/lib/entity/user/user-answer-detail-answer.interface';

export class HandleCreateUserAnswersDetail {
	constructor(
		protected readonly skillName: string,
		protected readonly groupsAnswer: IReqGroupAnswer[],
		protected readonly partDetail: ExamSkillDetail,
	) {}

	instance(): HandleCreateUserAnswersDetail {
		if (this.skillName.toLowerCase() === Skill.WRITING.toLowerCase()) {
			return new HandleCreateUserAnswersDetailByWriting(
				this.skillName,
				this.groupsAnswer,
				this.partDetail,
			);
		}

		if (this.skillName.toLowerCase() === Skill.SPEAKING.toLowerCase()) {
			return new HandleCreateUserAnswersDetailBySpeaking(
				this.skillName,
				this.groupsAnswer,
				this.partDetail,
			);
		}
		return this;
	}

	execute(): UserAnswerDetail {
		const userAnswersDetails: UserAnswerDetail = new UserAnswerDetail();
		userAnswersDetails.score = 0;
		userAnswersDetails.answer = [];
		// let totalQuestion = 0;
		for (const group of this.partDetail.part.groupQuestions) {
			const groupAnswer = this.groupsAnswer.find(
				(groupItem) => groupItem.id === group.id,
			);
			if (!groupAnswer) continue;
			const data: IUserAnswerDetailItem[] = new GroupChecker(group, groupAnswer)
				.instance()
				.execute();
			if (data.length === 0) continue;
			userAnswersDetails.answer.push(...data);
			// is correct? increase score.
			userAnswersDetails.score += data.reduce((sum, answer) => {
				if (answer.isCorrect) sum += 1;
				// totalQuestion += 1;
				return sum;
			}, 0);
		}
		userAnswersDetails.score;

		return userAnswersDetails;
	}
}

class HandleCreateUserAnswersDetailByWriting extends HandleCreateUserAnswersDetail {
	constructor(
		skillName: string,
		groupsAnswer: IReqGroupAnswer[],
		partDetail: ExamSkillDetail,
	) {
		super(skillName, groupsAnswer, partDetail);
	}
	execute(): UserAnswerDetail {
		const userAnswersDetails: UserAnswerDetail = new UserAnswerDetail();
		userAnswersDetails.score = -1;
		userAnswersDetails.answer = JSON.parse(JSON.stringify(this.groupsAnswer));

		return userAnswersDetails;
	}
}

class HandleCreateUserAnswersDetailBySpeaking extends HandleCreateUserAnswersDetail {
	constructor(
		skillName: string,
		groupsAnswer: IReqGroupAnswer[],
		partDetail: ExamSkillDetail,
	) {
		super(skillName, groupsAnswer, partDetail);
	}
	execute(): UserAnswerDetail {
		const userAnswersDetails: UserAnswerDetail = new UserAnswerDetail();
		userAnswersDetails.score = -1;
		userAnswersDetails.answer = JSON.parse(JSON.stringify(this.groupsAnswer));

		return userAnswersDetails;
	}
}

class GroupChecker {
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

	execute(): IUserAnswerDetailItem[] {
		const answers: IUserAnswerDetailItem[] = [];
		console.log('questions: ', this.groupQuestion.data);
		// console.log('groupAnswer: ', this.groupAnswer);
		for (const question of this.groupQuestion.data) {
			// check user answer is correct
			for (const userAnswer of this.groupAnswer.answers) {
				if (userAnswer.groupQuestionId !== this.groupQuestion.id) continue;
				if (userAnswer.questionId !== question.id) continue;
				console.log('--------------------------------');
				console.log('check: ');
				console.log('userAnswer: ', userAnswer.answer);
				console.log('question answer: ', question.answers);
				console.log('--------------------------------');
				const questionAnswer = question.answers.find(
					(questionAnswer) => questionAnswer.id === userAnswer.answer,
				);
				if (!questionAnswer) continue;
				userAnswer.isCorrect = questionAnswer.isCorrect;

				answers.push(userAnswer);
			}
		}
		console.log('result answers: ', answers);
		return answers;
	}
}
class GroupCheckerModelFillInTheBlank extends GroupChecker {
	constructor(groupQuestion: GroupQuestion, groupAnswer: IReqGroupAnswer) {
		super(groupQuestion, groupAnswer);
	}

	execute(): IUserAnswerDetailItem[] {
		const answers: IUserAnswerDetailItem[] = [];
		console.log('questions: ', this.groupQuestion.data);
		for (const question of this.groupQuestion.data) {
			// check user answer is correct
			for (const userAnswer of this.groupAnswer.answers) {
				const questionAnswer = question.answers.find(
					(questionAnswer) =>
						this.groupQuestion.id === userAnswer.groupQuestionId &&
						(questionAnswer.content === userAnswer.answer ||
							questionAnswer.subAnswer.find(
								(subAnswer) => subAnswer === userAnswer.answer,
							)),
				);
				if (!questionAnswer) continue;
				userAnswer.isCorrect = questionAnswer.isCorrect;

				answers.push(userAnswer);
			}
		}
		console.log('answers: ', answers);
		return answers;
	}
}
