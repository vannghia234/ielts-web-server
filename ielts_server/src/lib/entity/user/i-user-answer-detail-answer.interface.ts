export interface IAnswerData {
	questionId: string;
	answer: string;
	isCorrect: boolean;
}

export interface IGroupAnswer {
	id: string;
	answers: IAnswerData[];
}

export class GroupAnswer implements IGroupAnswer {
	id: string;
	answers: IAnswerData[];
	constructor(data: IGroupAnswer) {
		this.id = data.id;
		this.answers = [];
	}

	add(data: IAnswerData) {
		const d = JSON.parse(JSON.stringify(data));
		this.answers.push(d);
	}
}
