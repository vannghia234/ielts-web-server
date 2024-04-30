// export interface AnswerOfQuestionInterface {
//   key: string; // exp : A. 1955 =>  A is key, 1955 is content
//   content: string;
//   isCorrect: boolean;
// }
export type answerMultiChoice = {
  id: string;
  answerContent: string;
  isCorrect: boolean;
};
export type questionMultiChoiceObj = {
  id: string;
  questionContent: string;
  answerLists: answerMultiChoice[];
};

export type questionDragAndDropObj = {
  id: string;
  questionContent: string;
  answer: string;
};

export type questionMultiAnswer = {
  id: string;
  questionContent: string;
  answerLists: multipleAnswer;
};

export type multipleAnswer = {
  id: string;
  answers: string[];
};

export interface MultipleChoiceInterface {
  questionLists: questionMultiChoiceObj[];
}
export interface DragAndDropInterface {
  questionLists: questionDragAndDropObj[];
}
export interface ShortAnswerInterface {
  content: string;
  answers: multipleAnswer[];
}
export interface MultipleAnswerInterface {
  questionLists: questionMultiAnswer;
}
