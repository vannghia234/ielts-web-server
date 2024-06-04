import { BadRequestException, Injectable, Logger } from '@nestjs/common';

type DragAndDrop = {
	instruction: string;
	questions: any[];
	answerList: string;
	type: string;
};
type Dropdown = {
	instruction: string;
	questions: any[];
	answerList: string;
	type: string;
};
type FillInTheBlank = {
	instruction: string;
	questions: any[];
	type: string;
};
type MultipleResponse = {
	instruction: string;
	questions: any[];
	type: string;
};
type MultipleChoice = {
	instruction: string;
	questions: any[];
	type: string;
};
export interface IImportData {
	skill: string;
	part: string;
	title: string;
	content: string;
	questions: {
		[key: string]: any;
	}[];
}
@Injectable()
export class ParseService {
	parse(input: string): any {
		const data: IImportData = {
			skill: '',
			part: '',
			title: '',
			content: '',
			questions: [],
		};

		const readingRegex = /&lt;reading=”([^”]+)”&gt;/;
		const listeningRegex = /&lt;listening=”([^”]+)”&gt;/;

		const titleRegex = /&lt;title&gt;(.*?)&lt;\/title&gt;/s;
		const contentRegex = /&lt;content&gt;(.*?)&lt;\/content&gt;/s;

		if (input.match(readingRegex)) {
			data.part = this.convertPartString(
				this.extractData(readingRegex, input, 1),
			);
			data.skill = 'Reading';
		} else {
			data.part = this.convertPartString(
				this.extractData(listeningRegex, input, 1),
			);
			data.skill = 'Listening';
		}

		data.title = this.extractData(titleRegex, input, 1);
		data.content = this.extractData(contentRegex, input, 1);

		this.extractQuestions(input, data.questions);

		return data;
	}

	private convertPartString(partInput: string) {
		if (!partInput) {
			throw new BadRequestException(
				'Đã xảy ra lỗi trong quá trình xử lý dữ liệu',
			);
		}
		const newInput =
			partInput.charAt(0).toUpperCase() + partInput.substring(1).toLowerCase();

		return newInput;
	}

	private extractData(regex: RegExp, input: string, group: number): any {
		if (typeof input === 'string') {
			const match = input.match(regex);

			if (match) {
				return match[group];
			}
			return null;
		}
		return null;
	}

	private extractQuestions(input: string, questions: any[]) {
		const tagRegex = /&lt;(\w+)(.*?)&gt;(.*?)&lt;\/\1&gt;/gs;
		let match;

		while ((match = tagRegex.exec(input)) !== null) {
			const tag = match[1];

			const content = match[3];
			switch (tag) {
				case 'dragdrop':
					questions.push(this.extractDragAndDrop(content));
					break;
				case 'dropdown':
					questions.push(this.extractDropdown(content));
					break;
				case 'fillintheblank':
					questions.push(this.extractFillInTheBlank(content));
					break;
				case 'multipleresponse':
					questions.push(this.extractMultipleResponse(content));

					break;
				case 'multiplechoice':
					questions.push(this.extractMultipleChoice(content));
					break;
				default:
					// Nếu thẻ không khớp với bất kỳ loại nào, tiếp tục xử lý các thẻ con bên trong
					this.extractQuestions(content, questions);
					break;
			}
		}
	}

	private extractDragAndDrop(input: string): DragAndDrop {
		if (!input) {
			return null;
		}
		const instructionRegex = /&lt;instruction&gt;(.*?)&lt;\/instruction&gt;/s;
		const questionAnswerRegex =
			/&lt;question answer=”([^”]*)”&gt;(.*?)&lt;\/question&gt;/gs;
		const answerListRegex = /&lt;answer list&gt;(.*?)&lt;\/answer list&gt;/s;

		return {
			type: 'DragAndDrop',
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
			answerList: this.extractData(answerListRegex, input, 1),
		};
	}

	private extractDropdown(input: string): Dropdown {
		if (!input) {
			return null;
		}
		const instructionRegex = /&lt;instruction&gt;(.*?)&lt;\/instruction&gt;/s;
		const questionAnswerRegex =
			/&lt;question answer=”([^”]*)”&gt;(.*?)&lt;\/question&gt;/gs;
		const answerListRegex = /&lt;answer list&gt;(.*?)&lt;\/answer list&gt;/s;

		return {
			type: 'DropDown',
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
			answerList: this.extractData(answerListRegex, input, 1),
		};
	}

	private extractFillInTheBlank(input: string): FillInTheBlank {
		if (!input) {
			return null;
		}
		const instructionRegex = /&lt;instruction&gt;(.*?)&lt;\/instruction&gt;/s;
		const questionAnswerRegex =
			/&lt;question answer=”([^”]*)”&gt;(.*?)&lt;\/question&gt;/gs;

		return {
			type: 'FillInTheBlank',
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
		};
	}

	private extractMultipleResponse(input: string): MultipleResponse {
		if (!input) {
			return null;
		}
		const instructionRegex = /&lt;instruction&gt;(.*?)&lt;\/instruction&gt;/s;
		const questionAnswerRegex =
			/&lt;question answer=”([^”]*)”&gt;(.*?)&lt;\/question&gt;/gs;

		return {
			type: 'MultipleResponse',
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
		};
	}

	private extractMultipleChoice(input: string): MultipleChoice {
		if (!input) {
			return null;
		}
		const instructionRegex = /&lt;instruction&gt;(.*?)&lt;\/instruction&gt;/s;
		const questionAnswerRegex =
			/&lt;question answer=”([^”]*)”&gt;(.*?)&lt;\/question&gt;/gs;

		return {
			type: 'MultipleChoice',
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
		};
	}

	private extractQuestionsDetail(regex: RegExp, input: string) {
		const questions = [];
		let match;
		while ((match = regex.exec(input)) !== null) {
			questions.push({
				answer: match[1],
				question: match[2],
			});
		}
		return questions;
	}
}
