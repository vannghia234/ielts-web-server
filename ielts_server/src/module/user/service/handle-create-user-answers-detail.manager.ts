import { ExamSkillDetail } from 'src/lib/entity/exam/exam-skill-detail.entity';
import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { QuestionType, Skill } from 'src/shared/constant/enum_database';
import { IReqGroupAnswer } from '../dto/create-user-detail-base.dto';
import {
	GroupAnswer,
	IGroupAnswer,
} from 'src/lib/entity/user/i-user-answer-detail-answer.interface';
import { GroupChecker } from './group-checker';

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
		try {
			const userAnswersDetails: UserAnswerDetail = new UserAnswerDetail();
			userAnswersDetails.score = 0;
			userAnswersDetails.answer = [];
			// let totalQuestion = 0;
			// console.log('group questions: ', this.partDetail.part.groupQuestions);
			for (const group of this.partDetail.part.groupQuestions) {
				const groupAnswer = this.groupsAnswer.find(
					(groupItem) => groupItem.id === group.id,
				);
				if (!groupAnswer) continue;
				const groupData: IGroupAnswer = new GroupChecker(group, groupAnswer)
					.instance()
					.execute();
				console.log('new group: ', groupData);
				if (groupData.answers.length === 0) continue;
				userAnswersDetails.answer.push(groupData);
				// is correct? increase score.
				userAnswersDetails.score += groupData.answers.reduce((sum, answer) => {
					if (answer.isCorrect) sum += 1;
					// totalQuestion += 1;
					return sum;
				}, 0);
			}
			userAnswersDetails.score;

			return userAnswersDetails;
		} catch (error) {
			console.log(error);
			throw error;
		}
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
		userAnswersDetails.answer = this.groupsAnswer.map(
			(group) =>
				new GroupAnswer({
					id: group.id,
					answers: [
						{
							questionId: group.id,
							answer: group.answers[0].answer,
							isCorrect: false,
						},
					],
				}),
		);

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
		userAnswersDetails.answer = this.groupsAnswer.map(
			(group) =>
				new GroupAnswer({
					id: group.id,
					answers: [
						{
							questionId: group.id,
							answer: group.answers[0].answer,
							isCorrect: false,
						},
					],
				}),
		);

		return userAnswersDetails;
	}
}
