import { SkillExam } from 'src/lib/entity/exam/skill-exam.entity';
import { QuestionType } from 'src/shared/constant/enum_database';

export class ResExamSkill {
	id: string = '';
	examId: string = '';
	name: string = '';
	details: IExamSkillDetail[] = [];

	constructor(data: SkillExam) {
		console.log('data: ', data);
		this.id = data.id;
		this.examId = data.exam.id;
		this.name = data.name;
		this.details = JSON.parse(JSON.stringify(data.details));
		this.convert();
	}

	convert() {
		this.details = this.details.map((detail) => ({
			...detail,
			part: {
				...detail.part,
				groupQuestions: detail.part.groupQuestions.map((group) => ({
					...group,
					answers: this.setTotalAnswer(group),
					data: group.data.map((quesData: any) => ({
						id: quesData.id,
						question: quesData.question,
						answers: quesData.answers.map((ans: IAnswer) => ({
							id: ans.id,
							content: ans.content,
						})),
					})),
				})),
			},
		}));
	}

	setTotalAnswer(group: IGroupQuestion) {
		let total: IAnswer[] = [];
		switch (group.questionType) {
			case QuestionType.Dropdown:
			case QuestionType.DragAndDrop:
			case QuestionType.MatchingFillInBlank:
			case QuestionType.MatchingHeading:
				total = (group.data as any).reduce((t: any[], item: any) => {
					if (Array.isArray(item.answers)) {
						t.push(...item.answers);
					}
					return t;
				}, []);
			default:
				break;
		}

		return total;
	}
}

export interface IExamSkillDetail {
	id: string;
	part: IPart;

	time: string;
}

export interface IPart {
	id: string;

	publicId: number;

	title: string;

	content: string;

	resource: string;

	partNumber: string;

	groupQuestions: IGroupQuestion[];

	createdAt?: Date;

	updatedAt?: Date;
}

export interface IGroupQuestion {
	id: string;
	instruction: string;
	questionType: QuestionType;

	data: IQuestion[];
}

export interface IQuestion {
	id?: string; // Note: Corrected to use '?' for optional property
	question?: string; // Note: Corrected to use '?' for optional property
	answers: IAnswer[] | IAnswer;
}

export interface IAnswer {
	id: string;
	content: string;
}
