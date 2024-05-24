import { BadRequestException, Injectable, Logger } from '@nestjs/common';

type Matching = {
	instruction: string;
	questions: any[];
	answerList: string;
};
type Dropdown = {
	instruction: string;
	questions: any[];
	answerList: string;
};
type FillInTheBlank = {
	instruction: string;
	questions: any[];
};
type MultipleResponse = {
	instruction: string;
	questions: any[];
};
type MultipleChoice = {
	instruction: string;
	questions: any[];
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

		const readingRegex = /<reading=”([^”]+)”>/;
		const listeningRegex = /<listening=”([^”]+)”>/;

		const titleRegex = /<title>(.*?)<\/title>/s;
		const contentRegex = /<content>(.*?)<\/content>/s;

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
		const tagRegex = /<(\w+)(.*?)>(.*?)<\/\1>/gs;
		let match;

		while ((match = tagRegex.exec(input)) !== null) {
			const tag = match[1];
			const content = match[3];

			switch (tag) {
				case 'matching':
					questions.push({ Matching: this.extractMatching(content) });
					break;
				case 'dropdown':
					questions.push({ Dropdown: this.extractDropdown(content) });
					break;
				case 'shortanswer':
					questions.push({
						FillInTheBlank: this.extractFillInTheBlank(content),
					});
					break;
				case 'multiple':
					if (/respone/.test(match[2])) {
						questions.push({
							MultipleResponse: this.extractMultipleResponse(content),
						});
					} else {
						questions.push({
							MultipleChoice: this.extractMultipleChoice(content),
						});
					}
					break;
				default:
					break;
			}
		}
	}

	private extractMatching(input: string): Matching {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;
		const answerListRegex = /<answer list>(.*?)<\/answer list>/s;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
			answerList: this.extractData(answerListRegex, input, 1),
		};
	}

	private extractDropdown(input: string): Dropdown {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;
		const answerListRegex = /<answer list>(.*?)<\/answer list>/s;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
			answerList: this.extractData(answerListRegex, input, 1),
		};
	}

	private extractFillInTheBlank(input: string): FillInTheBlank {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
		};
	}

	private extractMultipleResponse(input: string): MultipleResponse {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestionsDetail(questionAnswerRegex, input),
		};
	}

	private extractMultipleChoice(input: string): MultipleChoice {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;

		return {
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
