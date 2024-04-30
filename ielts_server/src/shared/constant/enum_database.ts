export enum Skill {
  READING = 'READING',
  LISTENING = 'LISTENING',
  WRITING = 'WRITING',
  SPEAKING = 'SPEAKING',
}

export enum TestStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  LOCK = 'LOCK',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  LECTURE = 'LECTURE',
  USER = 'USER',
  TEMP_USER = 'TEMPUSER',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLECHOICE',
  DRAG_AND_DROP = 'DRAGANDDROP',
  SHORT_ANSWER = 'SHORTANSWER',
  MULTIPLE_ANSWER = 'MULTIPLEANSWER',
}
