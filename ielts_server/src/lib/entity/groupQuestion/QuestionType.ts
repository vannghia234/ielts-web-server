export type Answer = {
	id: string;
	content: string;
	isCorrect?: boolean; // Note: Corrected to use '?' for optional property
};

export interface IQuestion {
	id?: string; // Note: Corrected to use '?' for optional property
	question?: string; // Note: Corrected to use '?' for optional property
	answers: Answer[] | Answer;
}

export interface MultipleChoice extends IQuestion {
	answers: Answer[];
}

export interface MultipleResponse extends IQuestion {
	answers: Answer[];
}

export interface Dropdown extends IQuestion {
	answers: Answer;
}

export interface FillTheBlank extends IQuestion {
	answers: Answer[];
}

export interface DragAndDrop extends IQuestion {
	answers: Answer[]; // array with one answer
}

export interface MatchingHeading extends IQuestion {
	answers: Answer[]; // array with one answer
}

export interface MatchingFillBlank extends IQuestion {
	answers: Answer[]; // array with one answer
}
