export type answerMultiChoice = {
  id: string;
  answerContent: string;
  isCorrect: boolean;
};
export type questionMultiChoiceObj = {
  id: string;
  questionContent: string;
  answerList: answerMultiChoice[];
};

export type questionMultiAnswer = {
  id: string;
  questionContent: string;
  answerList: multipleAnswer;
};

export type multipleAnswer = {
  id: string;
  answer: string[];
};
