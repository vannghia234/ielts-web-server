export class Answer {
  constructor(
    public id: string,
    public content: string,
    public isCorrect: boolean,
  ) {}
}

export class MultipleChoice {
  constructor(
    public id: string,
    public question: string,
    public answers: Answer[],
  ) {}
}

export class MultipleReponse {
  constructor(
    public id: string,
    public question: string,
    public answers: Answer[],
  ) {}
}

export class Dropdown {
  constructor(
    public id: string,
    public question: string,
    public answers: Answer[],
  ) {}
}

export class Matching {
  constructor(
    public id: string,
    public question: string,
    public answer: Answer,
  ) {}
}

export class MatchingHeading {
  constructor(
    public id: string,
    public paragraphFormatted: string,
    public correctAnswers: Answer[],
    public totalAnswers: Answer[],
  ) {}
}

export class FillTheBlank {
  constructor(
    public id: string,
    public paragraphFormatted: string,
    public answers: Answer[],
  ) {}
}

export class MatchingFillBlank {
  constructor(
    public id: string,
    public paragraphFormatted: string,
    public correctAnswers: Answer[],
    public totalAnswers: Answer[],
  ) {}
}
