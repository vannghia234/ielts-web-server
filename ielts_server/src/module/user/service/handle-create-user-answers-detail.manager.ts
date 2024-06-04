import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { IUserAnswerDetailAnswer } from 'src/lib/entity/user/user-answer-detail-answer.interface';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { QuestionType, Skill } from 'src/shared/constant/enum_database';

export class HandleCreateUserAnswersDetail {
	constructor(
		protected readonly skillName: string,
		protected readonly answers: IUserAnswerDetailAnswer[],
		protected readonly examSkillDetail: ExamSkillDetail,
	) {}

	instance(): HandleCreateUserAnswersDetail {
		if (this.skillName.toLowerCase() === Skill.WRITING.toLowerCase()) {
			return new HandleCreateUserAnswersDetailByWriting(
				this.skillName,
				this.answers,
				this.examSkillDetail,
			);
		}

		if (this.skillName.toLowerCase() === Skill.SPEAKING.toLowerCase()) {
			return new HandleCreateUserAnswersDetailBySpeaking(
				this.skillName,
				this.answers,
				this.examSkillDetail,
			);
		}
		return this;
	}

	execute(): UserAnswerDetail {
		const userAnswersDetails: UserAnswerDetail = new UserAnswerDetail();
		userAnswersDetails.score = 0;
		// let totalQuestion = 0;
		this.examSkillDetail.part.groupQuestions.forEach((group) => {
			const data = new GroupChecker(group, this.answers).instance().execute();
			userAnswersDetails.answer.push(...data);
			// is correct? increase score.
			userAnswersDetails.score += data.reduce((sum, answer) => {
				if (answer.isCorrect) sum += 1;
				// totalQuestion += 1;
				return sum;
			}, 0);
		});
		userAnswersDetails.score;

		return userAnswersDetails;
	}
}

class HandleCreateUserAnswersDetailByWriting extends HandleCreateUserAnswersDetail {
	constructor(
		skillName: string,
		answers: IUserAnswerDetailAnswer[],
		examSkillDetail: ExamSkillDetail,
	) {
		super(skillName, answers, examSkillDetail);
	}
	execute(): UserAnswerDetail {
		const userAnswersDetails: UserAnswerDetail = new UserAnswerDetail();
		userAnswersDetails.score = -1;
		userAnswersDetails.answer = JSON.parse(JSON.stringify(this.answers));

		return userAnswersDetails;
	}
}

class HandleCreateUserAnswersDetailBySpeaking extends HandleCreateUserAnswersDetail {
	constructor(
		skillName: string,
		answers: IUserAnswerDetailAnswer[],
		examSkillDetail: ExamSkillDetail,
	) {
		super(skillName, answers, examSkillDetail);
	}
	execute(): UserAnswerDetail {
		const userAnswersDetails: UserAnswerDetail = new UserAnswerDetail();
		userAnswersDetails.score = -1;
		userAnswersDetails.answer = JSON.parse(JSON.stringify(this.answers));

		return userAnswersDetails;
	}
}

class GroupChecker {
	constructor(
		protected readonly groupQuestion: GroupQuestion,
		protected readonly answers: IUserAnswerDetailAnswer[],
	) {}

	instance(): GroupChecker {
		if (this.groupQuestion.questionType === QuestionType.FillInTheBlank) {
			return new GroupCheckerModelFillInTheBlank(
				this.groupQuestion,
				this.answers,
			);
		}

		return this;
	}

	execute(): IUserAnswerDetailAnswer[] {
		const result: IUserAnswerDetailAnswer[] = [];
		for (const question of this.groupQuestion.data) {
			// find user answer is question exist in group
			const userAnswers = this.answers.find(
				(answer) =>
					answer.groupQuestionId === this.groupQuestion.id &&
					!answer.isCorrect &&
					answer.answerId === question.id,
			);
			if (!userAnswers) {
				continue;
			}

			// check user answer is correct
			const examAnswer = question.answers.find((answer) => {
				const isExist = userAnswers.value.find(
					(answerItem) => answerItem === answer.content,
				);
				return !!isExist;
			});

			if (!!examAnswer) {
				const data = { ...userAnswers };
				data.isCorrect = examAnswer.isCorrect;
				result.push(userAnswers);
			}
		}
		return result;
	}
}
class GroupCheckerModelFillInTheBlank extends GroupChecker {
	constructor(
		groupQuestion: GroupQuestion,
		answers: IUserAnswerDetailAnswer[],
	) {
		super(groupQuestion, answers);
	}

	execute(): IUserAnswerDetailAnswer[] {
		const result: IUserAnswerDetailAnswer[] = [];

		for (const question of this.groupQuestion.data) {
			// find user answer is question exist in group
			const userAnswers = this.answers.find(
				(answer) =>
					answer.groupQuestionId === this.groupQuestion.id &&
					!answer.isCorrect &&
					answer.answerId === question.id,
			);
			if (!userAnswers) {
				continue;
			}

			// check user answer is correct
			const examAnswer = question.answers.find((answer) => {
				const isExist = userAnswers.value.find(
					(answerItem) =>
						answerItem === answer.content ||
						answer.subAnswer.find((subAns) => subAns === answerItem),
				);
				return !!isExist;
			});

			if (!!examAnswer) {
				const data = { ...userAnswers };
				data.isCorrect = examAnswer.isCorrect;
				result.push(userAnswers);
			}
		}
		return result;
	}
}
