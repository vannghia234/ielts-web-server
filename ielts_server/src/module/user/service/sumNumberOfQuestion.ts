import { Part } from 'src/lib/entity/part/Part.entity';
import { QuestionType } from 'src/shared/constant/enum_database';

class CalcNumberOfQuestions {
	constructor(protected readonly type: string, protected readonly data: Part) {}

	instance() {
		if (this.type === QuestionType.FillInTheBlank) {
			return new CalcNumberOfQuestionsInFillInTheBlank(this.type, this.data);
		}
		if (this.type === QuestionType.MultipleResponse) {
			return new CalcNumberOfQuestionsInMultipleResponse(this.type, this.data);
		}
		return this;
	}

	calc(): number {
		const total: number = this.data.groupQuestions.length;
		return total;
	}
}

class CalcNumberOfQuestionsInFillInTheBlank extends CalcNumberOfQuestions {
	constructor(type: string, data: Part) {
		super(type, data);
	}

	calc(): number {
		return this.data.groupQuestions.reduce((total: number, groupQuestion) => {
			total += groupQuestion.data.reduce((t: number, question) => {
				t += question.answers.length;
				return t;
			}, 0);
			return total;
		}, 0);
	}
}

class CalcNumberOfQuestionsInMultipleResponse extends CalcNumberOfQuestions {
	constructor(type: string, data: Part) {
		super(type, data);
	}

	calc(): number {
		return this.data.groupQuestions.reduce((total: number, groupQuestion) => {
			total += groupQuestion.data.reduce((t: number, question) => {
				t += question.answers.filter((ans) => ans.isCorrect).length;
				return t;
			}, 0);
			return total;
		}, 0);
	}
}
