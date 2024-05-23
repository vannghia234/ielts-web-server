import { BadRequestException, Injectable, Logger } from '@nestjs/common';

type matching = {
	instruction: string;
	questions: [];
	answerList: string;
};
type dropdown = {
	instruction: string;
	questions: [];
	answerList: string;
};
type fillInTheBlank = {
	instruction: string;
	questions: [];
};
type multipleResponse = {
	instruction: string;
	questions: [];
};
type multipleChoice = {
	instruction: string;
	questions: [];
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
			// matching: {
			// 	instruction: '',
			// 	questions: [],
			// 	answerList: '',
			// },
			// dropdown: {
			// 	instruction: '',
			// 	questions: [],
			// 	answerList: '',
			// },
			// fillInTheBlank: {
			// 	instruction: '',
			// 	questions: [],
			// },
			// multipleResponse: {
			// 	instruction: '',
			// 	questions: [],
			// },
			// multipleChoice: {
			// 	instruction: '',
			// 	questions: [],
			// },
		};

		const readingRegex = /<reading=”([^”]+)”>/;
		const listeningRegex = /<listening=”([^”]+)”>/;

		const titleRegex = /<title>(.*?)<\/title>/s;
		const contentRegex = /<content>(.*?)<\/content>/s;
		const matchingRegex = /<matching>(.*?)<\/matching>/s;
		const dropdownRegex = /<dropdown>(.*?)<\/dropdown>/s;
		const fillInTheBlankRegex = /<shortanswer>(.*?)<\/shortanswer>/s;
		const multipleResponseRegex =
			/<multiple respone>(.*?)<\/multiple respone>/s;
		const multipleChoiceRegex = /<multiple choice>(.*?)<\/multiple choice>/s;

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

		const extractMatching = this.extractMatching(
			this.extractData(matchingRegex, input, 1),
		);
		if (extractMatching) {
			data.questions.push({
				Matching: this.extractMatching(
					this.extractData(matchingRegex, input, 1),
				),
			});
		}

		const extractDropdown = this.extractDropdown(
			this.extractData(dropdownRegex, input, 1),
		);
		if (extractDropdown) {
			data.questions.push({
				DropDown: this.extractDropdown(
					this.extractData(dropdownRegex, input, 1),
				),
			});
		}

		const extractFillInTheBlank = this.extractFillInTheBlank(
			this.extractData(fillInTheBlankRegex, input, 1),
		);

		if (extractFillInTheBlank) {
			data.questions.push({
				FillInTheBlank: this.extractFillInTheBlank(
					this.extractData(fillInTheBlankRegex, input, 1),
				),
			});
		}
		const extractMultipleResponse = this.extractMultipleResponse(
			this.extractData(multipleResponseRegex, input, 1),
		);

		if (extractMultipleResponse) {
			data.questions.push({
				MultipleResponse: this.extractMultipleResponse(
					this.extractData(multipleResponseRegex, input, 1),
				),
			});
		}
		const extractMultipleChoice = this.extractMultipleChoice(
			this.extractData(multipleChoiceRegex, input, 1),
		);
		if (extractMultipleChoice) {
			data.questions.push({
				MultipleChoice: this.extractMultipleChoice(
					this.extractData(multipleChoiceRegex, input, 1),
				),
			});
		}

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
			// throw new BadRequestException(
			// 	'Đã xãy ra lỗi trong quá trình xử lý dữ liệu',
			// );
			return null;
		}
		return null;
	}

	private extractMatching(input: string) {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;
		const answerListRegex = /<answer list>(.*?)<\/answer list>/s;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestions(questionAnswerRegex, input),
			answerList: this.extractData(answerListRegex, input, 1),
		};
	}

	private extractDropdown(input: string) {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;
		const answerListRegex = /<answer list>(.*?)<\/answer list>/s;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestions(questionAnswerRegex, input),
			answerList: this.extractData(answerListRegex, input, 1),
		};
	}

	private extractFillInTheBlank(input: string) {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestions(questionAnswerRegex, input),
		};
	}

	private extractMultipleResponse(input: string) {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]+)”>(.*?)<\/question>/gs;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestions(questionAnswerRegex, input),
		};
	}

	private extractMultipleChoice(input: string) {
		if (!input) {
			return null;
		}
		const instructionRegex = /<instruction>(.*?)<\/instruction>/s;
		const questionAnswerRegex =
			/<question answer=”([^”]*)”>(.*?)<\/question>/gs;

		return {
			instruction: this.extractData(instructionRegex, input, 1),
			questions: this.extractQuestions(questionAnswerRegex, input),
		};
	}

	private extractQuestions(regex: RegExp, input: string) {
		if (!input) {
			return null;
		}
		const questions = [];
		let match;
		while ((match = regex.exec(input)) !== null) {
			questions.push({
				answer: match[1],
				question: match[2],
			});
		}
		if (questions.length === 0) {
			// throw new BadRequestException(
			// 	'Đã xãy ra lỗi trong quá trình xử lý dữ liệu',
			// );
			return null;
		}
		return questions;
	}
}
